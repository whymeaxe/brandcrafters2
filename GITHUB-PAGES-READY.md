# Embassy of Education — GitHub Pages deployment

This is a Vite/React project prepared for GitHub Pages at:

`https://whymeaxe.github.io/meridian-visa-dist/`

## Deploy

1. Upload the contents of this folder to the repository's `main` branch.
2. Do **not** upload `node_modules` or `dist`.
3. GitHub Actions runs `npm ci`, `npm run build`, and deploys `dist` automatically.
4. In GitHub: Settings → Pages → Source should be **GitHub Actions**.

The project uses the Vite base `/meridian-visa-dist/` and React Router basename `/meridian-visa-dist` so client-side routes work under the repository URL.

## Brand refinement in this build

- Embassy of Education logo retained as the official brand asset.
- Logo purple `#393186` is the primary brand color.
- Logo yellow `#FFCC01` is the action/highlight color.
- Warm ivory, pale purple and pale yellow section fields add color density without sacrificing the existing premium editorial design.
- Desktop typography is larger for laptop readability.
- Mobile body type and CTA controls are enlarged for readability and touch use.
- Existing passport/document animations are preserved.

## Latest update

- Added an interactive, touch-friendly destination globe with highlighted destination markers.
- Added founder section for Avdhesh Brahmbhatt and the supplied founder photograph.
- Added the supplied client gallery photographs to the About page.
- Added the site-wide luxury "Designed by Himanshu Khandelwal" WhatsApp signature.
- Added page-level SEO metadata, LocalBusiness/Person structured data, robots.txt and sitemap.xml.
- Public video/image URLs are base-aware for GitHub Pages deployments.
- No `node_modules` or `dist` should be committed.
