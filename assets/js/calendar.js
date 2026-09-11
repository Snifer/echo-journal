const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

let allPosts = [];
let activeYear = null;

function initAnnualCalendar(posts) {
  allPosts = Array.isArray(posts) ? posts : [];
  const years = getAvailableYears();
  const select = document.getElementById('year-select');

  if (!years.length) {
    activeYear = new Date().getFullYear();
    select.innerHTML = `<option value="${activeYear}">${activeYear}</option>`;
  } else {
    activeYear = years[0];
    select.innerHTML = years.map(year => `<option value="${year}">${year}</option>`).join('');
    select.value = String(activeYear);
  }

  select.addEventListener('change', event => {
    activeYear = Number(event.target.value);
    renderAnnualCalendar();
    closeDayDetails();
  });

  document.getElementById('close-details').addEventListener('click', closeDayDetails);
  renderAnnualCalendar();
}

function getAvailableYears() {
  const years = new Set();
  allPosts.forEach(post => {
    if (post.date) years.add(Number(post.date.slice(0, 4)));
    if (post.fechaDestruida) years.add(Number(post.fechaDestruida.slice(0, 4)));
  });
  return [...years].filter(Number.isFinite).sort((a, b) => b - a);
}

function renderAnnualCalendar() {
  const container = document.getElementById('annual-calendar');
  const monthlyHtml = MONTHS.map((monthName, index) => renderMonth(index, monthName)).join('');
  container.innerHTML = monthlyHtml;

  container.querySelectorAll('.heat-day[data-date]').forEach(cell => {
    cell.addEventListener('click', () => showDayDetails(cell.dataset.date));
  });
}

function renderMonth(monthIndex, monthName) {
  const firstWeekday = new Date(activeYear, monthIndex, 1).getDay();
  const daysInMonth = new Date(activeYear, monthIndex + 1, 0).getDate();
  let cells = WEEKDAYS.map(day => `<div class="month-weekday">${day}</div>`).join('');

  for (let blank = 0; blank < firstWeekday; blank += 1) {
    cells += '<div class="heat-day heat-day-empty" aria-hidden="true"></div>';
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = formatDate(activeYear, monthIndex + 1, day);
    const data = getDayData(date);
    const level = getHeatLevel(data.posts.length);
    const icons = [
      data.entityPresent ? '<span class="day-icon entity-icon" aria-label="Entidad presente">👾</span>' : '',
      data.destroyed ? '<span class="day-icon destroyed-icon" aria-label="Fecha destruida">🔥</span>' : ''
    ].join('');
    const label = buildAriaLabel(date, data);
    const isInteractive = data.posts.length || data.entityPresent || data.destroyed;

    cells += `
      <button type="button" class="heat-day heat-level-${level}${isInteractive ? ' is-active' : ''}" 
        data-date="${date}" aria-label="${label}" ${isInteractive ? '' : 'tabindex="-1"'}>
        <span class="day-number">${day}</span>
        <span class="day-icons">${icons}</span>
      </button>`;
  }

  return `
    <section class="month-card" aria-label="${monthName} de ${activeYear}">
      <h2>${monthName}</h2>
      <div class="month-grid">${cells}</div>
    </section>`;
}

function getDayData(date) {
  const posts = allPosts.filter(post => post.date === date);
  const entityPresent = posts.some(post => post.entidadPresente === true || post.entidadPresente === 'true');
  const destroyed = allPosts.some(post => post.fechaDestruida === date);
  const entities = [...new Set(posts.map(post => post.entidad).filter(Boolean))];
  const destroyedEntities = [...new Set(allPosts.filter(post => post.fechaDestruida === date).map(post => post.entidad).filter(Boolean))];
  return { posts, entityPresent, destroyed, entities, destroyedEntities };
}

function getHeatLevel(count) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

function buildAriaLabel(date, data) {
  const parts = [`${date}: ${data.posts.length} registro${data.posts.length === 1 ? '' : 's'}`];
  if (data.entityPresent) parts.push('entidad presente');
  if (data.destroyed) parts.push('fecha destruida');
  return parts.join(', ');
}

function showDayDetails(date) {
  const data = getDayData(date);
  const panel = document.getElementById('day-details');
  const title = document.getElementById('day-details-title');
  const content = document.getElementById('day-details-content');
  const [year, month, day] = date.split('-').map(Number);
  const readableDate = `${day} de ${MONTHS[month - 1]} de ${year}`;

  title.textContent = readableDate;
  const status = [];
  if (data.entityPresent) {
    status.push(`<p class="detail-status present">👾 <strong>Entidad presente:</strong> ${escapeHtml(data.entities.join(', ') || 'Sin nombre especificado')}</p>`);
  }
  if (data.destroyed) {
    status.push(`<p class="detail-status destroyed">🔥 <strong>Fecha destruida:</strong> ${escapeHtml(data.destroyedEntities.join(', ') || 'Entidad sin nombre especificado')}</p>`);
  }

  const records = data.posts.length
    ? `<ul class="day-records">${data.posts.map(post => `
        <li>
          <a href="${post.url}">${escapeHtml(post.title)}</a>
          ${post.entidad ? `<span>Entidad: ${escapeHtml(post.entidad)}</span>` : ''}
        </li>`).join('')}</ul>`
    : '<p class="no-records">No hay registro narrativo para este día.</p>';

  content.innerHTML = `${status.join('')}${records}`;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeDayDetails() {
  document.getElementById('day-details').hidden = true;
}

function formatDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
