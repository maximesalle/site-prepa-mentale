// Menu sur mobile.
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Repère de la section sélectionnée dans le sommaire.
const sectionLinks = document.querySelectorAll('.wayfinder a[href^="#"]');
function markCurrentSection() {
  sectionLinks.forEach((link) => {
    link.classList.toggle('is-active', location.hash === link.getAttribute('href'));
  });
}
addEventListener('hashchange', markCurrentSection);
markCurrentSection();
