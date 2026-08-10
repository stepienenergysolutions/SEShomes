(function () {
  'use strict';

  if (window.SES_TRACKING_DISABLED) return;
  if (window.__sesPaidAdsTrackingLoaded || window.__sesGoogleAdsTrackingLoaded) return;
  window.__sesPaidAdsTrackingLoaded = true;
  window.__sesGoogleAdsTrackingLoaded = true;

  var ENDPOINT = 'https://ses-crm.vercel.app/api/website-tracking';
  var ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'dclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'dclid', 'fbclid'];
  var FINGERPRINT_KEY = 'ses_paid_ads_attribution_fingerprint';
  var params = new URLSearchParams(window.location.search);

  function attributionFingerprint(readValue) {
    for (var index = 0; index < CLICK_ID_KEYS.length; index += 1) {
      var clickKey = CLICK_ID_KEYS[index];
      var clickValue = readValue(clickKey);
      if (clickValue) return clickKey + ':' + clickValue;
    }
    var sourceValue = String(readValue('utm_source') || '').toLowerCase();
    var mediumValue = String(readValue('utm_medium') || '').toLowerCase();
    var paidMedium = !mediumValue || ['cpc', 'ppc', 'paid', 'paid-search', 'paid-social', 'paidsocial', 'social'].indexOf(mediumValue) >= 0;
    if (!sourceValue || !paidMedium) return '';
    return 'utm:' + [sourceValue, mediumValue, readValue('utm_campaign'), readValue('utm_term'), readValue('utm_content')].join('|');
  }

  var incomingFingerprint = attributionFingerprint(function (key) { return params.get(key) || ''; });
  var storedFingerprint = sessionStorage.getItem(FINGERPRINT_KEY) || attributionFingerprint(function (key) {
    return sessionStorage.getItem('ses_' + key) || '';
  });
  if (incomingFingerprint && storedFingerprint && incomingFingerprint !== storedFingerprint) {
    sessionStorage.removeItem('ses_visitor_session_id');
    ATTRIBUTION_KEYS.forEach(function (key) { sessionStorage.removeItem('ses_' + key); });
  }

  ATTRIBUTION_KEYS.forEach(function (key) {
    var value = params.get(key);
    if (value) sessionStorage.setItem('ses_' + key, value);
  });
  if (incomingFingerprint) sessionStorage.setItem(FINGERPRINT_KEY, incomingFingerprint);

  function saved(key) {
    return params.get(key) || sessionStorage.getItem('ses_' + key) || '';
  }

  function cookie(name) {
    var prefix = name + '=';
    var values = document.cookie ? document.cookie.split(';') : [];
    for (var index = 0; index < values.length; index += 1) {
      var value = values[index].trim();
      if (value.indexOf(prefix) === 0) return decodeURIComponent(value.slice(prefix.length));
    }
    return '';
  }

  var source = saved('utm_source').toLowerCase();
  var medium = saved('utm_medium').toLowerCase();
  var isGoogleAdsVisit = Boolean(
    saved('gclid') || saved('gbraid') || saved('wbraid') || saved('dclid') ||
    (source === 'google' && (!medium || ['cpc', 'ppc', 'paid', 'paid-search'].indexOf(medium) >= 0))
  );
  var isMetaAdsVisit = Boolean(
    saved('fbclid') || cookie('_fbc') ||
    (['meta', 'facebook', 'instagram', 'fb', 'ig'].indexOf(source) >= 0 &&
      (!medium || ['cpc', 'ppc', 'paid', 'paid-social', 'paidsocial', 'social'].indexOf(medium) >= 0))
  );
  if (!isGoogleAdsVisit && !isMetaAdsVisit) return;
  var trafficSource = isMetaAdsVisit ? 'meta' : 'google';

  function randomId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'ses-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 14);
  }

  var sessionId = sessionStorage.getItem('ses_visitor_session_id') || randomId();
  sessionStorage.setItem('ses_visitor_session_id', sessionId);
  var visibleStartedAt = document.visibilityState === 'visible' ? Date.now() : null;
  var unreportedEngagedSeconds = 0;
  var sentScrollDepths = {};
  var trackedForms = [];

  function attribution() {
    var fbclid = saved('fbclid');
    var fbc = cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '');
    return {
      trafficSource: trafficSource,
      gclid: saved('gclid'),
      gbraid: saved('gbraid'),
      wbraid: saved('wbraid'),
      dclid: saved('dclid'),
      fbclid: fbclid,
      fbc: fbc,
      fbp: cookie('_fbp'),
      utmSource: saved('utm_source'),
      utmMedium: saved('utm_medium'),
      utmCampaign: saved('utm_campaign'),
      utmTerm: saved('utm_term'),
      utmContent: saved('utm_content')
    };
  }

  function visibleSeconds() {
    if (visibleStartedAt === null) return;
    var elapsed = Math.max(0, Math.floor((Date.now() - visibleStartedAt) / 1000));
    unreportedEngagedSeconds += elapsed;
    visibleStartedAt = Date.now();
  }

  function payload(eventName, options) {
    options = options || {};
    var data = attribution();
    data.sessionId = sessionId;
    data.eventId = randomId();
    data.eventName = eventName;
    data.pageUrl = window.location.href;
    data.pageTitle = document.title;
    data.referrer = document.referrer;
    data.engagedSeconds = options.engagedSeconds || 0;
    data.scrollDepth = options.scrollDepth === undefined ? null : options.scrollDepth;
    data.metadata = options.metadata || {};
    return data;
  }

  function send(eventName, options, beacon) {
    var body = JSON.stringify(payload(eventName, options));
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }));
      return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: body,
      keepalive: true
    }).catch(function () {});
  }

  function flushEngagement(eventName, beacon) {
    visibleSeconds();
    if (!unreportedEngagedSeconds && eventName === 'engagement') return;
    var seconds = Math.min(300, unreportedEngagedSeconds);
    unreportedEngagedSeconds = Math.max(0, unreportedEngagedSeconds - seconds);
    send(eventName, { engagedSeconds: seconds }, beacon);
  }

  function scrollDepth() {
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (!documentHeight) return 0;
    return Math.min(100, Math.round(((window.scrollY + window.innerHeight) / documentHeight) * 100));
  }

  function safeLabel(element) {
    return String(
      element.getAttribute('data-track') ||
      element.getAttribute('aria-label') ||
      element.id ||
      element.name ||
      element.tagName.toLowerCase()
    ).slice(0, 120);
  }

  window.sesTrackEvent = function (name, metadata) {
    if (!name) return;
    send(String(name).slice(0, 80), { metadata: metadata || {} }, false);
  };

  send('page_view', {}, false);

  document.addEventListener('click', function (event) {
    var element = event.target && event.target.closest ? event.target.closest('a,button,[data-track]') : null;
    if (!element) return;
    var href = element.getAttribute('href') || '';
    var metadata = { element: safeLabel(element) };
    if (href && href.indexOf('tel:') === 0) {
      send('phone_click', { metadata: metadata }, false);
      return;
    }
    if (href) {
      try {
        var url = new URL(href, window.location.href);
        metadata.destinationPath = url.origin === window.location.origin ? url.pathname : url.hostname;
      } catch (_) {}
    }
    send('cta_click', { metadata: metadata }, false);
  });

  document.addEventListener('focusin', function (event) {
    var form = event.target && event.target.form;
    if (!form || trackedForms.indexOf(form) >= 0) return;
    trackedForms.push(form);
    send('form_start', { metadata: { form: form.id || form.getAttribute('name') || 'website_form' } }, false);
  });

  document.addEventListener('submit', function (event) {
    var form = event.target;
    send('form_submit', { metadata: { form: form.id || form.getAttribute('name') || 'website_form' } }, false);
  });

  window.addEventListener('scroll', function () {
    var depth = scrollDepth();
    [25, 50, 75, 90].forEach(function (threshold) {
      if (depth >= threshold && !sentScrollDepths[threshold]) {
        sentScrollDepths[threshold] = true;
        send('scroll_depth', { scrollDepth: threshold }, false);
      }
    });
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flushEngagement('engagement', true);
      visibleStartedAt = null;
    } else {
      visibleStartedAt = Date.now();
    }
  });

  window.setInterval(function () { flushEngagement('engagement', false); }, 15000);
  window.addEventListener('pagehide', function () { flushEngagement('page_exit', true); });
})();
