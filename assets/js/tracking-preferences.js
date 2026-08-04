(function () {
  'use strict';

  var STORAGE_KEY = 'ses_internal_tracking_disabled';
  var COOKIE_NAME = 'ses_internal_tracking_disabled';
  var GA_MEASUREMENT_ID = 'G-G4JJX4R6T3';

  function storedPreference() {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') return true;
    } catch (_) {}
    return document.cookie.split(';').some(function (part) {
      return part.trim() === COOKIE_NAME + '=1';
    });
  }

  function savePreference(disabled) {
    try {
      if (disabled) window.localStorage.setItem(STORAGE_KEY, '1');
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}

    var secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = COOKIE_NAME + '=' + (disabled ? '1' : '') +
      '; Max-Age=' + (disabled ? '31536000' : '0') +
      '; Path=/; SameSite=Lax' + secure;
  }

  var command = '';
  try {
    command = new URLSearchParams(window.location.search).get('ses_tracking') || '';
  } catch (_) {}

  if (command === 'off') savePreference(true);
  if (command === 'on') savePreference(false);

  var disabled = storedPreference();
  window.SES_TRACKING_DISABLED = disabled;
  window['ga-disable-' + GA_MEASUREMENT_ID] = disabled;

  if (command === 'off' || command === 'on') {
    try {
      var cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('ses_tracking');
      window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
    } catch (_) {}

    var showConfirmation = function () {
      var notice = document.createElement('div');
      notice.setAttribute('role', 'status');
      notice.style.cssText = 'position:fixed;z-index:2147483647;right:16px;bottom:16px;left:16px;max-width:620px;margin:auto;padding:16px 48px 16px 18px;border-radius:14px;background:#0a2540;color:#fff;box-shadow:0 16px 50px rgba(0,0,0,.28);font:600 14px/1.45 Inter,system-ui,sans-serif';
      notice.textContent = disabled
        ? 'This device is excluded from SES website analytics. Forms and scheduling still work normally.'
        : 'Website analytics tracking is active again on this device.';
      var close = document.createElement('button');
      close.type = 'button';
      close.setAttribute('aria-label', 'Dismiss');
      close.textContent = '×';
      close.style.cssText = 'position:absolute;top:7px;right:12px;padding:4px;color:#fff;background:transparent;border:0;cursor:pointer;font:700 24px/1 system-ui';
      close.addEventListener('click', function () { notice.remove(); });
      notice.appendChild(close);
      document.body.appendChild(notice);
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showConfirmation, { once: true });
    else showConfirmation();
  }
})();
