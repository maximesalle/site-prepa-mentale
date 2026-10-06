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

// Sélection des situations et affichage du panneau.
(() => {
  const explorer = document.querySelector('.situations-explorer');
  if (!explorer) return;

  const panel = document.querySelector('#situation-panel');
  const buttons = [...explorer.querySelectorAll('.situation-choice')];
  const mobile = window.matchMedia('(max-width: 700px)');

  const situations = [
  {
    description:
      "Vous avez préparé votre compétition, votre oral ou votre présentation. Pourtant, la pression prend le dessus et vous empêche de montrer ce dont vous êtes capable.",
    tools:
      "Réguler les émotions, renforcer la concentration et créer des repères pour les moments décisifs.",
    outcome:
      "Aborder ces moments avec plus de sérénité et de confiance."
  },
  {
    description:
      "Reprendre le sport, commencer les révisions, lancer un projet : vous en avez envie, mais vous repoussez. La frustration et la culpabilité s’installent.",
    tools:
      "Comprendre vos freins, identifier vos leviers de motivation et construire des habitudes qui facilitent le démarrage.",
    outcome:
      "Passer à l’action plus facilement et tenir dans la durée."
  },
  {
    description:
      "Prendre la parole en réunion, vous présenter à un entretien, participer à une compétition : vous doutez de votre légitimité et vous comparez, même quand vous réussissez.",
    tools:
      "Reconnaître vos forces, comprendre votre fonctionnement et développer un dialogue intérieur plus constructif.",
    outcome:
      "Faire davantage confiance à vos capacités et oser prendre votre place."
  },
  {
    description:
      "Une compétition décevante, un examen raté ou une blessure vous a déstabilisé. Vous repensez à ce qui s’est passé et craignez de revivre la même difficulté.",
    tools:
      "Accueillir les émotions, prendre du recul et reconstruire des repères pour la suite.",
    outcome:
      "Retrouver de la confiance et l’envie d’avancer."
  },
  {
    description:
      "Au travail, dans vos études ou à l’entraînement, vous attendez beaucoup de vous-même et cherchez toujours à faire mieux. Vous avez du mal à faire une pause sans culpabiliser.",
    tools:
      "Clarifier ce qui compte pour vous, ajuster vos exigences et donner une place à la récupération et au plaisir.",
    outcome:
      "Poursuivre vos ambitions tout en préservant votre équilibre."
  }
];
  let selected = 0;

  function positionPanel() {
    if (mobile.matches) {
      buttons[selected].insertAdjacentElement('afterend', panel);
    } else {
      explorer.append(panel);
    }
  }

  function selectSituation(index) {
    selected = index;
    const situation = situations[index];

    buttons.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });

    document.querySelector('#situation-description').textContent =
      situation.description;
    document.querySelector('#situation-tools-text').textContent =
      situation.tools;
    document.querySelector('#situation-outcome-text').textContent =
      situation.outcome;

    positionPanel();

    panel.classList.remove('is-changing');
    requestAnimationFrame(() => {
      panel.classList.add('is-changing');
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      selectSituation(Number(button.dataset.situation));
    });
  });

  mobile.addEventListener('change', positionPanel);
  positionPanel();
})();
