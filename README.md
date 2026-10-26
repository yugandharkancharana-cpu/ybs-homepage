# YBS complete services website

A 21-page public website for The Y Business Services. Technology and support lead the service offer, with the wider business services connected to the company story and platform.

## Pages and coverage

Home, searchable service directory, 14 individual service pages, About YBS, How we work, The platform, YBS Books, and a project brief builder.

Services: mobile applications, websites, software engineering, IT and systems support, BPO, consulting, accounting and bookkeeping, GST and TDS support, company registration, compliance and trademarks, branding and digital marketing, HR and payroll, FSSAI and ISO preparation support, and startup funding readiness. Engineering means software engineering only.

Each service page explains the purpose, use cases, scope areas, inputs for a useful brief, common questions, and connected services. No customer counts, testimonials, certifications, prices, guaranteed approvals, or service-level commitments have been invented.

## Preview and build

Run `node preview.cjs`, then open `http://127.0.0.1:5180`. The server supports directory index files. Do not open individual HTML files directly from disk: the site uses root-relative links for static hosting.

Run `node site-builder.mjs` after editing `service-data.mjs`, `home-template.html`, or the builder. It generates all HTML pages and the service index. Styles and interactions are in `dist/styles.css`, `dist/full-site.css`, and `dist/site.js`. The build uses Node's standard library only.

Deploy the complete contents of `dist` to a static host supporting nested directory indexes, including `/services/mobile-apps/`. Existing login and signup links point to ybusinessservices.com.

## Functional interactions

Service search and category filters, linked service and information pages, mobile navigation, native FAQ disclosures, homepage workspace preview states, and the brief builder. Links such as `/contact/?service=mobile-apps` preselect a service.

The brief builder creates a local summary for copying or downloading. It does not send email, submit an enquiry, store client details, or create an account. The page explains this and directs users to save the summary and continue through their YBS account. Connect a production account workflow or approved enquiry destination before treating this as lead capture.

## Production integration

- Serve this public site at the main domain root when ready, removing its existing login redirect while preserving the current client application and authentication routes.
- Replace the proposed YBS monogram with the approved logo if supplied.
- Confirm final service scopes, commercial terms, professional responsibilities and statutory-charge wording with YBS.
- Books is in development with selected access and rollout details to be confirmed. Accounting services are separate from the software module.
- Platform screenshots are labelled design previews. Sample records are not customer evidence or claims that every feature is live.
- Add approved privacy and legal pages, business contact details and a real enquiry destination when available. No addresses, phone numbers, emails or legal text have been invented.
- Add production canonical/social metadata, favicon, analytics consent and sitemap according to the live deployment. Fonts load via Google Fonts; self-host Manrope and DM Sans if required.
- The mobile illustration and support-team scene are AI-generated conceptual visuals, not delivered client products or photos of YBS staff. Captions identify illustrative imagery.

## Design

The navy, gold, ivory and sage visual system continues the existing homepage identity. CSS 3D and restrained motion support the story. Desktop and mobile layouts, reduced-motion support, labelled forms, filter states, focus treatments and status announcements are included. Run your production accessibility and cross-browser checks before launch.

## Internal UI reference

The matching client, admin, provider and Books UI remains in the repository's `internal-ui/` directory. It is a separate design prototype, not a linked public application in this website.

`YBS-Landing-Page.html` at the repository root is the earlier single-page reference. The current complete website is `dist/`.
