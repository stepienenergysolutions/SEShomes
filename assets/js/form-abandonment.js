/*
 * SES Custom Homes — estimate form abandonment capture.
 * Load AFTER assets/js/google-ads-session-tracking.js on every estimate page.
 *
 * Saves what the visitor entered (field by field when a field is completed, not
 * keystroke by keystroke) and which step they are on, and sends it through the
 * paid-ads session tracker:
 *   form_progress — as fields are completed / steps change
 *   form_abandon  — when they leave or hide the tab without submitting
 * The CRM shows it on the Google Ads / Meta visitor cards and in Website Analytics.
 *
 * Never captured: hidden/honeypot fields, passwords, files, payment card, CVV,
 * SSN, bank numbers, driver's license, date of birth.
 */
(function () {
  'use strict';
  if (window.SES_TRACKING_DISABLED || window.__sesFormAbandonment) return;
  window.__sesFormAbandonment = true;

  var SENSITIVE = /pass(word|code)?|card|cvv|cvc|ccv|expir|ssn|social.?sec|routing|account.?(number|no)|iban|tax.?id|driver|licen[cs]e.?(no|number)|birth|dob\b|captcha|honeypot|company_website/i;
  var SKIP_TYPES = { hidden: 1, password: 1, file: 1, submit: 1, button: 1, reset: 1, image: 1 };
  var STEP_SELECTOR = '[data-step],[data-form-step],.form-step,.wizard-step,fieldset';

  var fields = {};
  var fieldOrder = 0;
  var lastField = null;
  var submitted = false;
  var interacted = false;
  var lastSentSignature = '';
  var abandonSentSignature = '';
  var progressTimer = null;

  function tracker() {
    return typeof window.sesTrackFormCapture === 'function' ? window.sesTrackFormCapture : null;
  }

  function text(node) {
    return node ? String(node.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }

  function humanize(value) {
    return String(value || '').replace(/[_\-[\]]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
  }

  function cssEscape(value) {
    return window.CSS && CSS.escape ? CSS.escape(value) : String(value).replace(/"/g, '\\"');
  }

  function visible(el) {
    if (!el || !(el.offsetWidth || el.offsetHeight || el.getClientRects().length)) return false;
    var rect = el.getBoundingClientRect();
    if (rect.right < -1000 || rect.left < -5000) return false; // off-screen honeypots
    return getComputedStyle(el).visibility !== 'hidden';
  }

  // text of a label/heading without the controls (and <option>s) nested inside it
  function ownText(node) {
    if (!node) return '';
    // <label><span>Phone number</span><small>hint</small><input></label> -> "Phone number"
    var lead = node.firstElementChild;
    if (lead && /^(SPAN|STRONG|B)$/.test(lead.tagName) && !lead.querySelector('input,select,textarea') && text(lead)) {
      return text(lead);
    }
    var clone = node.cloneNode(true);
    var controls = clone.querySelectorAll('input,select,textarea,option,button,.choices');
    for (var i = 0; i < controls.length; i++) controls[i].remove();
    return text(clone);
  }

  function questionFor(el) {
    var group = el.closest('fieldset,[role="radiogroup"],[role="group"],.field,.form-group');
    if (!group) return null;
    var children = group.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.querySelector('input,select,textarea') && child.tagName !== 'LEGEND') continue;
      if (/^(LEGEND|SPAN|P|LABEL|H2|H3|H4|DIV)$/.test(child.tagName) && ownText(child)) return ownText(child);
    }
    return group.getAttribute('aria-label');
  }

  function labelFor(el) {
    if (el.dataset && el.dataset.sesLabel) return el.dataset.sesLabel;
    if (el.type === 'radio' || (el.type === 'checkbox' && el.name && (el.form || document).querySelectorAll('input[type="checkbox"][name="' + cssEscape(el.name) + '"]').length > 1)) {
      var question = questionFor(el);
      if (question) return question;
    }
    if (el.labels && el.labels.length && ownText(el.labels[0])) return ownText(el.labels[0]);
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
    var by = el.getAttribute('aria-labelledby');
    if (by) {
      var ref = document.getElementById(by.split(' ')[0]);
      if (ref && text(ref)) return text(ref);
    }
    var wrap = el.closest('label');
    if (wrap && ownText(wrap)) return ownText(wrap);
    if (el.placeholder) return el.placeholder;
    return humanize(el.name || el.id || 'Field');
  }

  function choiceText(el) {
    if (el.labels && el.labels.length && ownText(el.labels[0])) return ownText(el.labels[0]);
    var wrap = el.closest('label');
    if (wrap && ownText(wrap)) return ownText(wrap);
    return el.value && el.value !== 'on' ? el.value : 'Yes';
  }

  function excluded(el) {
    if (!el || !el.tagName) return true;
    var tag = el.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'select' && tag !== 'textarea') return true;
    if (tag === 'input' && SKIP_TYPES[(el.type || 'text').toLowerCase()]) return true;
    if (el.getAttribute('aria-hidden') === 'true' || el.tabIndex === -1) return true;
    if (el.closest('[data-ses-no-capture],[aria-hidden="true"]')) return true;
    var auto = (el.getAttribute('autocomplete') || '').toLowerCase();
    if (auto.indexOf('cc-') === 0 || auto.indexOf('password') !== -1 || auto === 'bday') return true;
    return SENSITIVE.test([el.name, el.id, auto, el.className, labelFor(el)].join(' '));
  }

  function fieldKey(el) {
    if (el.type === 'radio') return 'radio:' + (el.name || labelFor(el));
    if (el.type === 'checkbox') return 'checkbox:' + (el.name || '') + ':' + (el.name ? '' : labelFor(el));
    return (el.form && el.form.id ? el.form.id + ':' : '') + (el.name || el.id || labelFor(el));
  }

  function valueOf(el) {
    var scope = el.form || document;
    if (el.type === 'radio') {
      var checked = el.name ? scope.querySelector('input[type="radio"][name="' + cssEscape(el.name) + '"]:checked') : (el.checked ? el : null);
      return checked ? choiceText(checked) : '';
    }
    if (el.type === 'checkbox') {
      if (el.name) {
        var boxes = scope.querySelectorAll('input[type="checkbox"][name="' + cssEscape(el.name) + '"]');
        if (boxes.length > 1) {
          var picked = [];
          for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) picked.push(choiceText(boxes[i]));
          return picked.join(', ');
        }
      }
      return el.checked ? choiceText(el) : '';
    }
    if (el.tagName.toLowerCase() === 'select') {
      var values = [];
      for (var j = 0; j < el.options.length; j++) {
        var opt = el.options[j];
        if (opt.selected && opt.value !== '') values.push(text(opt) || opt.value);
      }
      return values.join(', ');
    }
    return String(el.value || '').trim();
  }

  function formRoot() {
    if (lastField && lastField.isConnected && lastField.form) return lastField.form;
    return document.querySelector('form') || document.body;
  }

  function stepInfo() {
    var root = formRoot();
    var info = { index: null, count: null, label: null };
    var all = root.querySelectorAll(STEP_SELECTOR);
    var steps = [];
    for (var i = 0; i < all.length; i++) {
      if (!all[i].querySelector('input,select,textarea')) continue;
      var parent = all[i].parentElement && all[i].parentElement.closest(STEP_SELECTOR);
      if (parent && root.contains(parent)) continue;
      steps.push(all[i]);
    }
    var current = null;
    if (steps.length > 1) {
      var active = -1;
      for (var a = 0; a < steps.length; a++) {
        if (/(^|\s)(active|current|is-active)(\s|$)/.test(steps[a].className || '') || steps[a].getAttribute('aria-current') === 'step') { active = a; break; }
      }
      for (var s = 0; s < steps.length; s++) {
        if (active === -1 ? visible(steps[s]) : s === active) {
          current = steps[s];
          info.index = Number(steps[s].getAttribute('data-step')) || s + 1;
          info.count = steps.length;
          break;
        }
      }
    }
    var labelNode = current
      ? current.querySelector('.step-label,[data-step-title],legend,h2,h3,h4')
      : null;
    var labelText = labelNode ? text(labelNode) : '';
    var match = labelText.match(/step\s+(\d+)\s*(?:of|\/)\s*(\d+)\s*[—–:-]?\s*(.*)$/i);
    if (match) {
      info.index = Number(match[1]);
      info.count = Number(match[2]);
      labelText = match[3] || labelText;
    }
    info.label = labelText ? labelText.slice(0, 160) : null;
    if (!info.label && root !== document.body) {
      var heading = root.querySelector('h1,h2,h3');
      if (heading && text(heading)) info.label = text(heading).slice(0, 160);
    }
    return info;
  }

  function record(el) {
    if (excluded(el)) return;
    var key = fieldKey(el);
    var value = valueOf(el);
    if (!value) {
      delete fields[key];
      return;
    }
    var existing = fields[key];
    fields[key] = {
      label: labelFor(el).slice(0, 100),
      name: (el.name || el.id || '').slice(0, 100),
      value: value.slice(0, 400),
      step: existing && existing.step ? existing.step : stepInfo().index,
      order: existing ? existing.order : ++fieldOrder
    };
  }

  function sweepVisibleFields() {
    // catches browser-autofilled values that never fired change/blur
    var els = formRoot().querySelectorAll('input,select,textarea');
    for (var i = 0; i < els.length && i < 200; i++) {
      var el = els[i];
      if (!visible(el) || excluded(el)) continue;
      if (el.type === 'radio' || el.type === 'checkbox' ? el.checked : valueOf(el)) record(el);
    }
  }

  function snapshot(reason) {
    if (interacted) sweepVisibleFields();
    var step = stepInfo();
    var list = [];
    for (var key in fields) if (Object.prototype.hasOwnProperty.call(fields, key)) list.push(fields[key]);
    list.sort(function (a, b) { return a.order - b.order; });
    var root = formRoot();
    return {
      formId: String(root.id || root.getAttribute('name') || location.pathname.replace(/^\//, '')).slice(0, 120),
      stepIndex: step.index,
      stepCount: step.count,
      stepLabel: step.label,
      lastField: lastField ? labelFor(lastField).slice(0, 120) : null,
      reason: reason || null,
      fields: list.slice(0, 40).map(function (f) { return { label: f.label, name: f.name, value: f.value, step: f.step }; })
    };
  }

  function signature(form) {
    return JSON.stringify([form.stepIndex, form.stepLabel, form.fields]);
  }

  function scheduleProgress() {
    if (submitted || !interacted || !tracker()) return;
    clearTimeout(progressTimer);
    progressTimer = setTimeout(function () {
      if (submitted) return;
      var form = snapshot('in_progress');
      var sig = signature(form);
      if (sig === lastSentSignature) return;
      lastSentSignature = sig;
      tracker()('form_progress', form, false);
    }, 1500);
  }

  function sendAbandon(reason) {
    if (submitted || !interacted || !tracker()) return;
    clearTimeout(progressTimer);
    var form = snapshot(reason);
    var sig = signature(form);
    if (sig === abandonSentSignature) return;
    abandonSentSignature = sig;
    lastSentSignature = sig;
    tracker()('form_abandon', form, true);
  }

  function isField(el) {
    return el && el.tagName && /^(input|select|textarea)$/i.test(el.tagName);
  }

  function onFieldDone(event) {
    var el = event.target;
    if (!isField(el) || excluded(el)) return;
    interacted = true;
    lastField = el;
    record(el);
    scheduleProgress();
  }

  document.addEventListener('change', onFieldDone, true);
  document.addEventListener('focusout', onFieldDone, true);
  document.addEventListener('submit', function () {
    submitted = true;
    clearTimeout(progressTimer);
  }, true);
  document.addEventListener('click', function (event) {
    // Next / Back buttons: report the new step once the UI has switched
    if (!interacted) return;
    var button = event.target && event.target.closest && event.target.closest('button,[role="button"]');
    if (button && button.type !== 'submit') setTimeout(scheduleProgress, 300);
  }, true);
  window.addEventListener('pagehide', function () { sendAbandon('left_page'); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sendAbandon('tab_hidden');
  });
})();
