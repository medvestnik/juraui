# Jura UI

Jura UI is a lightweight open-source UI kit and skin for dashboards, admin panels, CRM systems, and modern web frontends.

It focuses on clean design, fast integration, minimal dependencies, and easy customization.

## Product vision

Jura UI is designed as a practical base, not a heavy enterprise template monster.

### Core principles
- Lightweight setup and fast integration
- HTML-first approach
- Minimal framework coupling (Vanilla JS + SCSS)
- Works well for PHP/Laravel/OpenCart/static projects
- Ready for both admin and frontend interfaces
- Built-in light/dark/auto themes
- Clean and calm visual language

## Current project structure

```text
jura-ui/
├─ src/
│  ├─ scss/
│  │  ├─ tokens/
│  │  ├─ base/
│  │  ├─ layout/
│  │  ├─ utilities/
│  │  ├─ components/
│  │  ├─ themes/
│  │  └─ patterns/
│  └─ js/
│     ├─ core/
│     └─ components/
├─ templates/
│  └─ admin-dashboard/
├─ docs/
│  └─ getting-started/
├─ dist/
│  ├─ css/
│  └─ js/
├─ index.html
├─ package.json
├─ vite.config.js
├─ CHANGELOG.md
└─ LICENSE
```

## Tech stack (v0 foundation)

- HTML5
- SCSS
- Vanilla JavaScript
- Vite

## Quick start

```bash
npm install
npm run dev
```

Build distributable files:

```bash
npm run build
```

Output:
- `dist/css/jura-ui.min.css`
- `dist/js/jura-ui.min.js`

## Data API

Jura UI behavior is controlled through declarative data attributes:

- `data-jura-toggle`
- `data-jura-target`
- `data-jura-theme`

## MVP components included in this scaffold

- Button
- Card
- Input / Select / Textarea
- Checkbox / Radio / Switch
- Dropdown
- Tabs
- Modal
- Sidebar / Topbar layout primitives
- Table shell

## Roadmap snapshot

### Phase 0 — foundation
- Tokens
- CSS reset
- Layout
- Buttons / forms / cards
- Theme switcher

### Phase 1 — admin MVP
- Sidebar/topbar
- Breadcrumbs/tabs/dropdown/modal/pagination
- Stat cards + simple table

### Phase 2 — frontend MVP
- Hero/CTA/features/pricing sections
- Auth and content pages

## License

MIT.
