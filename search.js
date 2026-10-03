(function () {
  const products = [
    { name: 'Direktor', category: 'Mains', description: 'Freshly prepared house meal', url: 'product.html?product=direktor' },
    { name: 'Curry & rice meal', category: 'Mains', description: 'A generous curry and rice meal', url: 'product.html?product=curry-rice' },
    { name: 'Clubhouse sandwich', category: 'Sandwiches', description: 'Freshly prepared clubhouse sandwich', url: 'product.html?product=clubhouse' },
    { name: 'chickenbiryani', category: 'Mains', description: 'Fragrant chicken biryani', url: 'product.html?product=chickenbiryani' },
    { name: 'lamb mandi', category: 'Mains', description: 'Tender lamb with fragrant rice', url: 'product.html?product=lamb-mandi' },
    { name: 'lamb chops', category: 'Grills', description: 'Grilled lamb chops', url: 'product.html?product=lamb-chops' }
  ];
  const pages = [
    { name: 'Menu', category: 'Page', description: 'Browse all Habibi Haven meals', url: 'menu.html#menu' },
    { name: 'Reviews', category: 'Page', description: 'Read what Habibi Haven guests say', url: 'index.html#testimonials-title' },
    { name: 'Contact us', category: 'Page', description: 'Get in touch with Habibi Haven', url: 'index.html#contact' }
  ];
  const results = [...products, ...pages];
  const overlay = document.createElement('div'); overlay.className = 'search-overlay';
  const panel = document.createElement('aside'); panel.className = 'search-panel'; panel.setAttribute('aria-label', 'Site search'); panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = '<div class="search-panel-header"><h2>Search Habibi Haven</h2><button class="search-close" type="button" aria-label="Close search">×</button></div><div class="search-input-wrap"><input class="search-input" type="search" placeholder="Search meals, reviews, menu…" autocomplete="off" /></div><div class="search-results" aria-live="polite"></div>';
  document.body.append(overlay, panel);
  const input = panel.querySelector('.search-input');
  const resultBox = panel.querySelector('.search-results');
  function render(query = '') {
    const normalized = query.trim().toLowerCase();
    const matches = normalized ? results.filter((item) => `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(normalized)) : results;
    resultBox.innerHTML = matches.length ? matches.map((item) => `<a class="search-result" href="${item.url}"><span class="search-result-type">${item.category}</span><span class="search-result-title">${item.name}</span><span class="search-result-description">${item.description}</span></a>`).join('') : '<p class="search-empty">No matching meals or pages. Try “biryani”, “grills”, or “menu”.</p>';
  }
  function open() { render(input.value); panel.classList.add('is-open'); overlay.classList.add('is-open'); panel.setAttribute('aria-hidden', 'false'); setTimeout(() => input.focus(), 30); }
  function close() { panel.classList.remove('is-open'); overlay.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); }
  document.querySelectorAll('a[aria-label="Search"]').forEach((trigger) => trigger.addEventListener('click', (event) => { event.preventDefault(); open(); }));
  panel.querySelector('.search-close').addEventListener('click', close); overlay.addEventListener('click', close); input.addEventListener('input', () => render(input.value));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  render();
})();
