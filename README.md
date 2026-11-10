# Wishes & Ribbons

A static gift shop demonstration with three curated gift sets, an optional personal message, an editable order review and a pretend-order confirmation. No account, real order or payment is created.

## Local preview

The website is ready to serve from `dist/`; no installation or build is required.

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open [the local website](http://127.0.0.1:4173/). Stop the server with **Ctrl + C**.

## Checks

With Node.js 22 and Python 3 installed, run from the repository root:

```sh
node --test tests/order.test.cjs tests/shop.test.cjs
node tests/prd-dom-smoke.cjs
```

The checks cover gift selection, prices, optional messages, editing and reviewing a summary, and explicit demo confirmation. The control smoke test uses a limited DOM fixture; check the responsive layout in a browser as well.

## GitHub Pages

After deployment succeeds, the website is available at:

[https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/](https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/)

In this repository's **Settings → Pages**, set **Source → GitHub Actions**. This requires administrator access; if the settings page returns 404, sign in as the repository owner or ask an administrator to enable Pages.

The workflow in `.github/workflows/pages.yml` runs the existing checks and publishes only `dist/` on pushes to `main`. It can also be started from **Actions → Publish Wishes & Ribbons → Run workflow**. Wait for both jobs to succeed before opening the published address.

The default workflow token cannot enable Pages for the first time. Alternatively, an administrator can add an Actions secret named `PAGES_SETUP_TOKEN`: a fine-grained token restricted to this repository with **Pages: write** and **Administration: write** permissions. The workflow uses it for initial Pages setup. Remove the secret after the first successful deployment. Never commit tokens.

All website asset links are relative, so the site works under the repository URL without a framework build or base-path configuration.

## Editing

- `dist/index.html`: page content and dialogs.
- `dist/styles.css` and `dist/shop.css`: layout and visual styling.
- `dist/order.js`: gift sets, EUR prices and order state.
- `dist/app.js`: page interactions and message/review/confirmation flow.
- `dist/assets/`: product photographs and branding assets.

The source folder's photo notes and PRD documents are retained in the repository. Local Git history and hosting identity from the source folder are excluded from the replacement. Google Fonts loads externally.
