(function () {
  if (!window.SES_TRACKING_DISABLED) {
    var metaPixelScript = document.createElement('script');
    metaPixelScript.src = 'assets/js/meta-pixel.js';
    metaPixelScript.async = true;
    document.head.appendChild(metaPixelScript);
  }

  var key = window.SES_CAMPAIGN_KEY;
  var config = window.SES_CAMPAIGNS && window.SES_CAMPAIGNS[key];
  var root = document.getElementById('campaign-page');
  if (!root || !config) return;

  var CRM_URL = 'https://ses-crm.vercel.app';
  var formName = key.replace(/-/g, '_') + '_estimate';
  var pageName = key + '-estimate';

  function list(items, render) { return items.map(render).join(''); }
  function choiceId(index) { return 'project-choice-' + index; }
  function description() { return 'Request a free ' + config.serviceName.toLowerCase() + ' consultation from SES Custom Homes. No obligation.'; }

  document.title = config.title + ' | SES Custom Homes';
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', description());
  document.documentElement.style.setProperty('--hero-image', "url('/" + config.hero + "')");

  root.innerHTML = `
    <header class="top"><div class="wrap top-inner">
      <a class="logo" href="index.html" aria-label="SES Custom Homes home"><img src="logo.png" alt="SES Custom Homes"></a>
      <a class="call" href="tel:+18044084663" data-track="phone_top"><span>Talk with our team</span> ☎ (804) 408-4663</a>
    </div></header>
    <main>
      <section class="hero"><div class="wrap hero-grid">
        <div class="hero-message"><p class="eyebrow">${config.eyebrow}</p><h1>${config.headline}</h1><p class="hero-copy">${config.intro}</p><div class="offer">${config.offer}</div>
          <ul class="checks"><li>Free project consultation</li><li>Class A licensed contractor</li><li>Family owned since 2013</li><li>Serving VA, WV &amp; NC</li></ul>
        </div>
        <div class="card" id="estimate-card">
          <div class="card-head"><h2>Get Your Free ${config.serviceName} Estimate</h2><p>Answer a few quick questions. There is no obligation.</p></div>
          <div class="progress"><span id="progress"></span></div>
          <form id="campaign-form">
            <input type="text" name="company_website" value="" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
            <input type="hidden" name="form_type" value="${formName}"><input type="hidden" name="lead_source" value="website_${formName}"><input type="hidden" name="service_interested_in" value="${config.serviceSlug}"><input type="hidden" name="landing_page" value="${pageName}">
            <section class="step active" data-step="1"><p class="step-label">Step 1 of 2 — Your project</p><div id="step-error" class="error" role="alert" hidden>Please complete each project question.</div>
              <div class="field"><span>${config.question}</span><div class="choices">${list(config.options, function (option, index) { return '<div class="choice"><input id="' + choiceId(index) + '" type="radio" name="project_scope" value="' + option + '"' + (index === 0 ? ' required' : '') + '><label for="' + choiceId(index) + '">' + option + '</label></div>'; })}</div></div>
              <div class="two"><label class="field"><span>When would you like to start?</span><select name="project_timeline" required><option value="">Choose a timeframe</option><option value="as-soon-as-possible">As soon as possible</option><option value="1-3-months">Within 1–3 months</option><option value="3-6-months">Within 3–6 months</option><option value="researching">Just researching</option></select></label><label class="field"><span>Project ZIP code</span><input name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="10" placeholder="ZIP code" required></label></div>
              <button class="primary" id="continue" type="button">Continue to My Estimate →</button><p class="note">Your information stays with SES Custom Homes.</p>
            </section>
            <section class="step" data-step="2"><p class="step-label">Step 2 of 2 — How should we contact you?</p>
              <label class="field"><span>First and last name</span><input name="full_name" autocomplete="name" placeholder="First and last name" pattern="\\s*\\S+(?:\\s+\\S+)+\\s*" title="Please enter your first and last name." required></label>
              <label class="field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" inputmode="tel" required></label><label class="field"><span>Email address <small>(optional)</small></span><input type="email" name="email" autocomplete="email"></label>
              <details class="more-details"><summary>Add project address or details (optional)</summary><label class="field"><span>Project street address</span><input name="project_address" autocomplete="street-address"></label><div class="three"><label class="field"><span>City</span><input name="city" autocomplete="address-level2"></label><label class="field"><span>State</span><input name="state" autocomplete="address-level1" maxlength="2"></label><label class="field"><span>ZIP</span><input name="contact_zip" autocomplete="postal-code" inputmode="numeric" maxlength="10"></label></div><label class="field"><span>Anything else we should know?</span><input name="project_details" placeholder="${config.detailPlaceholder}"></label></details>
              <div class="consent"><input id="sms" type="checkbox" name="sms_consent" value="yes"><label for="sms">Yes, I agree to receive recurring text messages from SES Custom Homes about my estimate request, appointments, scheduling and project updates. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase. View our <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> and <a href="terms-and-conditions.html" target="_blank" rel="noopener">Terms &amp; Conditions</a>.</label></div>
              <div class="actions"><button class="back" id="back" type="button">Back</button><button class="primary" id="submit" type="submit">Request My Free Estimate →</button></div><p class="note">No obligation. SES Custom Homes will contact you about this request.</p>
            </section>
          </form>
          <div class="success" id="success" hidden><div class="success-mark">✓</div><h2>Thank you—we received your request!</h2><p>An SES Custom Homes team member will contact you about your ${config.serviceName.toLowerCase()} project. You can choose an appointment time below or skip this step—we’ll reach out either way.</p>
            <div class="scheduler" id="scheduler" hidden><h3>Would you like to choose a time? <small>(optional)</small></h3><p id="schedule-status">Loading available consultation times…</p>
              <div id="schedule-controls" hidden><div class="booking-address"><h4>Project address</h4><p>Required only if you choose an appointment time.</p><label class="field"><span>Street address</span><input id="booking-street" autocomplete="street-address" required></label><div class="three"><label class="field"><span>City</span><input id="booking-city" autocomplete="address-level2" required></label><label class="field"><span>State</span><input id="booking-state" autocomplete="address-level1" maxlength="2" pattern="[A-Za-z]{2}" required></label><label class="field"><span>ZIP</span><input id="booking-zip" autocomplete="postal-code" inputmode="numeric" maxlength="10" pattern="[0-9]{5}(-[0-9]{4})?" required></label></div></div><select id="booking-date" aria-label="Appointment date"></select><div class="slot-grid" id="booking-slots"></div><div class="schedule-actions"><button class="primary" id="book-time" type="button" disabled>Schedule This Appointment</button><button class="skip" id="skip-scheduling" type="button">Skip for now</button></div></div><div class="booking-result" id="booking-result" hidden></div>
            </div><p><a href="tel:+18044084663">Need us now? Call (804) 408-4663</a></p>
          </div>
        </div>
      </div></section>
      <section class="trust"><div class="wrap trust-grid"><div class="trust-item"><strong>Class A</strong><span>Licensed contractor</span></div><div class="trust-item"><strong>Since 2013</strong><span>Family owned</span></div><div class="trust-item"><strong>3 States</strong><span>VA • WV • NC</span></div><div class="trust-item"><strong>Free Estimate</strong><span>No obligation</span></div></div></section>
      <section class="section soft"><div class="wrap"><div class="title"><p class="eyebrow">Plan with confidence</p><h2>${config.benefitsTitle}</h2><p>${config.benefitsIntro}</p></div><div class="benefits">${list(config.benefits, function (benefit, index) { return '<article class="benefit"><div class="num">0' + (index + 1) + '</div><h3>' + benefit[0] + '</h3><p>' + benefit[1] + '</p></article>'; })}</div></div></section>
      <section class="section"><div class="wrap"><div class="title"><p class="eyebrow">Project inspiration</p><h2>${config.galleryTitle}</h2></div><div class="gallery${config.gallery.length === 1 ? ' single' : ''}">${list(config.gallery, function (image, index) { return '<img src="' + image + '" alt="' + config.serviceName + ' project by SES Custom Homes"' + (index ? ' loading="lazy"' : '') + '>'; })}</div></div></section>
      <section class="section soft"><div class="wrap"><div class="title"><p class="eyebrow">Common questions</p><h2>Before Your Free ${config.serviceName} Consultation</h2></div><div class="faq">${list(config.faqs, function (faq) { return '<details><summary>' + faq[0] + '</summary><p>' + faq[1] + '</p></details>'; })}</div></div></section>
      <section class="final"><div class="wrap"><h2>Ready to Talk About Your ${config.serviceName} Project?</h2><p>Tell us what you have in mind and request a free, no-obligation estimate.</p><a href="#estimate-card" data-track="final_quote">Get My Free Estimate →</a></div></section>
    </main>
    <footer class="legal"><div class="wrap legal-inner"><div>© 2026 SES Custom Homes • Class A Licensed Contractor • Family Owned Since 2013</div><div><a href="privacy-policy.html">Privacy Policy</a> • <a href="terms-and-conditions.html">Terms &amp; Conditions</a></div></div></footer>
    <div class="mobile"><a class="mobile-call" href="tel:+18044084663" data-track="phone_mobile">Call SES</a><a class="mobile-quote" href="#estimate-card" data-track="mobile_quote">Start My Estimate</a></div>`;

  var form = document.getElementById('campaign-form');
  var stepOne = form.querySelector('[data-step="1"]');
  var stepTwo = form.querySelector('[data-step="2"]');
  var progress = document.getElementById('progress');
  var error = document.getElementById('step-error');
  var started = false;
  var bookingToken = '';
  var bookingDates = [];
  var selectedTime = '';
  var submittedLeadData = {};

  function track(name, data) {
    if (window.SES_TRACKING_DISABLED) return;
    var details = data || {};
    if (typeof window.gtag === 'function') window.gtag('event', name, details);
    if (name !== 'form_start' && typeof window.sesTrackEvent === 'function') window.sesTrackEvent(name, details);
    if (typeof window.sesMetaTrack === 'function') {
      if (name === 'form_start') window.sesMetaTrack('InitiateCheckout', { content_name: config.serviceName + ' Estimate', content_category: config.serviceSlug });
      if (name === 'generate_lead') window.sesMetaTrack('Lead', { content_name: config.serviceName + ' Estimate', content_category: config.serviceSlug }, details.event_id);
      if (name === 'appointment_scheduled') window.sesMetaTrack('Schedule', { content_name: config.serviceName + ' Consultation', content_category: config.serviceSlug }, details.event_id);
    }
  }
  function start() {
    if (started) return;
    started = true;
    track('form_start', { form_name: formName, service: config.serviceSlug });
  }
  function sessionId() {
    var id = sessionStorage.getItem('ses_visitor_session_id');
    if (!id) {
      id = 'ses-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem('ses_visitor_session_id', id);
    }
    return id;
  }
  function cookie(name) {
    var prefix = name + '=';
    var match = document.cookie.split(';').map(function (part) { return part.trim(); }).find(function (part) { return part.indexOf(prefix) === 0; });
    return match ? decodeURIComponent(match.slice(prefix.length)) : '';
  }
  function metaEventId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }
  function scrollToForm() { document.getElementById('estimate-card').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  form.addEventListener('input', start, { once: true });
  form.addEventListener('change', start, { once: true });
  document.getElementById('continue').addEventListener('click', function () {
    var fields = Array.from(stepOne.querySelectorAll('[required]'));
    var valid = fields.every(function (field) { return field.type === 'radio' ? !!stepOne.querySelector('[name="' + field.name + '"]:checked') : field.checkValidity(); });
    if (!valid) {
      error.hidden = false;
      var bad = fields.find(function (field) { return field.type === 'radio' ? !stepOne.querySelector('[name="' + field.name + '"]:checked') : !field.checkValidity(); });
      if (bad && bad.type !== 'radio') bad.reportValidity();
      return;
    }
    error.hidden = true; stepOne.classList.remove('active'); stepTwo.classList.add('active'); progress.style.width = '100%';
    track('form_step_complete', { form_name: formName, service: config.serviceSlug, step: 1 }); scrollToForm();
  });
  document.getElementById('back').addEventListener('click', function () { stepTwo.classList.remove('active'); stepOne.classList.add('active'); progress.style.width = '50%'; scrollToForm(); });
  document.querySelectorAll('[data-track]').forEach(function (element) { element.addEventListener('click', function () { track('landing_page_cta', { cta: element.dataset.track, service: config.serviceSlug }); }); });

  var mobileBar = document.querySelector('.mobile');
  var estimateCard = document.getElementById('estimate-card');
  if ('IntersectionObserver' in window && mobileBar) new IntersectionObserver(function (entries) { mobileBar.classList.toggle('form-visible', entries[0].isIntersecting); }, { threshold: .08 }).observe(estimateCard);

  function renderSlots() {
    var date = document.getElementById('booking-date').value;
    var group = bookingDates.find(function (item) { return item.date === date; });
    var container = document.getElementById('booking-slots');
    selectedTime = ''; document.getElementById('book-time').disabled = true; container.innerHTML = '';
    (group ? group.slots : []).forEach(function (slot) {
      var button = document.createElement('button'); button.type = 'button'; button.className = 'slot'; button.textContent = slot.label;
      button.addEventListener('click', function () { container.querySelectorAll('.slot').forEach(function (item) { item.classList.remove('selected'); }); button.classList.add('selected'); selectedTime = slot.time; document.getElementById('book-time').disabled = false; });
      container.appendChild(button);
    });
  }
  async function loadScheduler() {
    var scheduler = document.getElementById('scheduler');
    var street = document.getElementById('booking-street'); var city = document.getElementById('booking-city'); var state = document.getElementById('booking-state'); var zip = document.getElementById('booking-zip');
    if (!bookingToken) return;
    scheduler.hidden = false; street.value = submittedLeadData.project_address || ''; city.value = submittedLeadData.city || ''; state.value = submittedLeadData.state || ''; zip.value = submittedLeadData.contact_zip || submittedLeadData.zip || '';
    try {
      var response = await fetch(CRM_URL + '/api/public-booking', { cache: 'no-store' }); var payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error('unavailable');
      bookingDates = payload.dates || [];
      if (!bookingDates.length) { document.getElementById('schedule-controls').hidden = true; document.getElementById('schedule-status').textContent = 'No online times are currently available. No action is needed—our team will contact you.'; return; }
      var select = document.getElementById('booking-date'); select.innerHTML = '';
      bookingDates.forEach(function (item) { var option = document.createElement('option'); option.value = item.date; option.textContent = item.label; select.appendChild(option); });
      select.onchange = renderSlots; document.getElementById('schedule-status').textContent = 'To schedule online, enter the project address and choose an available time. Or skip this step—we’ll contact you.'; document.getElementById('schedule-controls').hidden = false; renderSlots();
    } catch (err) { document.getElementById('schedule-controls').hidden = true; document.getElementById('schedule-status').textContent = 'Online scheduling is unavailable right now. No action is needed—our team will contact you.'; }
  }
  document.getElementById('skip-scheduling').addEventListener('click', function () { document.getElementById('scheduler').hidden = true; track('appointment_scheduling_skipped', { service: config.serviceSlug }); });
  document.getElementById('book-time').addEventListener('click', async function () {
    var date = document.getElementById('booking-date').value; var button = document.getElementById('book-time'); var addressFields = ['booking-street', 'booking-city', 'booking-state', 'booking-zip'].map(function (id) { return document.getElementById(id); });
    if (!date || !selectedTime) return;
    for (var index = 0; index < addressFields.length; index += 1) if (!addressFields[index].reportValidity()) { document.getElementById('schedule-status').textContent = 'Please complete the project address to schedule online.'; return; }
    button.disabled = true; button.textContent = 'Scheduling…';
    try {
      var scheduleEventId = metaEventId('meta-schedule');
      var response = await fetch(CRM_URL + '/api/public-booking', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ bookingToken: bookingToken, appointmentDate: date, appointmentTime: selectedTime, address: addressFields[0].value, city: addressFields[1].value, state: addressFields[2].value, zip: addressFields[3].value, pageUrl: location.href, fbp: cookie('_fbp'), fbc: cookie('_fbc'), metaEventId: scheduleEventId }) });
      var payload = await response.json(); if (!response.ok || !payload.ok) throw new Error(payload.error || 'booking_failed');
      document.getElementById('schedule-controls').hidden = true; document.getElementById('schedule-status').textContent = 'Your appointment time has been selected.';
      var selectedDate = bookingDates.find(function (item) { return item.date === date; }); var slot = selectedDate.slots.find(function (item) { return item.time === selectedTime; }); var result = document.getElementById('booking-result');
      result.textContent = 'You chose ' + selectedDate.label + ' at ' + slot.label + '. An SES Custom Homes team member will contact you to confirm the details.'; result.hidden = false;
      track('appointment_scheduled', { service: config.serviceSlug, appointment_date: date, appointment_time: selectedTime, event_id: scheduleEventId });
    } catch (err) {
      button.disabled = false; button.textContent = 'Schedule This Appointment';
      if (err.message === 'appointment_time_unavailable') { document.getElementById('schedule-status').textContent = 'That time was just booked. Please choose another available time.'; loadScheduler(); }
      else { document.getElementById('schedule-status').textContent = 'We could not schedule online, but your estimate request was received. Our team will contact you to arrange a time.'; document.getElementById('schedule-controls').hidden = true; }
    }
  });
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); if (!form.reportValidity()) return;
    var button = document.getElementById('submit'); button.disabled = true; button.textContent = 'Sending…'; var data = Object.fromEntries(new FormData(form).entries()); var params = new URLSearchParams(location.search);
    if (data.contact_zip) data.zip = data.contact_zip; data.page_url = location.href; data.referrer = document.referrer; data.visitor_session_id = sessionId(); data.meta_event_id = metaEventId('meta-lead'); data.fbp = cookie('_fbp'); data.fbc = cookie('_fbc');
    ['gclid', 'gbraid', 'wbraid', 'dclid', 'msclkid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (parameter) { data[parameter] = params.get(parameter) || sessionStorage.getItem('ses_' + parameter) || ''; if (params.get(parameter)) sessionStorage.setItem('ses_' + parameter, params.get(parameter)); });
    submittedLeadData = data;
    try {
      var response = await fetch(CRM_URL + '/api/web-leads', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(data) }); var payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'request_failed');
      bookingToken = payload.bookingToken || ''; track('generate_lead', { form_name: formName, service: config.serviceSlug, event_id: data.meta_event_id });
      if (!window.SES_TRACKING_DISABLED && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-18358647895/1gCfCLaood0cENf4irJE' });
      }
      form.hidden = true; document.querySelector('.progress').hidden = true; document.getElementById('success').hidden = false; loadScheduler();
    } catch (err) { button.disabled = false; button.textContent = 'Request My Free Estimate →'; window.alert('We could not send your request. Please call (804) 408-4663 and we will help you right away.'); }
  });
})();
