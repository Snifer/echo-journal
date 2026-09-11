# Project Echo - Diario Digital

Un sitio estático con **Jekyll + GitHub Pages** para publicar un diario de juego de Project Echo en formato calendario.

## Estructura del repositorio

```
tu-repo-echo/
├─ _config.yml
├─ _layouts/
│  ├─ default.html
│  └─ post.html
├─ _posts/
│  ├─ 2025-09-01-sesion-01-el-despertar.md
│  ├─ 2025-09-03-sesion-02-la-red.md
│  └─ ...
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     └─ calendar.js
├─ index.md
└─ README.md
```

## Cómo desplegar en GitHub Pages

### Paso 1: Crear el repositorio

1. Ve a GitHub y crea un **nuevo repositorio** (ej. `project-echo-diario`).
2. Debe ser el repositorio público.

### Paso 2: Subir los archivos

Sube todos los archivos manteniendo la estructura de carpetas:

```
tu-repo/
├─ _config.yml
├─ _layouts/
│  ├─ default.html
│  └─ post.html
├─ _posts/
│  ├─ 2025-09-01-sesion-01-el-despertar.md
│  └─ 2025-09-03-sesion-02-la-red.md
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     └─ calendar.js
├─ index.md
└─ README.md
```
Puedes subirlos vía:

- **GitHub web**: Upload files → arrastra las carpetas.
- **Git CLI**:

  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/TU-USUARIO/project-echo-diario.git
  git push -u origin main
  ```

### Paso 3: Activar GitHub Pages

1. Ve a **Settings → Pages** en tu repositorio.
2. En **Build and deployment → Source**, selecciona `Deploy from a branch`.
3. En **Branch**, elige `main` y carpeta `/ (root)`.
4. Haz clic en **Save**.

Espera 1-2 minutos. Tu sitio estar├Ī en:

```
https://TU-USUARIO.github.io/project-echo-diario/
```

## Cómo añadir nuevas entradas

Crea archivos en `_posts/` con este formato:

```markdown
---
title: "Sesión 03 — Título de tu aventura"
date: 2025-09-21 20:00:00 -04
tags: [sesion, capitulo-3]
---

# Título de la sesión

**Fecha de juego:** 21 de septiembre de 2025  
**Jugador:** Nick  
**Sistema:** Project Echo

## Resumen

Escribe aquí lo que pasa....

## Eventos principales

1. Evento 1
2. Evento 2

## Notas

- Nota 1
- Nota 2
```

### ⚠️ Reglas importantes

- El nombre del archivo **debe** seguir: `YYYY-MM-DD-slug.md`
  - Ejemplo: `2025-09-10-sesion-03-titulo.md`
- La fecha en el frontmatter debe coincidir con el nombre del archivo.
- Los tags son opcionales pero recomendados.

##  Personalizar el diseño

### Cambiar título y descripción

Edita `_config.yml`:

```yaml
title: "Tu título Personalizado"
description: "Tu descripción aquí"
baseurl: "/nombre-del-repo"  # Si usas user.github.io/nombre-repo
url: "https://tu-usuario.github.io"
```

### Cambiar colores

Edita `assets/css/style.css` y modifica las variables CSS al inicio:

```css
:root {
  --ink-color: #1a4d8f;      /* Color de tinta principal */
  --highlight-color: #fff3cd; /* Color de marcador */
  --line-color: #a8c0ff;     /* Color de l├Źneas del papel */

}
```

### Cambiar fuentes

El sitio usa tres fuentes de Google Fonts:

- **Patrick Hand** — Cuerpo del texto (bolígrafo)
- **Permanent Marker** — Títulos (marcador grueso)
- **Caveat** — Fechas y tags (escritura rápida)

Si quieres cambiarlas, edita el `@import` en `style.css`.

## Flujo con Obsidian

1. Escribe tus sesiones en Obsidian como siempre.
2. Asegúrate de que cada nota tenga:
   - `title` en el frontmatter.
   - `date` (YYYY-MM-DD).
3. Copia el contenido a `_posts/` con el nombre correcto.
4. Haz commit y push:

```bash
git add _posts/
git commit -m "A├▒adir sesi├│n XX"
git push
```

GitHub Pages se actualizará automáticamente en ~1 minuto.

##  Características

- Calendario interactivo navegable por meses.
- Selector de año automático.
- Días con entradas resaltados en amarillo.
- Hover en días muestra lista de entradas.
- Lista completa de todas las entradas.
- Diseño "rayado a mano" con fuentes handwriting.
- Fondo de papel con líneas azules y margen rojo.
- Totalmente estático, sin backend.
- Gratis con GitHub Pages.

##  Licencia

Libre uso para tu diario personal de Project Echo, este fue creado para un Hack del juego para jugarlo en comunidad.. 

En desarrollo

---

**Hecho con ❤️ para jugadores de Project Echo**
