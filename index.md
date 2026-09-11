---
layout: default
title: "Diario"
---

# Diario de Project Echo

<div id="year-selector">
  <label for="year-select">A├▒o:</label>
  <select id="year-select">
    {% assign years = site.posts | map: "date" | map: "date" | map: "year" | uniq | sort | reverse %}
    {% for year in years %}
      <option value="{{ year }}">{{ year }}</option>
    {% endfor %}
  </select>
</div>

<div id="calendar-controls">
  <button id="prev-month">&lt; Anterior</button>
  <h2 id="current-month-year"></h2>
  <button id="next-month">Siguiente &gt;</button>
</div>

<div id="calendar"></div>

<div id="posts-list">
  <h3>Todas las entradas</h3>
  <ul class="posts-archive">
    {% for post in site.posts %}
    <li>
      <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%d/%m/%Y" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</div>

<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
<script>
  // Pasar las fechas de los posts al JS
  const postDates = [
    {% for post in site.posts %}
      { date: "{{ post.date | date: '%Y-%m-%d' }}", title: "{{ post.title | escape }}", url: "{{ post.url | relative_url }}" }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  initCalendar(postDates);
</script>
