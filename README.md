# Assignment website

This is the source copied from `little-things-by-joy`. It uses React and Vinext.

## Development

Use Node.js 22.13 or newer, then run `npm ci` and `npm run dev`.

## GitHub Pages

The workflow in `.github/workflows/jekyll-gh-pages.yml` builds a static export and deploys only `dist/client/`. In repository **Settings → Pages**, select **GitHub Actions** as the source. Pushes to `main` publish automatically.

For a local build matching the repository URL:

```sh
NEXT_PUBLIC_BASE_PATH=/assignment-wishes-and-ribbons NEXT_PUBLIC_SITE_URL=https://joyafolabi2804-beep.github.io/assignment-wishes-and-ribbons/ npm run build:pages
NEXT_PUBLIC_BASE_PATH=/assignment-wishes-and-ribbons node scripts/verify-pages.mjs
```

The base path is applied to public image URLs and generated scripts/styles. The preparation step removes duplicate physical nesting in Vinext's asset-prefix output. The verification step requires a rendered homepage and checks its linked local assets before deployment.

For a build served at the domain root, leave both environment variables unset.
