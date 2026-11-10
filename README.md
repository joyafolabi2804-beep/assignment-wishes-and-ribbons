# Wishes & Ribbons — assignment website

A React and Vinext website, copied from the original `little-things-by-joy` project and configured for static hosting on GitHub Pages.

## View the published website

Open [the live website](https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/).

If clicking the link does not work, copy this address into your browser:

```text
https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/
```

You do not need to download the code or install anything to view the website.

## Test the website

1. Open the published address above.
2. Check that the gift images, fonts, colours and icons load.
3. Use the navigation links to visit the gift, story and questions sections.
4. Expand and close the questions under “Good to know”.
5. Try a phone or a narrow browser window to check the mobile layout.
6. After a deployment, refresh the page to see the latest version. If necessary, use **Command + Shift + R** on macOS or **Ctrl + Shift + R** on Windows/Linux.

This copy is an informational landing page. Its current content still uses the original Little things by Joy branding; it does not process purchases or payments.

## Run locally

Use Node.js 22 LTS (22.13 or newer) and npm. From a checkout of this repository:

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. Stop the server with **Ctrl + C**.

## Build and check the GitHub Pages version

Run these commands from the repository root on macOS/Linux:

```sh
NEXT_PUBLIC_BASE_PATH=/assignment-wishes-and-ribbons \
NEXT_PUBLIC_SITE_URL=https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/ \
npm run build:pages

NEXT_PUBLIC_BASE_PATH=/assignment-wishes-and-ribbons node scripts/verify-pages.mjs
```

The generated website is in `dist/client/`. The check requires a rendered homepage and verifies that its linked images, styles and scripts exist at the repository-prefixed URLs.

For a build served at a domain root, leave both environment variables unset.

## Publish changes

The workflow in `.github/workflows/jekyll-gh-pages.yml` uses Node.js and Vinext, despite the filename. It installs the locked dependencies, exports the website, checks the output and deploys only `dist/client/`.

In the repository's **Settings → Pages**, select **GitHub Actions** as the source. Pushes to `main` publish automatically. You can also open **Actions → Publish website to GitHub Pages → Run workflow**.

Wait for both the **build** and **deploy** jobs to succeed before checking the live website. A workflow failure can be investigated by opening the failed step in **Actions**.

## Images and ignored files

Website images belong in `public/`. Code uses the helper in `lib/asset-path.ts` to include the GitHub Pages repository prefix. Keep the trailing slash in the published website address.

`node_modules/`, generated build output, environment files and private keys are excluded by `.gitignore`. Commit `package.json` and `package-lock.json` when dependency definitions change.
