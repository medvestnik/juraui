# Getting started with Jura UI

Jura UI is a lightweight, framework-agnostic UI kit designed for admin dashboards, CRM systems, SaaS interfaces, and public product pages.

## No build step required

You can use Jura UI as plain static files:

- no build pipeline required
- no bundler required
- no Node.js required
- works in plain HTML and backend-rendered projects (PHP, Laravel, OpenCart, WordPress, custom CMS)

## Installation (static files)

1. Download/clone the repository.
2. Copy `assets/css/jura-ui.css` into your project assets.
3. (Optional) copy `assets/js/demo.js` if you want tabs and mobile sidebar toggle behavior.

## Include CSS/JS

```html
<link rel="stylesheet" href="assets/css/jura-ui.css">
<script src="assets/js/demo.js" defer></script>
```

## Basic page skeleton

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Jura UI page</title>
    <link rel="stylesheet" href="assets/css/jura-ui.css" />
  </head>
  <body>
    <main class="jura-main">
      <section class="jura-card">
        <h1>Hello Jura UI</h1>
        <p>Start from cards and grids, then add layout blocks.</p>
      </section>
    </main>
  </body>
</html>
```

## Example card

```html
<article class="jura-card">
  <div class="jura-card-header">
    <h3 class="jura-card-title">Project status</h3>
    <span class="jura-badge jura-badge-success">Active</span>
  </div>
  <p>Everything is running normally.</p>
</article>
```

## Example button

```html
<button class="jura-btn jura-btn-primary">Create project</button>
```

## Customization via CSS variables

Jura UI exposes visual tokens through CSS variables in `:root` (colors, radius, shadow, spacing, font stack). Override them in your own stylesheet:

```css
:root {
  --jura-primary: #0f766e;
  --jura-primary-hover: #115e59;
  --jura-radius: 18px;
}
```

## Next steps

- Open `examples/` to review starter layouts.
- Read the root `README.md` for roadmap and project structure.
- For backend usage details, read [`docs/php-integration.md`](php-integration.md).
