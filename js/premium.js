/**
 * Wedding Website — Premium JS
 * Features: Preloader, Petals, Countdown, Sticky Nav,
 *           Scroll Reveal, Lightbox, RSVP, Dark Mode,
 *           Music, Parallax, Back-to-Top
 */
(function () {
  'use strict';

  /* ── Preloader ─────────────────────────────────────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var el = document.getElementById('preloader');
      if (el) el.classList.add('loaded');
    }, 900);
  });

  /* ── Floating Petals ────────────────────────────────── */
  function spawnPetals() {
    var wrap = document.querySelector('.petals-wrap');
    if (!wrap) return;

    var colors = [
      'rgba(242,196,206,0.5)',
      'rgba(232,168,184,0.4)',
      'rgba(201,168,76,0.3)',
      'rgba(245,234,186,0.35)',
      'rgba(255,255,255,0.2)',
    ];

    for (var i = 0; i < 22; i++) {
      (function (idx) {
        var p = document.createElement('div');
        p.className = 'petal';
        var size = Math.random() * 9 + 4;
        var left = Math.random() * 100;
        var delay = Math.random() * 18;
        var dur = Math.random() * 12 + 18;
        var color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText =
          'left:' + left + '%;' +
          'width:' + size + 'px;' +
          'height:' + size + 'px;' +
          'background:' + color + ';' +
          'animation-delay:' + delay + 's;' +
          'animation-duration:' + dur + 's;';
        wrap.appendChild(p);
      })(i);
    }
  }

  /* ── Countdown Timer ────────────────────────────────── */
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;

    var target = new Date('2026-04-29T19:52:00+05:30').getTime();
    var now = Date.now();

    if (now >= target) {
      el.innerHTML =
        '<div class="cd-married">We\'re Married! \u{1F48D}\u2728</div>';
      return;
    }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        el.innerHTML =
          '<div class="cd-married">We\'re Married! \u{1F48D}\u2728</div>';
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);

      function pad(n) { return String(n).padStart(2, '0'); }
      document.getElementById('cd-d').textContent = pad(d);
      document.getElementById('cd-h').textContent = pad(h);
      document.getElementById('cd-m').textContent = pad(m);
      document.getElementById('cd-s').textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── Sticky Nav ─────────────────────────────────────── */
  function initNav() {
    var nav = document.querySelector('.premium-nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    var burger = document.querySelector('.nav-burger');
    var links  = document.querySelector('.nav-links');
    if (burger && links) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        links.classList.toggle('open');
      });
      links.querySelectorAll('.nav-link').forEach(function (a) {
        a.addEventListener('click', function () {
          burger.classList.remove('open');
          links.classList.remove('open');
        });
      });
    }
  }

  /* ── Scroll Reveal (Intersection Observer) ───────────── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero Parallax ──────────────────────────────────── */
  function initParallax() {
    var bg = document.querySelector('.hero-bg');
    if (!bg) return;
    window.addEventListener('scroll', function () {
      bg.style.transform = 'translateY(' + (window.scrollY * 0.38) + 'px)';
    }, { passive: true });
  }

  /* ── Smooth Scroll ──────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Dark Mode ──────────────────────────────────────── */
  function initDarkMode() {
    var btn  = document.getElementById('themeBtn');
    var body = document.body;
    if (!btn) return;

    var saved = localStorage.getItem('ww-theme') || 'light';
    applyTheme(saved);

    btn.addEventListener('click', function () {
      var next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('ww-theme', next);
    });

    function applyTheme(t) {
      if (t === 'dark') {
        body.setAttribute('data-theme', 'dark');
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.title = 'Switch to light mode';
      } else {
        body.removeAttribute('data-theme');
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.title = 'Switch to dark mode';
      }
    }
  }

  /* ── Background Music ───────────────────────────────── */
  function initMusic() {
    var btn   = document.getElementById('musicBtn');
    var audio = document.getElementById('bgAudio');
    if (!btn) return;

    var playing = false;

    btn.addEventListener('click', function () {
      playing = !playing;
      btn.classList.toggle('music-playing', playing);
      btn.title = playing ? 'Pause music' : 'Play music';

      if (!audio) return;
      if (playing) {
        audio.play().catch(function () {
          playing = false;
          btn.classList.remove('music-playing');
        });
      } else {
        audio.pause();
      }
    });
  }

  /* ── Gallery Lightbox ───────────────────────────────── */
  function initLightbox() {
    var lb    = document.getElementById('lightbox');
    var img   = document.getElementById('lb-img');
    var close = document.getElementById('lb-close');
    if (!lb) return;

    document.querySelectorAll('.gal-item[data-src]').forEach(function (item) {
      item.addEventListener('click', function () {
        var src = item.getAttribute('data-src');
        if (img) img.src = src;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (close) close.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ── RSVP Form ──────────────────────────────────────── */
  function initRSVP() {
    var form    = document.getElementById('rsvpForm');
    var success = document.getElementById('rsvpSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-rsvp');
      if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>&nbsp; Sending…'; }

      setTimeout(function () {
        form.style.display = 'none';
        if (success) success.classList.add('show');
      }, 1400);
    });
  }

  /* ── Back to Top ────────────────────────────────────── */
  function initBTT() {
    var btn = document.getElementById('btt');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 450);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Boot ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    spawnPetals();
    initCountdown();
    initNav();
    initReveal();
    initParallax();
    initSmoothScroll();
    initDarkMode();
    initMusic();
    initLightbox();
    initRSVP();
    initBTT();
  });

}());
