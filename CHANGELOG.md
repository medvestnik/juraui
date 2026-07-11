# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-07-11

### Added

**Modular CSS builds**
- `jura-ui-core.css` — essentials-only build: tokens, themes, dark mode, reset, buttons, forms, cards, badges, alerts, progress, spinner, avatar, modal, skeleton, utility classes
- `jura-ui-public.css` — public-site add-on layer: container, navbar, breadcrumbs, pagination, accordion, toast notifications, tooltip, cookie notice

**Utility classes (80+ helpers)**
- Spacing: `jura-m-*`, `jura-p-*`, `jura-mt-*`, `jura-mb-*`, `jura-pt-*`, `jura-pb-*`, `jura-px-*`, `jura-py-*`, `jura-mx-auto`
- Display: `jura-block`, `jura-hidden`, `jura-inline`, `jura-inline-flex`
- Flex: `jura-flex-col`, `jura-flex-wrap`, `jura-flex-1`, `jura-items-*`, `jura-justify-*`
- Sizing: `jura-w-full`, `jura-h-screen`, `jura-max-w-{xs–2xl}`
- Typography: `jura-text-{xs–3xl}`, `jura-font-*`, `jura-text-center`, `jura-truncate`, `jura-text-{primary,muted,danger...}`
- Position: `jura-relative`, `jura-absolute`, `jura-sticky`, `jura-z-{10,20,50}`
- Overflow, borders, shadows, backgrounds, opacity
- Responsive variants: `sm:jura-*` (≤ 640 px) and `lg:jura-*` (≥ 961 px)

**New components (in `jura-ui-public.css`)**
- `.jura-navbar` — sticky public nav with glassmorphic background; mobile hamburger menu via `[data-jura-nav-toggle]`
- `.jura-accordion` / `.jura-accordion-flush` — animated collapse via CSS grid rows; single or multi-open
- `.jura-toast-container` / `.jura-toast` — slide-in toast with success / danger / warning / info variants
- `.jura-tooltip-bubble` — CSS-driven tooltip with top/bottom placement
- `.jura-pagination` / `.jura-page-btn` — page navigation with active and disabled states
- `.jura-breadcrumb` — accessible breadcrumb list
- `.jura-cookie` — GDPR cookie notice bar
- `.jura-container` / `.jura-container-sm` / `.jura-container-lg`

**Production JS (`assets/js/jura-ui.js`)**
- Full accessibility: Escape key closes modals and dropdowns, arrow keys navigate tabs, focus trap inside modals, scroll lock on `<body>` when modal is open, focus restored on close
- ARIA attributes: `aria-expanded`, `aria-selected`, `aria-haspopup`, `aria-hidden`, `aria-live` wired automatically
- `window.jura.toast(msg, type, duration)` API
- Accordion, navbar mobile toggle, attr-driven tooltip initialisation, cookie notice auto-hide

**8 example pages** (Dashboard, Analytics, Users, Settings, Inbox, Billing, Sign in, Landing page) with live theme switching

**Release workflow** (`.github/workflows/release.yml`) — automatically creates a GitHub Release with CSS/JS assets attached whenever `package.json` version is bumped on `main`

### Changed
- `jura-ui.css` bumped to v0.3.0; utility classes appended as section 22
- `demo.js` updated with all accessibility improvements, accordion, toast, and navbar toggle support

## [0.1.0-alpha.0] - 2026-04-17

### Added
- Initial project architecture for Jura UI foundation.
- Vite-based build pipeline with SCSS + Vanilla JS entry points.
- Design token layer with light/dark/auto theme support.
- Base UI primitives: buttons, cards, form controls, table, dropdown, tabs, modal.
- Starter admin dashboard template and quick-start docs scaffold.
