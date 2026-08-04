(function () {
  'use strict';

  if (window.SES_TRACKING_DISABLED) return;
  if (window.__sesMetaPixelLoaded) return;
  window.__sesMetaPixelLoaded = true;

  var PIXEL_ID = '2852367835139206';

  /* Meta Pixel base loader. Customer-entered form values are never sent here. */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  window.sesMetaTrack = function (eventName, parameters, eventId) {
    if (!eventName || typeof window.fbq !== 'function') return;
    var options = eventId ? { eventID: eventId } : undefined;
    window.fbq('track', eventName, parameters || {}, options);
  };
})();
