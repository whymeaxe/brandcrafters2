(() => {
  'use strict';

  const cfg = window.EOE_CONFIG || {};
  const body = document.body;
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const storageGet = (kind, key) => { try { return window[kind].getItem(key); } catch (_) { return null; } };
  const storageSet = (kind, key, value) => { try { window[kind].setItem(key, value); return true; } catch (_) { return false; } };

  const track = (eventName, payload = {}) => {
    if (storageGet('localStorage', 'eoe-cookie-choice') !== 'accept') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
  };

  // Configuration-backed content.
  qsa('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
  qsa('[data-rating]').forEach((node) => { node.textContent = cfg.publicRating || node.textContent; });
  qsa('[data-rating-count]').forEach((node) => { node.textContent = cfg.publicRatingCount || node.textContent; });
  qsa('[data-rating-source]').forEach((node) => { node.textContent = cfg.publicRatingSource || node.textContent; });
  qsa('[data-phone-display]').forEach((node) => { node.textContent = cfg.phoneDisplay || node.textContent; });
  qsa('[data-address]').forEach((node) => { node.textContent = cfg.address || node.textContent; });
  qsa('[data-hours]').forEach((node) => { node.textContent = cfg.hours || node.textContent; });
  qsa('[data-mapping-fee]').forEach((node) => { node.textContent = cfg.mappingFee || ''; });
  qsa('[data-mapping-fee-wrap]').forEach((node) => { node.hidden = !cfg.showMappingFee; });
  qsa('[data-google-review]').forEach((node) => {
    if (cfg.googleReviewUrl) node.href = cfg.googleReviewUrl;
    else node.hidden = true;
  });
  qsa('[data-google-review-view]').forEach((node) => {
    if (cfg.googleReviewsViewUrl) node.href = cfg.googleReviewsViewUrl;
  });
  qsa('[data-booking-link]').forEach((node) => {
    if (cfg.bookingUrl) node.href = cfg.bookingUrl;
  });
  qsa('[data-map-embed]').forEach((host) => {
    if (!cfg.googleMapsEmbedUrl) return;
    const iframe = document.createElement('iframe');
    iframe.src = cfg.googleMapsEmbedUrl;
    iframe.title = 'Embassy of Education on Google Maps';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    host.replaceChildren(iframe);
  });

  // Mobile navigation.
  const menuToggle = qs('.menu-toggle');
  const primaryNav = qs('.primary-nav');
  const dropdowns = qsa('.nav-dropdown');
  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
    body.classList.remove('menu-open');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const button = qs('button', dropdown);
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.classList.toggle('is-open', !isOpen);
      body.classList.toggle('menu-open', !isOpen);
      track('navigation_menu_toggle', { state: isOpen ? 'closed' : 'open' });
    });
    qsa('a', primaryNav).forEach((link) => link.addEventListener('click', closeMenu));
  }
  const closeDropdowns = (except) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      const button = qs('button', dropdown);
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };
  dropdowns.forEach((dropdown) => {
    const button = qs('button', dropdown);
    if (!button) return;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const willOpen = !dropdown.classList.contains('is-open');
      closeDropdowns(willOpen ? dropdown : null);
      dropdown.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
      if (!willOpen) button.blur();
    });
    qsa('a', dropdown).forEach((link) => link.addEventListener('click', () => {
      dropdown.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }));
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) closeDropdowns();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      const focused = document.activeElement;
      if (focused && focused.blur) focused.blur();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });

  // FAQ accordions.
  qsa('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(question.getAttribute('aria-controls') || '');
      question.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) answer.classList.toggle('is-open', !isExpanded);
    });
  });

  // Accessible modal manager.
  let activeModal = null;
  let lastFocused = null;
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const openModal = (modal, triggerName = '') => {
    if (!modal) return;
    activeModal = modal;
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    const first = qs(focusableSelector, modal);
    if (first) first.focus();
    track('modal_open', { modal: triggerName || modal.id });
  };

  const closeModal = () => {
    if (!activeModal) return;
    activeModal.classList.remove('is-open');
    activeModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    activeModal = null;
  };

  qsa('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const key = trigger.dataset.openModal || '';
      const modal = key === 'booking' ? qs('#bookingModal') : key === 'readiness' ? qs('#readinessModal') : qs(`#${CSS.escape(key)}`);
      if (!modal) return;
      event.preventDefault();
      openModal(modal, key);
    });
  });

  qsa('.modal').forEach((modal) => {
    qsa('.modal-close', modal).forEach((button) => button.addEventListener('click', closeModal));
    modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeModal(); closeMenu(); }
    if (event.key === 'Tab' && activeModal) {
      const focusables = qsa(focusableSelector, activeModal).filter((el) => !el.hidden && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Load third-party booking only when requested.
  qsa('[data-booking-embed]').forEach((host) => {
    const button = qs('[data-load-booking]', host);
    if (!button) return;
    if (!cfg.bookingUrl) {
      button.textContent = 'Book through WhatsApp';
      button.addEventListener('click', () => {
        const text = encodeURIComponent('Hello Embassy of Education, I would like to book a confidential case-mapping session.');
        window.open(`https://wa.me/${cfg.phoneE164 || '919638955666'}?text=${text}`, '_blank', 'noopener,noreferrer');
        track('booking_whatsapp_click');
      });
      return;
    }
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = cfg.bookingUrl;
      iframe.title = 'Book an Embassy of Education consultation';
      iframe.loading = 'lazy';
      iframe.style.width = '100%';
      iframe.style.minHeight = '720px';
      iframe.style.border = '0';
      host.replaceChildren(iframe);
      track('booking_widget_loaded');
    }, { once: true });
  });

  // WhatsApp form handling.
  const getLabel = (field) => {
    const label = field.id ? qs(`label[for="${CSS.escape(field.id)}"]`) : null;
    return label ? label.textContent.replace('*', '').trim() : field.name || 'Field';
  };

  qsa('.whatsapp-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageBox = qs('.form-message', form);
      if (!form.checkValidity()) {
        form.reportValidity();
        if (messageBox) {
          messageBox.textContent = 'Please complete all required fields.';
          messageBox.className = 'form-message error';
        }
        return;
      }
      const fields = Array.from(form.elements).filter((field) => {
        if (!field.name || ['submit', 'button'].includes(field.type)) return false;
        if (['checkbox', 'radio'].includes(field.type) && !field.checked) return false;
        return String(field.value || '').trim() !== '';
      });
      const lines = [`*${form.dataset.messagePrefix || 'New Embassy of Education website enquiry'}*`, ''];
      fields.forEach((field) => {
        if (field.name === 'consent') return;
        const value = field.options && field.selectedIndex >= 0 ? field.options[field.selectedIndex].text : field.value;
        lines.push(`*${getLabel(field)}:* ${String(value).trim()}`);
      });
      lines.push('', 'I understand that visa approval is solely at the discretion of the relevant Embassy/Consulate.');
      const url = `https://wa.me/${cfg.phoneE164 || '919638955666'}?text=${encodeURIComponent(lines.join('\n'))}`;
      if (messageBox) {
        messageBox.textContent = 'Your case summary is ready. WhatsApp will open in a new tab.';
        messageBox.className = 'form-message success';
      }
      track('whatsapp_form_submit', { form: form.dataset.messagePrefix || 'website_enquiry' });
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // Case readiness tool. Answers are used only in memory for the current interaction.
  qsa('[data-readiness-tool]').forEach((tool) => {
    const steps = qsa('.readiness-step', tool);
    const bars = qsa('.readiness-progress span', tool);
    const result = qs('.readiness-result', tool);
    let stepIndex = 0;

    const showStep = (nextIndex) => {
      stepIndex = Math.max(0, Math.min(nextIndex, steps.length - 1));
      steps.forEach((step, index) => step.classList.toggle('is-active', index === stepIndex));
      bars.forEach((bar, index) => bar.classList.toggle('is-done', index <= stepIndex));
    };

    const isCurrentStepValid = () => {
      const step = steps[stepIndex];
      if (!step) return true;
      const groups = qsa('[data-required-group]', step);
      let valid = true;
      groups.forEach((group) => {
        if (!qs('input:checked, select:valid', group)) valid = false;
      });
      const message = qs('.form-message', step);
      if (!valid && message) {
        message.textContent = 'Please select an option to continue.';
        message.className = 'form-message error';
      } else if (message) {
        message.textContent = '';
        message.className = 'form-message';
      }
      return valid;
    };

    qsa('[data-readiness-next]', tool).forEach((button) => button.addEventListener('click', () => {
      if (isCurrentStepValid()) showStep(stepIndex + 1);
    }));
    qsa('[data-readiness-prev]', tool).forEach((button) => button.addEventListener('click', () => showStep(stepIndex - 1)));

    const form = qs('form', tool);
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const state = {};
        const formData = new FormData(form);
        formData.forEach((value, key) => {
          if (Object.prototype.hasOwnProperty.call(state, key)) state[key] = Array.isArray(state[key]) ? [...state[key], value] : [state[key], value];
          else state[key] = value;
        });

        const reviewAreas = new Set();
        const serviceLinks = new Map();
        const concerns = Array.isArray(state.concern) ? state.concern : state.concern ? [state.concern] : [];
        concerns.forEach((concern) => {
          if (concern === 'consistency') { reviewAreas.add('DS-160 consistency'); serviceLinks.set('DS-160 Review', 'ds160-review.html'); }
          if (concern === 'purpose') { reviewAreas.add('Purpose logic'); serviceLinks.set('Refusal Diagnostic Audit', 'visa-refusal.html'); }
          if (concern === 'finances') { reviewAreas.add('Financial credibility'); serviceLinks.set('B1/B2 Strategy', 'b1-b2.html'); }
          if (concern === 'ties') { reviewAreas.add('Home-country context'); serviceLinks.set('B1/B2 Strategy', 'b1-b2.html'); }
          if (concern === 'interview') { reviewAreas.add('Interview readiness'); serviceLinks.set('Interview Readiness', 'interview-readiness.html'); }
          if (concern === 'course') { reviewAreas.add('Course and career logic'); serviceLinks.set('F-1 Strategy', 'f1-student.html'); }
        });
        if (state.refusals && state.refusals !== '0') reviewAreas.add('Refusal history');
        if (state.ds160 === 'submitted') reviewAreas.add('Submitted DS-160 review urgency');
        if (state.appointment === 'soon') reviewAreas.add('Time-sensitive preparation');
        if (!reviewAreas.size) reviewAreas.add('Overall case coherence');

        const riskHost = qs('[data-risk-tags]', result);
        const linkHost = qs('[data-result-links]', result);
        if (riskHost) riskHost.innerHTML = Array.from(reviewAreas).map((area) => `<span class="risk-tag">${area}</span>`).join('');
        if (linkHost) linkHost.innerHTML = Array.from(serviceLinks.entries()).map(([label, href]) => `<a class="btn-link" href="${href}">${label}</a>`).join('<span aria-hidden="true"> · </span>');

        const summary = [
          'Hello Embassy of Education, I completed the U.S. Visa Case Readiness Check.',
          `Visa category: ${state.category || 'Not stated'}`,
          `Previous refusals: ${state.refusals || 'Not stated'}`,
          `DS-160 status: ${state.ds160 || 'Not stated'}`,
          `Interview status: ${state.appointment || 'Not stated'}`,
          `Review areas indicated: ${Array.from(reviewAreas).join(', ')}`,
          '',
          'I understand that this is not an approval prediction. I would like to discuss the appropriate next step.'
        ];
        const whatsappLink = qs('[data-readiness-whatsapp]', result);
        if (whatsappLink) whatsappLink.href = `https://wa.me/${cfg.phoneE164 || '919638955666'}?text=${encodeURIComponent(summary.join('\n'))}`;

        steps.forEach((step) => step.classList.remove('is-active'));
        if (result) result.classList.add('is-visible');
        track('case_readiness_complete', { category: state.category || 'not_stated' });
      });
    }
    showStep(0);
  });

  // Case library filtering.
  const filterButtons = qsa('.filter-button');
  const filterItems = qsa('[data-case-category]');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    filterItems.forEach((item) => {
      const categories = (item.dataset.caseCategory || '').split(' ');
      item.hidden = filter !== 'all' && !categories.includes(filter);
    });
  }));

  // Restrained reveal motion.
  const revealTargets = qsa('.section, .section-sm, .card, .exhibit-card, .dossier-card').filter((element) => !element.classList.contains('reveal'));
  revealTargets.forEach((element) => element.classList.add('reveal'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  // Dossier side tabs active state.
  const sideTabs = qsa('.folder-tabs a');
  if (sideTabs.length && 'IntersectionObserver' in window) {
    const sectionMap = new Map(sideTabs.map((link) => [link.getAttribute('href')?.replace('#', ''), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sideTabs.forEach((link) => link.classList.remove('is-active'));
      const active = sectionMap.get(visible.target.id);
      if (active) active.classList.add('is-active');
    }, { threshold: [0.2, 0.5], rootMargin: '-20% 0px -55% 0px' });
    sectionMap.forEach((_, id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
  }

  // Case Navigator: broad content areas only; no applicant answers are stored.
  const categories = ['diagnosis', 'services', 'process', 'evidence', 'about', 'contact'];
  const pathname = window.location.pathname.toLowerCase();
  const current = body.dataset.section || (
    pathname.includes('visa-refusal') || pathname.includes('ds160') ? 'diagnosis' :
    pathname.includes('b1-b2') || pathname.includes('f1-student') || pathname.includes('interview') || pathname.includes('study-in-usa') || pathname.includes('services') ? 'services' :
    pathname.includes('success') ? 'evidence' : pathname.includes('about') ? 'about' : pathname.includes('contact') ? 'contact' : 'process'
  );
  let viewed = [];
  try { viewed = JSON.parse(storageGet('localStorage', 'eoe-case-navigator') || '[]'); } catch (_) { viewed = []; }
  if (!viewed.includes(current) && categories.includes(current)) {
    viewed.push(current);
    storageSet('localStorage', 'eoe-case-navigator', JSON.stringify(viewed));
  }

  const navigator = qs('.case-navigator');
  if (navigator) {
    qsa('.case-progress span', navigator).forEach((bar) => bar.classList.toggle('is-viewed', viewed.includes(bar.dataset.navSection)));
    const count = qs('[data-nav-count]', navigator);
    if (count) count.textContent = String(viewed.length);
    const next = categories.find((category) => !viewed.includes(category));
    const nextMap = {
      diagnosis: ['Review the diagnostic method', 'visa-refusal.html'],
      services: ['Compare premium services', 'services.html'],
      process: ['Understand the case journey', 'index.html#process'],
      evidence: ['Explore the case-evidence approach', 'success-stories.html'],
      about: ['Meet the founder and methodology', 'about.html'],
      contact: ['Book a confidential case review', 'contact.html']
    };
    const nextLink = qs('[data-nav-next]', navigator);
    if (nextLink && next && nextMap[next]) { nextLink.textContent = nextMap[next][0]; nextLink.href = nextMap[next][1]; }
    if (nextLink && !next) { nextLink.textContent = 'Ready to map your case?'; nextLink.href = 'contact.html'; }
    const closeButton = qs('[data-close-navigator]', navigator);
    if (closeButton) closeButton.addEventListener('click', () => {
      navigator.hidden = true;
      storageSet('sessionStorage', 'eoe-nav-hidden', '1');
    });
    const revealNavigator = () => {
      if (storageGet('sessionStorage', 'eoe-nav-hidden') === '1' || navigator.hidden) return;
      navigator.classList.add('is-visible');
    };
    if (storageGet('sessionStorage', 'eoe-nav-hidden') !== '1') {
      window.setTimeout(revealNavigator, 5000);
      window.addEventListener('scroll', () => { if (window.scrollY > 520) revealNavigator(); }, { passive: true, once: true });
    } else navigator.hidden = true;
  }

  // Cookie preference.
  const cookieBanner = qs('.cookie-banner');
  const cookieChoice = storageGet('localStorage', 'eoe-cookie-choice');
  if (cookieBanner && !cookieChoice) window.setTimeout(() => cookieBanner.classList.add('is-visible'), 1000);
  qsa('[data-cookie]').forEach((button) => button.addEventListener('click', () => {
    const choice = button.dataset.cookie === 'accept' ? 'accept' : 'essential';
    storageSet('localStorage', 'eoe-cookie-choice', choice);
    if (cookieBanner) cookieBanner.classList.remove('is-visible');
    if (choice === 'accept') track('consent_update', { analytics: 'granted' });
  }));

  // Ensure safe external links and track core CTAs after consent.
  qsa('a[target="_blank"]').forEach((link) => {
    const rel = new Set((link.getAttribute('rel') || '').split(' ').filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    link.setAttribute('rel', Array.from(rel).join(' '));
  });
  qsa('a[href^="tel:"]').forEach((link) => link.addEventListener('click', () => track('phone_click')));
  qsa('a[href*="wa.me"], [data-open-modal="booking"]').forEach((link) => link.addEventListener('click', () => track('primary_cta_click', { label: link.textContent.trim().slice(0, 70) })));
})();
