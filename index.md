---
layout: default
title: "Diario"
---

<div class="dashboard-layout">
  <section class="journal-column">
    <h1>Diario de Project Echo</h1>
    <p class="journal-intro">Un registro anual de ecos, encuentros y decisiones.</p>

    <div class="journal-controls">
      <label for="year-select">Año del registro</label>
      <select id="year-select" aria-label="Seleccionar año"></select>
    </div>

    <section class="annual-calendar-section" aria-label="Calendario anual">
      <div id="annual-calendar" class="annual-calendar" aria-live="polite"></div>
      <div class="heatmap-legend" aria-label="Leyenda">
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

    <section class="posts-list-section">
      <h2>Todos los registros</h2>
      <ul class="posts-archive">
        {% for post in site.posts %}
        <li><time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%d/%m/%Y" }}</time><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    </section>
  </section>

  <aside class="agent-panel" aria-label="Estado del agente">
    <div class="agent-panel-head">
      <span class="panel-kicker">PANEL DE CAMPO</span>
      <h2>Estado del Agente</h2>
    </div>

    <div id="clock-widget" class="clock-widget" aria-label="Reloj de encuentros"></div>

    <dl class="agent-counters">
      <div class="counter counter-entity"><dt>👾 ENTIDAD</dt><dd><span id="entity-count">{{ site.data.estado_agente.reloj.entidad.actual }}</span> / {{ site.data.estado_agente.reloj.entidad.maximo }}</dd></div>
      <div class="counter counter-agency"><dt>▦ AGENCIA</dt><dd><span id="agency-count">{{ site.data.estado_agente.reloj.agencia.actual }}</span> / {{ site.data.estado_agente.reloj.agencia.maximo }}</dd></div>
      <div class="counter counter-corruption"><dt>🔥 CORRUPCIÓN</dt><dd>{{ site.data.estado_agente.corrupcion }}</dd></div>
    </dl>

    <div class="agent-status"><span class="status-dot"></span> STATUS: {{ site.data.estado_agente.estado }}</div>

    <section class="inventory-panel" aria-label="Herramientas e inventario">
      <h3>Herramientas del agente</h3>
      <ul class="inventory-list">
        {% for item in site.data.estado_agente.inventario %}
        <li class="inventory-item{% if item.activo %} is-owned{% endif %}">
          <span class="read-only-check" aria-hidden="true">{% if item.activo %}☑{% else %}☐{% endif %}</span>
          <span>{{ item.nombre }}</span>
        </li>
        {% endfor %}
      </ul>
    </section>
  </aside>
</div>

<script>
  window.echoAgentState = {{ site.data.estado_agente | jsonify }};
  window.postDates = [
    {% for post in site.posts %}
    { date: "{{ post.date | date: '%Y-%m-%d' }}", title: {{ post.title | jsonify }}, url: {{ post.url | relative_url | jsonify }}, entidad: {{ post.entidad | default: '' | jsonify }}, entidadPresente: {{ post.entidad_presente | default: false | jsonify }}, fechaDestruida: {{ post.fecha_destruida | default: '' | jsonify }} }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
