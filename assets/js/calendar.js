const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
let allPosts = [];
let activeYear = null;

function initAnnualCalendar(posts) {
  allPosts = Array.isArray(posts) ? posts : [];
  initClock(window.echoAgentState || {});
  const years = getAvailableYears();
  const select = document.getElementById('year-select');
  activeYear = years.length ? years[0] : new Date().getFullYear();
  select.innerHTML = (years.length ? years : [activeYear]).map(year => `<option value="${year}">${year}</option>`).join('');
  select.value = String(activeYear);
  select.addEventListener('change', event => { activeYear = Number(event.target.value); renderAnnualCalendar(); closeDayDetails(); });
  document.getElementById('close-details').addEventListener('click', closeDayDetails);
  renderAnnualCalendar();
}

function initClock(state) {
  const widget = document.getElementById('clock-widget');
  if (!widget) return;
  const entity = Math.max(0, Math.min(6, Number(state?.reloj?.entidad?.actual || 0)));
  const agency = Math.max(0, Math.min(6, Number(state?.reloj?.agencia?.actual || 0)));
  const segments = [];
  for (let index = 0; index < 12; index += 1) {
    const angle = index * 30 - 90;
    const color = index < 6 ? (index < entity ? 'entity-on' : 'entity-off') : (index - 6 < agency ? 'agency-on' : 'agency-off');
    segments.push(`<path class="clock-segment ${color}" d="${sectorPath(100, 100, 76, 30, angle, angle + 27)}"/>`);
  }
  widget.innerHTML = `<svg viewBox="0 0 200 200" role="img" aria-label="Reloj: ${entity} de 6 encuentros con Entidad y ${agency} de 6 visitas de Agencia"><circle class="clock-ring" cx="100" cy="100" r="80"/>${segments.join('')}<circle class="clock-core" cx="100" cy="100" r="27"/><text class="clock-center" x="100" y="95">ECHO</text><text class="clock-center clock-sub" x="100" y="115">${entity + agency}/12</text></svg>`;
}

function sectorPath(cx, cy, outer, inner, start, end) {
  const radians = value => value * Math.PI / 180;
  const point = (radius, angle) => [cx + radius * Math.cos(radians(angle)), cy + radius * Math.sin(radians(angle))];
  const [x1, y1] = point(outer, start), [x2, y2] = point(outer, end), [x3, y3] = point(inner, end), [x4, y4] = point(inner, start);
  return `M ${x1} ${y1} A ${outer} ${outer} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${inner} ${inner} 0 0 0 ${x4} ${y4} Z`;
}

function getAvailableYears() {
  const years = new Set();
  allPosts.forEach(post => { if (post.date) years.add(Number(post.date.slice(0, 4))); if (post.fechaDestruida) years.add(Number(post.fechaDestruida.slice(0, 4))); });
  return [...years].filter(Number.isFinite).sort((a, b) => b - a);
}

function renderAnnualCalendar() {
  const container = document.getElementById('annual-calendar');
  container.innerHTML = MONTHS.map((month, index) => renderMonth(index, month)).join('');
  container.querySelectorAll('.heat-day[data-date]').forEach(cell => cell.addEventListener('click', () => showDayDetails(cell.dataset.date)));
}

function renderMonth(monthIndex, monthName) {
  const firstWeekday = new Date(activeYear, monthIndex, 1).getDay();
  const days = new Date(activeYear, monthIndex + 1, 0).getDate();
  let cells = WEEKDAYS.map(day => `<div class="month-weekday">${day}</div>`).join('');
  for (let blank = 0; blank < firstWeekday; blank += 1) cells += '<div class="heat-day heat-day-empty" aria-hidden="true"></div>';
  for (let day = 1; day <= days; day += 1) {
    const date = formatDate(activeYear, monthIndex + 1, day), data = getDayData(date), level = getHeatLevel(data.posts.length);
    const icons = `${data.entityPresent ? '<span title="Entidad presente">👾</span>' : ''}${data.destroyed ? '<span title="Fecha destruida">🔥</span>' : ''}`;
    const interactive = data.posts.length || data.entityPresent || data.destroyed;
    cells += `<button class="heat-day heat-level-${level}${interactive ? ' is-active' : ''}" type="button" data-date="${date}" ${interactive ? '' : 'tabindex="-1"'}><span class="day-number">${day}</span><span class="day-icons">${icons}</span></button>`;
  }
  return `<section class="month-card"><h2>${monthName}</h2><div class="month-grid">${cells}</div></section>`;
}

function getDayData(date) {
  const posts = allPosts.filter(post => post.date === date);
  const entityPresent = posts.some(post => post.entidadPresente === true || post.entidadPresente === 'true');
  const destroyed = allPosts.some(post => post.fechaDestruida === date);
  const entities = [...new Set(posts.map(post => post.entidad).filter(Boolean))];
  const destroyedEntities = [...new Set(allPosts.filter(post => post.fechaDestruida === date).map(post => post.entidad).filter(Boolean))];
  return { posts, entityPresent, destroyed, entities, destroyedEntities };
}

function getHeatLevel(count) { return count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4; }
function formatDate(year, month, day) { return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
function escapeHtml(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;'); }

function showDayDetails(date) {
  const data = getDayData(date), panel = document.getElementById('day-details'), title = document.getElementById('day-details-title'), content = document.getElementById('day-details-content');
  const [year, month, day] = date.split('-').map(Number);
  title.textContent = `${day} de ${MONTHS[month - 1]} de ${year}`;
  const statuses = [];
  if (data.entityPresent) statuses.push(`<p class="detail-status present">👾 <strong>Entidad presente:</strong> ${escapeHtml(data.entities.join(', ') || 'Sin nombre especificado')}</p>`);
  if (data.destroyed) statuses.push(`<p class="detail-status destroyed">🔥 <strong>Fecha destruida:</strong> ${escapeHtml(data.destroyedEntities.join(', ') || 'Entidad sin nombre especificado')}</p>`);
  const records = data.posts.length ? `<ul class="day-records">${data.posts.map(post => `<li><a href="${post.url}">${escapeHtml(post.title)}</a>${post.entidad ? `<span>Entidad: ${escapeHtml(post.entidad)}</span>` : ''}</li>`).join('')}</ul>` : '<p class="no-records">No hay registro narrativo para este día.</p>';
  content.innerHTML = `${statuses.join('')}${records}`;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function closeDayDetails() { document.getElementById('day-details').hidden = true; }

document.addEventListener('DOMContentLoaded', () => initAnnualCalendar(window.postDates || []));
