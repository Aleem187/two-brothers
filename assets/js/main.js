/* ==========================================================================
   Two Brothers Chicken — interactions
   Scroll reveal · sticky header · mobile nav · menu filter · nav spy ·
   live open/closed status · contact form · back-to-top
   ========================================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------- Sticky header on scroll ---------------------- */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');
  var progress = document.getElementById('scrollProgress');
  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 700);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min((y / h) * 100, 100) : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------- Mobile menu ------------------------------ */
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  function setMenu(open) {
    if (!toggle || !mobileMenu) return;
    toggle.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!mobileMenu.classList.contains('open')); });
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* --------------------------- Scroll reveal ---------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------- Menu filter ----------------------------- */
  var tabs = document.querySelectorAll('.menu-tab');
  var cards = document.querySelectorAll('#menuGrid .menu-card');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = tab.getAttribute('data-filter');
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      cards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-cat') === filter;
        if (show) {
          card.classList.remove('hide');
          // re-trigger subtle fade
          card.style.animation = 'none';
          // eslint-disable-next-line no-unused-expressions
          card.offsetHeight;
          card.style.animation = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(18px)';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* -------------------------- Scrollspy nav ----------------------------- */
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: link, sec: sec });
    }
  });
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = sections.find(function (s) { return s.sec === entry.target; });
          if (match) match.link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s.sec); });
  }

  /* -------------------- Live open / closed status ----------------------- */
  // Hours: Mon–Tue 11:30–22:00, Wed–Sun 11:30–23:30 (local restaurant time)
  var hours = {
    0: [11.5, 23.5], // Sun
    1: [11.5, 22],   // Mon
    2: [11.5, 22],   // Tue
    3: [11.5, 23.5], // Wed
    4: [11.5, 23.5], // Thu
    5: [11.5, 23.5], // Fri
    6: [11.5, 23.5]  // Sat
  };
  function updateOpenStatus() {
    var now = new Date();
    var day = now.getDay();
    var cur = now.getHours() + now.getMinutes() / 60;
    var range = hours[day];
    var isOpen = range && cur >= range[0] && cur < range[1];
    var pill = document.getElementById('openPill');
    var text = document.getElementById('openText');
    if (pill && text) {
      if (isOpen) {
        text.textContent = 'Open Now';
        pill.style.background = 'rgba(46,160,90,0.15)';
        pill.style.color = '#6fe0a0';
        pill.style.borderColor = 'rgba(46,160,90,0.3)';
      } else {
        text.textContent = 'Currently Closed';
        pill.style.background = 'rgba(200,16,46,0.14)';
        pill.style.color = '#ff9aa8';
        pill.style.borderColor = 'rgba(200,16,46,0.3)';
        var dot = pill.querySelector('.dot');
        if (dot) { dot.style.background = '#ff6b7d'; dot.style.animation = 'none'; }
      }
    }
    // Highlight today's row
    var todayRow = document.querySelector('#hoursTable tr[data-day="' + day + '"]');
    if (todayRow) todayRow.classList.add('today');
  }
  updateOpenStatus();

  /* --------------------------- Contact form ----------------------------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Basic client-side validation; let FormSubmit handle delivery.
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var valid = name.value.trim() && /\S+@\S+\.\S+/.test(email.value) && message.value.trim();
      if (!valid) {
        e.preventDefault();
        if (status) { status.className = 'form-status err'; status.textContent = 'Please fill in your name, a valid email and a message.'; }
        return;
      }
      // If JS-only (no backend configured), show optimistic message.
      if (status) { status.className = 'form-status ok'; status.textContent = 'Thanks! Sending your message…'; }
    });
  }

  /* -------------------- Brand video (click-to-play) --------------------- */
  // Facade: preload="none" + poster means nothing downloads until the user
  // hits play, so the section costs almost nothing on initial load.
  var videoPlay = document.getElementById('videoPlay');
  var brandVideo = document.getElementById('brandVideo');
  if (videoPlay && brandVideo) {
    videoPlay.addEventListener('click', function () {
      brandVideo.preload = 'auto';
      brandVideo.controls = true;
      var p = brandVideo.play();
      if (p && typeof p.then === 'function') {
        p.then(function () { videoPlay.classList.add('hidden'); })
         .catch(function () { videoPlay.classList.remove('hidden'); });
      } else {
        videoPlay.classList.add('hidden');
      }
    });
    brandVideo.addEventListener('play', function () { videoPlay.classList.add('hidden'); });
    brandVideo.addEventListener('pause', function () {
      if (!brandVideo.ended) videoPlay.classList.remove('hidden');
    });
    brandVideo.addEventListener('ended', function () { videoPlay.classList.remove('hidden'); });
  }

  /* ------------------------- Count-up numbers --------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500, startTime = null;
    function tick(ts) {
      if (startTime === null) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) { requestAnimationFrame(tick); }
      else { el.textContent = target.toFixed(dec) + suffix; }
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !prefersReduced && 'IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ----------------------------- Year ----------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --------------- Subtle hero parallax (respect reduced) --------------- */
  if (!prefersReduced) {
    var heroContent = document.querySelector('.hero__content');
    var grain = document.querySelector('.hero__grain');
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (y < window.innerHeight) {
        if (heroContent) heroContent.style.transform = 'translateY(' + y * 0.12 + 'px)';
        if (heroContent) heroContent.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.8)));
        if (grain) grain.style.transform = 'translateY(' + y * 0.2 + 'px)';
      }
    }, { passive: true });
  }
})();
