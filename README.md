# Jura UI

**Jura UI** is a lightweight open-source UI kit for admin panels, dashboards, CRM systems, SaaS interfaces, and public product pages.

> Status: **First public preview / early alpha**

Jura UI focuses on practical HTML/CSS patterns that are easy to copy, adapt, and integrate into real projects without heavy dependencies.

## What Jura UI is (and is not)

Jura UI does **not** require Node.js, npm, bundlers, Bootstrap, Tailwind, React, or Vue.

It is a static HTML/CSS/JS UI kit and can be used directly in:

- PHP projects
- Laravel applications
- OpenCart stores
- WordPress themes/plugins
- plain HTML sites
- any backend-rendered project

## Why Jura UI

Jura UI is designed for teams and solo developers who need a clean UI foundation for internal products and client-facing pages.

### Core principles

- **Lightweight**
- **Framework-agnostic**
- **Clean admin UI**
- **Responsive by default**
- **Easy to copy and customize**
- **Suitable for dashboards, CRM, SaaS, admin panels, and public product pages**

## Quick start (no Node.js required)

Clone the repository and include static assets directly:

```bash
git clone https://github.com/medvestnik/juraui.git
cd juraui
```

```html
<link rel="stylesheet" href="assets/css/jura-ui.css">
<script src="assets/js/demo.js" defer></script>
```

Then run any static file server, for example:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Optional npm convenience command

Node.js is optional. If you already use npm in your environment, you can run:

```bash
npm run serve
```

This only starts a local static server and is not required for using Jura UI.

## PHP integration

For backend usage examples, see:

- [`docs/php-integration.md`](docs/php-integration.md)
- [`docs/getting-started.md`](docs/getting-started.md)

## Project structure

```text
juraui/
├── README.md
├── LICENSE
├── package.json
├── index.html
├── .nojekyll
├── assets/
│   ├── css/
│   │   ├── jura-ui.css
│   │   └── demo.css
│   └── js/
│       └── demo.js
├── examples/
│   ├── index.html
│   ├── dashboard.html
│   ├── admin-list.html
│   ├── auth.html
│   ├── landing.html
│   └── components.html
└── docs/
    ├── getting-started.md
    └── php-integration.md
```

## Available examples

- `examples/index.html` — all examples index page
- `examples/dashboard.html` — dashboard / backend interface
- `examples/admin-list.html` — admin entities table with filters
- `examples/auth.html` — auth/sign in page
- `examples/landing.html` — public landing page
- `examples/components.html` — component overview

## Roadmap

- Expand component set (dropdowns, modals, pagination, breadcrumbs)
- Add theme variants and dark mode package
- Add docs pages with copy/paste snippets
- Prepare first tagged release (`v0.1.x`)
- Add optional npm distribution workflow

## License

MIT License. See [LICENSE](LICENSE).

## Links

- GitHub Pages demo: https://medvestnik.github.io/juraui/
- Repository: https://github.com/medvestnik/juraui
