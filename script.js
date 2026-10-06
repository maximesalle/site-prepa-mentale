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
      title: 'Être prêt, mais perdre ses repères.',
      description:
        'Vous avez préparé votre compétition, votre oral ou votre présentation. Pourtant, la pression prend le dessus : votre concentration baisse et vous n’arrivez plus à montrer ce dont vous êtes capable.',
      tools:
        'Réguler le stress et les émotions, renforcer votre concentration et construire une routine de préparation qui vous correspond.',
      outcome:
        'Vous sentir plus serein et mobiliser vos capacités quand cela compte.'
    },
    {
      title: 'Avoir envie, mais ne pas réussir à commencer.',
      description:
        'Reprendre le sport, commencer les révisions, lancer un projet : vous savez ce que vous souhaitez faire, mais vous repoussez. À force, la frustration et la culpabilité s’installent.',
      tools:
        'Comprendre ce qui freine le démarrage, identifier ce qui vous motive et construire des habitudes accessibles dans votre quotidien.',
      outcome:
        'Commencer plus facilement et avancer avec davantage de régularité.'
    },
    {
      title: 'Ne pas toujours reconnaître ses propres capacités.',
      description:
        'Vous vous comparez, redoutez le regard des autres ou hésitez à prendre votre place. Même lorsque vous réussissez, le doute reste présent et vous freine.',
      tools:
        'Mieux vous connaître, reconnaître vos forces et développer un dialogue intérieur plus constructif.',
      outcome:
        'Vous appuyer sur vos ressources et oser vous engager dans ce qui compte pour vous.'
    },
    {
      title: 'Retrouver un élan après une difficulté.',
      description:
        'Une déception, une blessure ou un objectif manqué vous a déstabilisé. Vous repensez à ce qui s’est passé et craignez de revivre la même situation.',
      tools:
        'Accueillir les émotions, prendre du recul et reconstruire des repères pour préparer les prochaines étapes à votre rythme.',
      outcome:
        'Retrouver de la confiance et une direction pour la suite.'
    },
    {
      title: 'Avancer sans être constamment sous tension.',
      description:
        'Vous attendez beaucoup de vous-même. Chaque objectif devient une nouvelle exigence, vous avez du mal à relâcher la pression et profitez peu de vos progrès.',
      tools:
        'Clarifier ce qui compte pour vous, ajuster vos attentes et donner une place à la récupération et au plaisir.',
      outcome:
        'Poursuivre vos ambitions tout en préservant votre équilibre.'
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

    document.querySelector('#situation-panel-title').textContent =
      situation.title;
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
