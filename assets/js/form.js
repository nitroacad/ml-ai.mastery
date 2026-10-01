/* Formspree AJAX Form Handler */
const FORMSPREE_ID = 'YOUR_FORM_ID'; // Replace with actual Formspree ID from formspree.io

export function initForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (!form || !statusEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    statusEl.innerHTML = '<p style="color: var(--color-accent-secondary);">⏳ Sending message...</p>';

    const formData = new FormData(form);

    // Spam check
    if (formData.get('_gotcha')) {
      statusEl.innerHTML = '<p style="color: var(--color-danger-border);">Spam detected.</p>';
      if (submitBtn) submitBtn.disabled = false;
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.innerHTML = '<p style="color: #10b981; font-weight: 600;">✅ Thank you! Your message has been sent successfully.</p>';
        form.reset();
      } else {
        const data = await response.json();
        const errorMsg = data?.errors?.map(e => e.message).join(', ') || 'An error occurred while submitting.';
        statusEl.innerHTML = `<p style="color: var(--color-danger-border);">❌ ${errorMsg}</p>`;
      }
    } catch (err) {
      statusEl.innerHTML = '<p style="color: var(--color-danger-border);">❌ Network error. Please check your connection and try again.</p>';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
