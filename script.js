/* ============================================
   SUSHI SILKS — Premium JavaScript
   Kasturi Nagar, Bengaluru
   All functionality, animations & effects
   ============================================ */

(function () {
  'use strict';

  /* ============ LOADER ============ */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1500);
  });

  document.body.style.overflow = 'hidden';

  /* ============ CUSTOM CURSOR ============ */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll('a, button, .col-card, .why-card, .cat-item, .testi-card, .hamburger');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });
  }

  /* ============ NAVBAR SCROLL ============ */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ============ MOBILE MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mmLinks = document.querySelectorAll('.mm-link, .mm-cta');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  mmLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  /* ============ SMOOTH SCROLL ============ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ============ CARD ANIMATIONS (IntersectionObserver) ============ */
  const observerOptions = { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => { el.classList.add('visible'); }, delay);
        cardObserver.unobserve(el);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.col-card, .why-card').forEach(card => {
    cardObserver.observe(card);
  });

  /* ============ CAT ITEM STAGGER ANIMATION ============ */
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    catObserver.observe(el);
  });

  /* ============ COUNTER ANIMATION ============ */
  const statNums = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = current < 10 ? current.toFixed(1) : Math.floor(current);
      if (current < target) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target < 10 ? target.toFixed(1) : target + '+';
      }
    };
    update();
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => statsObserver.observe(num));

  /* ============ PARALLAX HERO GRID ============ */
  const heroGrid = document.querySelector('.hero-grid');
  const heroGlow = document.querySelector('.hero-glow');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.2}px)`;
    if (heroGlow) heroGlow.style.transform = `translateY(${scrollY * 0.1}px)`;
  }, { passive: true });

  /* ============ HERO VISUAL MOUSE PARALLAX ============ */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ============ TICKER PAUSE ON HOVER ============ */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
    ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });
  }

  /* ============ ACTIVE NAV LINK HIGHLIGHT ============ */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeStyle = document.createElement('style');
  activeStyle.textContent = `.nav-links a.active-link { color: var(--silk-light) !important; } .nav-links a.active-link::after { width: 100% !important; }`;
  document.head.appendChild(activeStyle);

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinksAll.forEach(l => l.classList.remove('active-link'));
          link.classList.add('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });

  /* ============ FLOAT CALL PULSE ============ */
  const floatCall = document.querySelector('.float-call');
  if (floatCall) {
    const pulse = document.createElement('span');
    pulse.style.cssText = `
      position:absolute; inset:-6px; border-radius:50%;
      border:2px solid rgba(184,134,11,0.5);
      animation:callPulse 2s ease-out infinite;
      pointer-events:none;
    `;
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
      @keyframes callPulse {
        0%{transform:scale(1);opacity:0.8}
        100%{transform:scale(1.5);opacity:0}
      }
    `;
    document.head.appendChild(pulseStyle);
    floatCall.style.position = 'fixed';
    floatCall.appendChild(pulse);
  }

  /* ============ CARD TILT EFFECT ============ */
  document.querySelectorAll('.col-card, .why-card, .testi-card, .cat-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ============ SECTION FADE IN ============ */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.testi-card, .info-item, .rating-summary').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(el);
  });

  /* ============ NAVBAR LOGO SCROLL TO TOP ============ */
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ RESIZE HANDLER ============ */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu) {
      closeMobileMenu();
    }
  });

  console.log('%cSUSHI SILKS 🥻', 'color:#d4a843;font-size:2rem;font-weight:bold;font-family:Georgia,serif;');
  console.log('%cBuilt with ❤️ for Sushi Silks, Kasturi Nagar, Bengaluru', 'color:#888;font-size:0.8rem;');

})();
