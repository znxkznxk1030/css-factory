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
}

listNavLink.forEach((elNavLink) => {
  elNavLink.addEventListener('click', () => {
    removeActiveClass();
    elNavLink.classList.add('active');
  });
});
