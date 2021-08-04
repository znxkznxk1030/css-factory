let isMenuOpen = false;

const elMenuIcon = document.getElementById('nav-toggle');
const elNavMenu = document.getElementById('nav-menu');

elMenuIcon.addEventListener('click', () => {
  elNavMenu.classList.toggle('nav__show');
});
