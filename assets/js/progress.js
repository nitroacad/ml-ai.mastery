/* Progress Tracking & Streak Counter Module */
const STORAGE_KEY = 'ml_ai_progress';
const STREAK_KEY = 'ml_ai_streak';

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

export function isLessonCompleted(lessonId) {
  const progress = getProgress();
  return !!progress[lessonId];
}

export function toggleLessonCompletion(lessonId) {
  const progress = getProgress();
  if (progress[lessonId]) {
    delete progress[lessonId];
  } else {
    progress[lessonId] = { completedAt: new Date().toISOString() };
    updateStreak();
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('localStorage error setting progress:', e);
  }
  updateUI();
  return isLessonCompleted(lessonId);
}

function updateStreak() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const streakData = JSON.parse(localStorage.getItem(STREAK_KEY)) || { count: 0, lastDate: null };

    if (streakData.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakData.lastDate === yesterday) {
        streakData.count += 1;
      } else {
        streakData.count = 1;
      }
      streakData.lastDate = today;
      localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
    }
  } catch (e) {
    console.warn('Streak update error:', e);
  }
}

export function getStreak() {
  try {
    const streakData = JSON.parse(localStorage.getItem(STREAK_KEY)) || { count: 0 };
    return streakData.count || 1;
  } catch (e) {
    return 1;
  }
}

export function updateUI() {
  const progress = getProgress();
  const completedKeys = Object.keys(progress);
  const totalLessons = 125; // Estimate total across 25 modules

  const completedCountEl = document.getElementById('dash-completed-count');
  const streakCountEl = document.getElementById('dash-streak-count');
  const progressPctEl = document.getElementById('dash-progress-pct');

  if (completedCountEl) {
    completedCountEl.textContent = `${completedKeys.length} / ${totalLessons}`;
  }
  if (streakCountEl) {
    streakCountEl.textContent = `🔥 ${getStreak()} Day${getStreak() > 1 ? 's' : ''}`;
  }
  if (progressPctEl) {
    const pct = Math.round((completedKeys.length / totalLessons) * 100);
    progressPctEl.textContent = `${pct}%`;
  }

  // Update complete buttons on lesson pages
  const completeBtn = document.querySelector('.mark-complete-btn');
  if (completeBtn) {
    const lessonId = completeBtn.dataset.lessonId;
    if (lessonId) {
      const completed = isLessonCompleted(lessonId);
      completeBtn.classList.toggle('completed', completed);
      completeBtn.innerHTML = completed ? '✅ Completed' : 'Mark as Complete';
    }
  }
}

export function initProgress() {
  updateUI();

  const completeBtn = document.querySelector('.mark-complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const lessonId = completeBtn.dataset.lessonId;
      if (lessonId) {
        toggleLessonCompletion(lessonId);
      }
    });
  }
}
