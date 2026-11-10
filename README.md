<p align="center">
  <img src="dist/assets/wishes-and-ribbons-logo-exact-teal-red.svg" alt="Wishes &amp; Ribbons" width="360">
</p>

# Wishes & Ribbons

**Thoughtful gift sets, made personal.**

A gift shop prototype that makes thoughtful giving simple: browse curated sets, choose a gift, add a personal wish and review the details before confirming a demonstration order.

**[Visit the live website](https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/)** · **[View deployment runs](https://github.com/joyafolabi2804-beep/assignment-wishes-and-ribbons/actions/workflows/pages.yml)**

## About the project

Wishes & Ribbons is a web assignment built with HTML, CSS and vanilla JavaScript. Its visual identity combines teal branding, warm neutrals, product photography and personal gift notes. The website is served directly from `dist/`, with no framework, package installation or compilation required.

This is a demonstration: confirmations are pretend orders. No payment is taken, no order is sent and no customer account is required.

## Features

- Three curated gift sets with photographs, descriptions, contents and EUR prices.
- One gift set per order; choosing another replaces the existing selection.
- An optional personal message of up to 280 characters, with a live character count.
- A separate order review where customers can edit their gift or message.
- Explicit confirmation with a demonstration reference and the selected gift details.
- Gift-note preview and text download.
- Responsive layouts, labelled controls, a skip link and native dialogs.

## Try the customer journey

1. Open the live website and browse **Gift sets**.
2. Choose a set and add a message, or leave it blank.
3. Select **Review order summary** to check the gift, price and message.
4. Edit the message or change the gift if needed, then review again.
5. Confirm the pretend order to see the demonstration confirmation.

A gift must be selected before reviewing, and any changes require a fresh review before confirmation.

## Run locally

You need **Python 3** to serve the website. From the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open **[http://127.0.0.1:4173/](http://127.0.0.1:4173/)** in your browser. Stop the server with **Ctrl + C**.

Google Fonts loads externally, so an internet connection is needed to display the hosted typefaces.

## Test the project

You need **Node.js 22 or newer** and **Python 3**. No npm dependencies are required.

```sh
node --test tests/order.test.cjs tests/shop.test.cjs
node tests/prd-dom-smoke.cjs
```

The unit tests cover catalogue data, prices, gift selection, message changes and confirmation rules, along with the supporting shop utilities. The control smoke test checks the message → review → confirmation sequence and its editing paths using a limited DOM fixture.

For a manual check, try both a blank and a written message, replace a selected gift, edit a reviewed message and resize the browser to a phone-sized viewport. Automated control tests do not replace visual browser checks.

## Project structure

| Path | Purpose |
| --- | --- |
| `dist/index.html` | Main page, gift-note editor and order dialogs |
| `dist/styles.css`, `dist/shop.css` | Visual styling and responsive layout |
| `dist/app.js` | Customer interactions and dialog controls |
| `dist/order.js` | Gift catalogue, EUR prices and order state |
| `dist/shop.js` | Supporting shop utilities covered by unit tests |
| `dist/assets/` | Product photographs, logos and monograms |
| `tests/` | Unit tests and DOM control checks |
| `.github/workflows/pages.yml` | Automated checks and GitHub Pages deployment |

## Deployment

The website is published through **GitHub Pages** at:

[https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/](https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/)

Every push to `main` runs the checks and uploads `dist/` for deployment. The workflow can also be started manually from **Actions → Publish Wishes & Ribbons → Run workflow**. Both the `build` and `deploy` jobs must succeed before the new version is live.

For a new copy of this repository, select **Settings → Pages → Source → GitHub Actions** using a repository administrator account. The workflow also supports an optional `PAGES_SETUP_TOKEN` secret for initial setup; it must be restricted to this repository with Pages and Administration write permissions and can be removed after Pages is enabled.

Asset links are relative, so the website works under a GitHub Pages repository path without a base-path build setting.

## Design and image references

- [Product requirements](PRD-reference.md): intended customer journey and project scope.
- [Requirements check](PRD-SUCCESS-CHECK.md): recorded implementation checks against the requirements.
- [Photo sources](PHOTO-SOURCES.md): product-image references and provenance.
- [Photo editing notes](GIFT-PHOTO-EDITS.md): documented background adjustments to gift-set photographs.

Product imagery and branding assets are included for this assignment. Consult the source notes before reusing third-party photographs.
