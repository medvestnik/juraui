# PHP integration

Jura UI is a static HTML/CSS/JS UI kit, so you can integrate it into PHP projects without Node.js, npm, or any build step.

## Plain PHP

Place Jura UI files in your public assets directory (for example: `public/assets/vendor/jura-ui/`), then include them as regular static files.

```php
<link rel="stylesheet" href="/assets/vendor/jura-ui/jura-ui.css">
<script src="/assets/vendor/jura-ui/demo.js" defer></script>
```

Example layout:

```php
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="/assets/vendor/jura-ui/jura-ui.css">
</head>
<body class="jura-app">
    <div class="jura-layout">
        <aside class="jura-sidebar">
            <strong>My App</strong>
            <nav>
                <a href="/admin">Dashboard</a>
                <a href="/admin/users">Users</a>
            </nav>
        </aside>

        <main class="jura-main">
            <div class="jura-topbar">
                <h1>Dashboard</h1>
            </div>

            <section class="jura-grid">
                <div class="jura-card">
                    <div class="jura-card-header">
                        <h2 class="jura-card-title">Revenue</h2>
                    </div>
                    <p>$12,400</p>
                </div>
            </section>
        </main>
    </div>
</body>
</html>
```

## Laravel Blade

In a Blade layout (`resources/views/layouts/app.blade.php`), include assets via Laravel `asset()` helper:

```blade
<link rel="stylesheet" href="{{ asset('vendor/jura-ui/jura-ui.css') }}">
<script src="{{ asset('vendor/jura-ui/demo.js') }}" defer></script>
```

## OpenCart / WordPress / custom CMS

Copy `jura-ui.css` (and optional `demo.js`) into the public directory of your theme/module/plugin, then include them exactly like any other static theme asset.

## Important note

Jura UI does not require Node.js on hosting/production servers. Node.js/npm may be used only as an optional local development convenience, but the current starter package works as regular static files.
