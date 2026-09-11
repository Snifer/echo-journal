// Calendar para Project Echo - Diario
// Recibe un array de objetos: [{ date: "YYYY-MM-DD", title: "...", url: "..." }]

let currentMonth;
let currentYear;
let postsData = [];
let filteredPostsData = [];

function initCalendar(posts) {
  postsData = posts;
  
  // Configurar selector de a├▒o
  setupYearSelector();
  
  const now = new Date();
  currentMonth = now.getMonth();
  currentYear = now.getFullYear();
  
  // Filtrar posts por a├▒o seleccionado
  filterPostsByYear(currentYear);
  
  renderCalendar();
  setupControls();
}

function setupYearSelector() {
  const yearSelect = document.getElementById('year-select');
  if (!yearSelect) return;
  
  // Obtener todos los a├▒os ├║nicos de los posts
  const years = [...new Set(postsData.map(post => post.date.split('-')[0]))].sort().reverse();
  
  // Llenar el selector
  yearSelect.innerHTML = '';
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
  
  // Seleccionar el a├▒o actual por defecto (o el m├Īs reciente si no existe)
  const currentYearStr = currentYear.toString();
  if (years.includes(currentYearStr)) {
    yearSelect.value = currentYearStr;
  } else if (years.length > 0) {
    yearSelect.value = years[0];
    currentYear = parseInt(years[0]);
  }
  
  // Escuchar cambios
  yearSelect.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value);
    currentMonth = 0; // Empezar desde enero al cambiar de a├▒o
    filterPostsByYear(currentYear);
    renderCalendar();
  });
}

function filterPostsByYear(year) {
  const yearStr = year.toString();
  filteredPostsData = postsData.filter(post => post.date.startsWith(yearStr));
}

function setupControls() {
  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
      // Actualizar selector si cambiamos de a├▒o
      const yearSelect = document.getElementById('year-select');
      if (yearSelect) {
        yearSelect.value = currentYear.toString();
        filterPostsByYear(currentYear);
      }
    }
    renderCalendar();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
      // Actualizar selector si cambiamos de a├▒o
      const yearSelect = document.getElementById('year-select');
      if (yearSelect) {
        yearSelect.value = currentYear.toString();
        filterPostsByYear(currentYear);
      }
    }
    renderCalendar();
  });
}

function getPostsForDate(dateStr) {
  return filteredPostsData.filter(post => post.date === dateStr);
}

function renderCalendar() {
  const calendarEl = document.getElementById('calendar');
  const monthYearEl = document.getElementById('current-month-year');
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mi├ę', 'Jue', 'Vie', 'S├Īb'];
  
  let html = '<div class="calendar-grid">';
  
  // Cabecera con nombres de d├Źas
  dayNames.forEach(day => {
    html += `<div class="calendar-day-header">${day}</div>`;
  });
  
  // D├Źas del mes anterior (en gris)
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    html += `<div class="calendar-day other-month">${dayNum}</div>`;
  }
  
  // D├Źas del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const postsForDay = getPostsForDate(dateStr);
    
    if (postsForDay.length > 0) {
      html += `<div class="calendar-day has-posts" data-date="${dateStr}">`;
      html += `<div class="day-number">${day}</div>`;
      html += `<div class="posts-indicator">${postsForDay.length} entrada${postsForDay.length > 1 ? 's' : ''}</div>`;
      html += `<div class="posts-list">`;
      postsForDay.forEach(post => {
        html += `<a href="${post.url}" class="post-link">${post.title}</a>`;
      });
      html += `</div></div>`;
    } else {
      html += `<div class="calendar-day">${day}</div>`;
    }
  }
  
  // D├Źas del siguiente mes (en gris)
  const totalCells = firstDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let day = 1; day <= remainingCells; day++) {
    html += `<div class="calendar-day other-month">${day}</div>`;
  }
  
  html += '</div>';
  calendarEl.innerHTML = html;
}

// Exportar para uso global
window.initCalendar = initCalendar;
