/* Declarative Quiz Engine Module */
export function initQuizzes() {
  const quizContainers = document.querySelectorAll('.quiz-container');

  quizContainers.forEach(container => {
    const options = container.querySelectorAll('.quiz-option');
    const feedback = container.querySelector('.quiz-feedback');
    const answerIndex = parseInt(container.dataset.answer, 10);

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        // Disable further picks
        options.forEach(opt => opt.style.pointerEvents = 'none');

        if (index === answerIndex) {
          option.classList.add('correct');
          if (feedback) {
            feedback.style.color = '#10b981';
            feedback.textContent = '🎉 Correct! ' + (feedback.dataset.explanation || '');
          }
          triggerConfetti();
        } else {
          option.classList.add('incorrect');
          options[answerIndex]?.classList.add('correct');
          if (feedback) {
            feedback.style.color = '#ef4444';
            feedback.textContent = '❌ Incorrect. ' + (feedback.dataset.explanation || '');
          }
        }
      });
    });
  });
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  } else {
    // Dynamic import confetti CDN if not present
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    script.onload = () => confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    document.head.appendChild(script);
  }
}
