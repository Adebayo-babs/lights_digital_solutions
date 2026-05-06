// ─────────────────────────────────────────────
// CAROUSEL
// ─────────────────────────────────────────────

const slides = document.querySelectorAll('.carousel-slide');
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.carousel-dot');

const urls = [
  'lightdigital.com/work/shopease',
  'lightdigital.com/work/dashboard',
  'lightdigital.com/work/pinnacle',
  'lightdigital.com/work/meditrack',
  'lightdigital.com/work/edupath',
];

let current = 0;
let autoTimer;

if (track && slides.length) {

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;

    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    const carouselUrl = document.getElementById('carouselUrl');

    if (carouselUrl) {
      carouselUrl.textContent = urls[current];
    }
  }

  function startAuto() {
    autoTimer = setInterval(() => {
      goTo(current + 1);
    }, 3800);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
  }

  dots.forEach(d => {
    d.addEventListener('click', () => {
      stopAuto();
      goTo(+d.dataset.index);
      startAuto();
    });
  });

  // TOUCH SWIPE

  let touchX = 0;

  track.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
    stopAuto();
  });

  track.addEventListener('touchend', e => {

    const dx = e.changedTouches[0].clientX - touchX;

    if (Math.abs(dx) > 40) {
      goTo(current + (dx < 0 ? 1 : -1));
    }

    startAuto();
  });

  startAuto();
}


// ─────────────────────────────────────────────
// NAVBAR SCROLL
// ─────────────────────────────────────────────

const mainNav = document.getElementById('mainNav');

if (mainNav) {

  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 40);
  });

}


// ─────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  const navItems = document.querySelectorAll('.nav-links a');

  navItems.forEach(link => {

    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });

  });

}


// ─────────────────────────────────────────────
// PORTFOLIO FILTER
// ─────────────────────────────────────────────

function filterProjects(type, btn) {

  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.proj-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(t => {
    t.classList.remove('active');
  });

  btn.classList.add('active');

  cards.forEach(card => {

    card.style.display =
      (type === 'all' || card.dataset.type === type)
      ? ''
      : 'none';

  });

  const visible = [...cards].filter(c => c.style.display !== 'none');

  visible.forEach((c, i) => {

    c.classList.remove('wide', 'narrow', 'full', 'third');

    if (i % 3 === 0) {
      c.classList.add('wide');
    }
    else if (i % 3 === 1) {
      c.classList.add('narrow');
    }
    else {
      c.classList.add('third');
    }

  });

}


// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────

const revealItems = document.querySelectorAll(
  '.service-card, .proj-card, .testi-card, .step, .why-item, .mvp-card'
);

if (revealItems.length) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(e => {

      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }

    });

  }, {
    threshold: 0.08
  });

  revealItems.forEach(el => {

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';

    observer.observe(el);

  });

}


// ─────────────────────────────────────────────
// FCW
// ─────────────────────────────────────────────

const fcw = document.getElementById('fcw');
const fcwBtn = document.getElementById('fcwToggle');

if (fcw && fcwBtn) {

  fcwBtn.addEventListener('click', e => {

    e.stopPropagation();

    const isOpen = fcw.classList.toggle('is-open');

    fcwBtn.setAttribute('aria-expanded', isOpen);

  });

  document.addEventListener('click', e => {

    if (!fcw.contains(e.target)) {

      fcw.classList.remove('is-open');

      fcwBtn.setAttribute('aria-expanded', 'false');

    }

  });

}