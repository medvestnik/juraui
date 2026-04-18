# Jura UI

**Jura UI** is a lightweight open-source UI kit for admin panels, dashboards, CRM systems, SaaS interfaces, and public product pages.

> Status: **First public preview / early alpha**

Jura UI focuses on practical HTML/CSS patterns that are easy to copy, adapt, and integrate into real projects without heavy dependencies.

## Why Jura UI

Jura UI is designed for teams and solo developers who need a clean UI foundation for internal products and client-facing pages.

### Core principles

- **Lightweight**
- **Framework-agnostic**
- **Clean admin UI**
- **Responsive by default**
- **Easy to copy and customize**
- **Suitable for dashboards, CRM, SaaS, admin panels, and public product pages**

## Quick start

Clone the repository and run a static server:

```bash
git clone https://github.com/medvestnik/juraui.git
cd juraui
npm run start
```

Then open `http://localhost:8080`.

## How to include Jura UI CSS

```html
<link rel="stylesheet" href="assets/css/jura-ui.css">
```

## Project structure

```text
juraui/
├── README.md
├── LICENSE
├── package.json
├── index.html
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
    └── getting-started.md
```

## Available examples

- `examples/index.html` — all examples index page
- `examples/dashboard.html` — dashboard / backend interface
- `examples/admin-list.html` — admin entities table with filters
- `examples/auth.html` — auth/sign in page
- `examples/landing.html` — public landing page
- `examples/components.html` — component overview

## Run demo locally

```bash
npm install
npm run serve
```

Or without npm:

```bash
python3 -m http.server 8080
```

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
