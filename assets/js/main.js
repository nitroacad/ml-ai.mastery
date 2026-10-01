/* Main App Bootstrap Module */
import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initSearch } from './search.js';
import { initProgress } from './progress.js';
import { initCodeBlocks } from './code.js';
import { initQuizzes } from './quiz.js';
import { initPlayground } from './playground.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initSearch();
  initProgress();
  initCodeBlocks();
  initQuizzes();
  initPlayground();
});
