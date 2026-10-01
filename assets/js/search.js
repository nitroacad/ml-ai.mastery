/* Fuse.js Search Integration & Modal */
export function initSearch() {
  const searchBtn = document.querySelector('.search-btn');

  // Inject Search Modal Markup if not present
  if (!document.getElementById('search-modal')) {
    const modalHTML = `
      <div id="search-modal" class="search-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Search site tutorials">
        <div class="search-modal-content">
          <div class="search-input-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="search-input" class="search-input" placeholder="Search topics, algorithms, code..." autocomplete="off">
            <kbd class="search-kbd">ESC</kbd>
          </div>
          <div id="search-results" class="search-results">
            <p style="padding: var(--space-4); color: var(--color-text-muted); text-align: center;">Type to search across all lessons & terms...</p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let fuseInstance = null;

  async function loadFuseAndIndex() {
    if (fuseInstance) return;

    // Load Fuse.js CDN dynamically
    if (typeof Fuse === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/7.0.0/fuse.min.js';
        script.integrity = 'sha512-4ee3m3N8sZ7T4y5+Aefv0Y5sF6y8Rj5Q3U3aX1p+M/3G+R3h5A1Y8e+e5Y1sP9zZ5aA=';
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }).catch(err => console.warn('Fuse.js CDN load failed:', err));
    }

    try {
      // Relative path resolution for search-index.json
      const rootPrefix = document.querySelector('meta[name="root-path"]')?.content || './';
      const res = await fetch(`${rootPrefix}search-index.json`);
      const indexData = await res.json();

      if (typeof Fuse !== 'undefined') {
        fuseInstance = new Fuse(indexData, {
          keys: ['title', 'summary', 'tags', 'module'],
          threshold: 0.3
        });
      }
    } catch (e) {
      console.warn('Search index fetch error:', e);
    }
  }

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    searchInput.focus();
    loadFuseAndIndex();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    searchInput.value = '';
    searchResults.innerHTML = `<p style="padding: var(--space-4); color: var(--color-text-muted); text-align: center;">Type to search across all lessons & terms...</p>`;
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', openModal);
  }

  // Keyboard Shortcuts (Cmd+K, Ctrl+K, /, ESC)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      modal.classList.contains('is-open') ? closeModal() : openModal();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openModal();
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = `<p style="padding: var(--space-4); color: var(--color-text-muted); text-align: center;">Type to search across all lessons & terms...</p>`;
      return;
    }

    if (!fuseInstance) {
      searchResults.innerHTML = `<p style="padding: var(--space-4); color: var(--color-text-muted); text-align: center;">Loading search index...</p>`;
      return;
    }

    const results = fuseInstance.search(query).slice(0, 8);
    if (results.length === 0) {
      searchResults.innerHTML = `<p style="padding: var(--space-4); color: var(--color-text-muted); text-align: center;">No matching lessons found.</p>`;
      return;
    }

    searchResults.innerHTML = results.map(res => `
      <a href="${res.item.url}" class="search-result-item">
        <strong style="color: var(--color-accent-primary); display: block;">${res.item.title}</strong>
        <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">${res.item.summary}</span>
      </a>
    `).join('');
  });
}
