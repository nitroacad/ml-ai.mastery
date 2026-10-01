/* Chart.js Helpers */
export function renderLossChart(canvasId, epochs, trainLoss, valLoss) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: epochs,
      datasets: [
        { label: 'Training Loss', data: trainLoss, borderColor: '#6366f1', tension: 0.3 },
        { label: 'Validation Loss', data: valLoss, borderColor: '#06b6d4', tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#9ca3af' } }
      },
      scales: {
        x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
        y: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } }
      }
    }
  });
}
