const cards = [{"label": "Portfolio", "value": "$18.6K", "delta": "+4.2%"}, {"label": "24h change", "value": "+2.8%", "delta": "Bullish"}, {"label": "Alerts", "value": "7", "delta": "Active"}, {"label": "Risk score", "value": "42/100", "delta": "Moderate"}];
const rows = [{"title": "Bitcoin", "status": "Watch", "detail": "Momentum holding above the key moving average."}, {"title": "Ethereum", "status": "Accumulate", "detail": "Network activity supports the current trend."}, {"title": "Solana", "status": "Volatile", "detail": "Alert set for support and resistance levels."}, {"title": "Stablecoins", "status": "Balanced", "detail": "Cash reserve maintained for opportunities."}];
const insights = ["Allocation remains diversified across major assets.", "Alert coverage is focused on high-impact levels.", "Risk score is moderate with stablecoin buffer."];
const storageKey = 'vizvasanlya-crypto-tracker-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
