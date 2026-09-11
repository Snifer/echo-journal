---
layout: default
title: "Diario"
---

# Diario de Project Echo

<p class="journal-intro">Un registro anual de ecos, encuentros y decisiones.</p>

<section class="journal-controls" aria-label="Controles del calendario">
  <label for="year-select">Año del registro</label>
  <select id="year-select" aria-label="Seleccionar año"></select>
</section>

<section class="annual-calendar-section" aria-label="Calendario anual">
  <div id="annual-calendar" class="annual-calendar" aria-live="polite"></div>

  <div class="heatmap-legend" aria-label="Leyenda del calendario">
    <span class="legend-label">Actividad</span>
    <span class="legend-item"><i class="heat-level-0"></i> Sin registro</span>
    <span class="legend-item"><i class="heat-level-1"></i> 1</span>
    <span class="legend-item"><i class="heat-level-2"></i> 2–3</span>
    <span class="legend-item"><i class="heat-level-3"></i> 4–5</span>
    <span class="legend-item"><i class="heat-level-4"></i> 6+</span>
    <span class="legend-item legend-entity">👾 Entidad presente</span>
    <span class="legend-item legend-destroyed">🔥 Fecha destruida</span>
  </div>
</section>

<section id="day-details" class="day-details" hidden aria-live="polite">
  <button id="close-details" class="close-details" type="button" aria-label="Cerrar detalle">×</button>
  <h2 id="day-details-title">Detalle del día</h2>
  <div id="day-details-content"></div>
</section>

<section id="posts-list" class="posts-list-section">
  <h2>Todos los registros</h2>
  <ul class="posts-archive">
    {% for post in site.posts %}
    <li>
      <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%d/%m/%Y" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</section>

<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
<script>
  window.postDates = [
    {% for post in site.posts %}
    {
      date: "{{ post.date | date: '%Y-%m-%d' }}",
      title: {{ post.title | jsonify }},
      url: {{ post.url | relative_url | jsonify }},
      entidad: {{ post.entidad | default: '' | jsonify }},
      entidadPresente: {{ post.entidad_presente | default: false | jsonify }},
      fechaDestruida: {{ post.fecha_destruida | default: '' | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  initAnnualCalendar(window.postDates);
</script>
