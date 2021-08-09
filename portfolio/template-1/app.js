// ====== HEADER ===== //

let isMenuOpen = false;

const elMenuIcon = document.getElementById('nav-toggle');
const elNavMenu = document.getElementById('nav-menu');

elMenuIcon.addEventListener('click', () => {
  elNavMenu.classList.toggle('nav__show');
});

const listNavLink = document.querySelectorAll('.nav__link');

const removeActiveClass = () => {
  listNavLink.forEach((elNavLink) => {
    elNavLink.classList.remove('active');
  });
};

listNavLink.forEach((elNavLink) => {
  elNavLink.addEventListener('click', () => {
    removeActiveClass();
    elNavLink.classList.add('active');
  });
});

// ====== HOME ====== //
gsap.registerPlugin(ScrollTrigger);

const t1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.home',
      start: 'center center',
      end: 'bottom top',
      // markers: true,
      pin: true,
      scrub: true,
    },
  })
  .addLabel('target-point');

t1.from(
  '.home__image--sunglasses',
  { opacity: 0, top: '-150px' },
  'target-point'
);
t1.from('.home__image--gold', { opacity: 0, left: '-150px' }, 'target-point');
