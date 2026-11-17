/* Shared navigation and theme controls. Native details remains usable without JS. */
(() => {
  const menu = document.querySelector('.jp-nav');
  const toggle = document.querySelector('.jp-menu-toggle');
  const programs = document.querySelector('.jp-programs');
  const summary = programs?.querySelector('summary');
  const desktop = matchMedia('(min-width: 901px)');
  const setMenu = open => {
    menu?.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    if (toggle) toggle.textContent = open ? 'Close' : 'Menu';
    if (!open && programs) programs.open = false;
  };
  toggle?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  programs?.addEventListener('pointerenter', e => {
    if (desktop.matches && e.pointerType === 'mouse') programs.open = true;
  });
  programs?.addEventListener('pointerleave', () => {
    if (desktop.matches && !programs.contains(document.activeElement)) programs.open = false;
  });
  programs?.addEventListener('focusout', e => {
    if (!programs.contains(e.relatedTarget)) programs.open = false;
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.jp-header')) setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (programs?.open) { programs.open = false; summary.focus(); }
    else if (menu?.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  desktop.addEventListener('change', () => setMenu(false));
  const themeButton = document.querySelector('#theme-toggle');
  let stored;
  try { stored = localStorage.getItem('theme'); } catch (_) { /* Storage may be disabled. */ }
  const setTheme = dark => {
    document.documentElement.classList.toggle('dark', dark);
    if (themeButton) {
      themeButton.textContent = dark ? '☀' : '☾';
      themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  };
  setTheme(stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  themeButton?.addEventListener('click', () => {
    const dark = !document.documentElement.classList.contains('dark');
    setTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
  });
})();
