# YBS public homepage

A complete static implementation for The Y Business Services. Includes responsive desktop and mobile layouts, CSS 3D graphics, animation, and browser-local interactions. No framework, package installation, build, API keys, or backend is required.

## Files and preview

- `dist/index.html`: page content, SVG icons, and accessible structure.
- `dist/styles.css`: design system, responsive layouts, 3D geometry, and motion.
- `dist/app.js`: filters, service dialogs, workspace previews, navigation, and reveal behavior.
- `preview.cjs`: optional local server. Run `node preview.cjs`, then open `http://127.0.0.1:5180`.
- `YBS-Landing-Page.html`: the accompanying standalone file embeds CSS and JavaScript for easy sharing. Open it in a modern browser. Internet access loads Google Fonts; system fallbacks work offline.

## Production integration

1. Serve this public page at `/`. Remove the existing redirect from `/` to `/login`.
2. Preserve the current application, authentication, `/login`, and `/signup` routes. All login and signup buttons currently use the absolute production URLs on `https://ybusinessservices.com`.
3. For a React or other framework application, port the sections into components and scope the stylesheet as needed. Keep the layout, type sizes, spacing, breakpoints, animation geometry, and interactive states to reproduce the design. Replace global DOM listeners with the framework's lifecycle and state handling.
4. Replace the text-based YBS monogram with the approved company logo when supplied. This is a proposed visual identity treatment, not a claim about the existing official logo.
5. Confirm public service descriptions, Books launch status, and the production client panel's actual capabilities with the YBS team. Workspace numbers and activities are explicitly illustrative. The page does not contain customer testimonials, customer counts, prices, or guarantees.
6. Books is presented as in development with selected access. The public page does not claim automatic access, free-for-everyone access, an active subscription, or working accounting integrations.
7. Add approved legal and privacy destinations when provided. No placeholder legal URLs, fake contact forms, or invented contact details are included.
8. Self-host DM Sans and Manrope if required by your privacy or performance policy. Use `font-display: swap`. The current version uses the Google Fonts stylesheet.
9. Add the canonical URL, approved social preview asset, analytics/consent implementation, and favicon for production. Confirm metadata and sitemap in your existing application.

## Design and motion

Main colors: navy `#101d2a`, gold `#d6b977`, ivory `#f8f7f3`, ink `#152b37`, sage `#709b89`. Manrope headings with Georgia italic accents; DM Sans body. Main content width: 1240px. Responsive breakpoints: 1150, 900, and 600px.

Hero: CSS perspective, a gold extruded YBS hub, elliptical orbital rings, floating service tiles, and optional pointer tilt. Books: CSS 3D cover, spine, paper edges, and a floating receipt. No paid assets, 3D libraries, model files, or video downloads.

`prefers-reduced-motion` disables animation, reveal movement, pointer tilt, and smooth scrolling. Service filters support arrow keys, Home, and End; native dialogs support Escape, focus return, and backdrop dismissal. The mobile menu announces its expanded state. FAQ uses native `details` elements.

## Verified behavior

JavaScript syntax checked. Desktop page and 390px iframe layout inspected in browser. Verified service filtering, service details, workspace preview changes, mobile menu, and Books details. This is a frontend handoff; no login, purchase, account creation, or accounting operation was performed. Browser inspection is not exhaustive cross-device testing; run the team's normal accessibility, browser, and production integration checks.

## Deployment

For ordinary static hosting, deploy the contents of `dist`. For an existing single-page app, integrate into its public root route rather than replacing its authentication or app shell. A separately hosted private Sites preview is intended for review; it does not modify ybusinessservices.com.
