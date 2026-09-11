# Project Echo - Diario Digital

Un sitio est├Ītico con **Jekyll + GitHub Pages** para publicar tu diario de juego de Project Echo en formato calendario, con apariencia de diario rayado a mano.

## ĒĀĄĒ│Ā Estructura del repositorio

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

## ĒĀĄĒÜ¬ C├│mo desplegar en GitHub Pages

### Paso 1: Crear el repositorio

1. Ve a GitHub y crea un **nuevo repositorio** (ej. `project-echo-diario`).
2. Puedes hacerlo p├║blico o privado.
3. No lo inicialices con README (subiremos todo manualmente).

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
Puedes subirlos v├Źa:
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

## ĒĀĄĒōØīĖĒ▒Ź C├│mo a├▒adir nuevas entradas

Crea archivos en `_posts/` con este formato:

```markdown
---
title: "Sesi├│n 03 — T├Źtulo de tu aventura"
date: 2025-09-10 20:00:00 -04
tags: [sesion, capitulo-3]
---

# T├Źtulo de la sesi├│n

**Fecha de juego:** 10 de septiembre de 2025  
**Jugador:** T├║  
**Sistema:** Project Echo

## Resumen

Escribe aqu├Ź lo que pas├│...

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

## ĒĀĄĒÄ© Personalizar el dise├▒o

### Cambiar t├Źtulo y descripci├│n

Edita `_config.yml`:

```yaml
title: "Tu T├Źtulo Personalizado"
description: "Tu descripci├│n aqu├Ź"
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
  /* ... m├Īs variables ... */
}
```

### Cambiar fuentes

El sitio usa tres fuentes de Google Fonts:

- **Patrick Hand** — Cuerpo del texto (bol├Źgrafo)
- **Permanent Marker** — T├Źtulos (marcador grueso)
- **Caveat** — Fechas y tags (escritura r├Īpida)

Si quieres cambiarlas, edita el `@import` en `style.css`.

## ĒĀĄĒōōōŹ Flujo con Obsidian

1. Escribe tus sesiones en Obsidian como siempre.
2. Aseg├║rate de que cada nota tenga:
   - `title` en el frontmatter.
   - `date` (YYYY-MM-DD).
3. Copia el contenido a `_posts/` con el nombre correcto.
4. Haz commit y push:

```bash
git add _posts/
git commit -m "A├▒adir sesi├│n XX"
git push
```

GitHub Pages se actualizar├Ī autom├Īticamente en ~1 minuto.

## ĒĀĄĒÄ» Caracter├Źsticas

- ✅ Calendario interactivo navegable por meses.
- ✅ Selector de a├▒o autom├Ītico.
- ✅ D├Źas con entradas resaltados en amarillo.
- ✅ Hover en d├Źas muestra lista de entradas.
- ✅ Lista completa de todas las entradas.
- ✅ Dise├▒o "rayado a mano" con fuentes handwriting.
- ✅ Fondo de papel con l├Źneas azules y margen rojo.
- ✅ Totalmente est├Ītico, sin backend.
- ✅ Gratis con GitHub Pages.

## ĒĀĄĒōäīļĖŹ Licencia

Libre uso para tu diario personal de Project Echo.

---

**Hecho con ❤️ para jugadores de Project Echo**
