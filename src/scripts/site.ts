const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#primary-navigation');
const mobileQuery = window.matchMedia('(max-width: 1050px)');

if (menuButton && navigation) {
  document.documentElement.classList.add('js');
  menuButton.hidden = false;
  const setMenu = (open: boolean) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navigation.classList.toggle('is-open', open);
    navigation.inert = mobileQuery.matches && !open;
  };
  setMenu(false);
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileQuery.addEventListener('change', () => setMenu(false));
  navigation.querySelectorAll<HTMLAnchorElement>('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenu(false);
      if (link.hash && link.origin === location.origin) {
        document.querySelector<HTMLElement>(link.hash)?.focus({ preventScroll: true });
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
}

const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const navSections = navLinks.map(link => document.querySelector<HTMLElement>(link.hash));
let scrollPending = false;
const updateSection = () => {
  let activeIndex = -1;
  navSections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= 180) activeIndex = index;
  });
  navLinks.forEach((link, index) => {
    if (index === activeIndex) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
};
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateSection); }
}, { passive: true });
updateSection();

const hero = document.querySelector<HTMLElement>('.hero');
const scene = document.querySelector<HTMLElement>('.xr-scene');
const motionButton = document.querySelector<HTMLButtonElement>('.motion-toggle');
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const pointerQuery = matchMedia('(min-width: 800px) and (pointer: fine)');
let userPaused = false;
if (hero && scene && motionButton) {
  const applyMotionPreference = () => {
    hero.classList.toggle('motion-paused', userPaused || reducedQuery.matches);
    motionButton.hidden = reducedQuery.matches;
    motionButton.setAttribute('aria-pressed', String(userPaused));
    const label = motionButton.querySelector('span');
    if (label) label.textContent = userPaused ? 'Resume motion' : 'Pause motion';
    motionButton.querySelector('path')?.setAttribute('d', userPaused ? 'm8 5 11 7-11 7V5Z' : 'M8 5v14M16 5v14');
    scene.style.setProperty('--parallax-x', '0px');
    scene.style.setProperty('--parallax-y', '0px');
  };
  motionButton.addEventListener('click', () => { userPaused = !userPaused; applyMotionPreference(); });
  reducedQuery.addEventListener('change', applyMotionPreference);
  pointerQuery.addEventListener('change', applyMotionPreference);
  applyMotionPreference();
  let frame = 0;
  hero.addEventListener('pointermove', event => {
    if (userPaused || reducedQuery.matches || !pointerQuery.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = hero.getBoundingClientRect();
      scene.style.setProperty('--parallax-x', `${((event.clientX - box.left) / box.width - .5) * 14}px`);
      scene.style.setProperty('--parallax-y', `${((event.clientY - box.top) / box.height - .5) * 10}px`);
    });
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    scene.style.setProperty('--parallax-x', '0px');
    scene.style.setProperty('--parallax-y', '0px');
  });
  new IntersectionObserver(([entry]) => hero.classList.toggle('scene-idle', !entry.isIntersecting)).observe(hero);
  document.addEventListener('visibilitychange', () => hero.classList.toggle('page-hidden', document.hidden));
}
