/* Code Block Enhancements: Copy Buttons, Tabs, Line Highlighting */
export function initCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block, pre');

  codeBlocks.forEach(block => {
    const pre = block.tagName === 'PRE' ? block : block.querySelector('pre');
    if (!pre) return;

    // Wrap pre in container if not wrapped
    let container = block.classList.contains('code-block') ? block : null;
    if (!container) {
      container = document.createElement('div');
      container.className = 'code-block';
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(pre);
    }

    // Header bar check
    if (!container.querySelector('.code-header')) {
      const header = document.createElement('div');
      header.className = 'code-header';

      const langClass = Array.from(pre.classList).find(c => c.startsWith('language-')) || 'language-code';
      const langName = langClass.replace('language-', '').toUpperCase();

      header.innerHTML = `
        <span>${langName}</span>
        <button class="code-copy-btn" aria-label="Copy code to clipboard">Copy</button>
      `;

      container.insertBefore(header, pre);

      const copyBtn = header.querySelector('.code-copy-btn');
      copyBtn.addEventListener('click', async () => {
        try {
          const codeText = pre.innerText || pre.textContent;
          await navigator.clipboard.writeText(codeText);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        } catch (err) {
          copyBtn.textContent = 'Failed';
        }
      });
    }
  });
}
