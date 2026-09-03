/*
  Embassy of Education — Analytics loader (GA4)

  This does NOT collect anything by itself. It only starts Google Analytics
  once BOTH of these are true:
    1. assets/js/config.js has a real gaMeasurementId (starts with "G-")
    2. the visitor has clicked "Accept" on the cookie banner (or already had,
       from a previous visit)

  Every event already pushed to window.dataLayer by main.js (whatsapp clicks,
  phone clicks, booking clicks, case-readiness completion, etc.) is picked up
  automatically once this loads — nothing else needs to change.

  Per the site's privacy rules: never add code here that sends names, phone
  numbers, email addresses, passport/DS-160 data, or free-text form answers
  as event parameters. The existing track() calls in main.js already avoid
  this — keep it that way if you add new ones.
*/
(() => {
  'use strict';

  const cfg = window.EOE_CONFIG || {};
  const measurementId = cfg.gaMeasurementId;
  if (!measurementId || !measurementId.startsWith('G-')) return;

  const hasConsent = () => {
    try {
      return window.localStorage.getItem('eoe-cookie-choice') === 'accept';
    } catch (_) {
      return false;
    }
  };

  let loaded = false;
  const loadGA4 = () => {
    if (loaded || !hasConsent()) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    // IP anonymisation and no ad-personalisation signals by default —
    // this is a local advisory site, not an ad-funded one.
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      allow_ad_personalization_signals: false,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  };

  // Returning visitor who already consented — load right away.
  if (hasConsent()) {
    loadGA4();
  } else {
    // First-time visitor — load the moment they click "Accept" on the
    // existing cookie banner (main.js already stores the choice; this just
    // also listens for it so analytics starts in the same click).
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cookie="accept"]');
      if (btn) window.setTimeout(loadGA4, 0);
    });
  }
})();
