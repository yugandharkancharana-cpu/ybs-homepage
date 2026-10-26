# YBS Books — organization and invoice review edition

This extends the user-supplied `YBS_Books_Interactive_Prototype.html`. The original is retained under `reference/`. The editable additions are `enhancements.js` and `enhancements.css`; `build.mjs` combines them with the original into a self-contained `dist/index.html`.

Open `dist/index.html` in a modern browser, or run `node preview.cjs` and visit http://127.0.0.1:5200. Rebuild after edits with `node build.mjs`. No installation or third-party browser dependencies are required.

Start with **Use sample organization**, or enter your own review details. Complete the five setup steps. Add an individual or business customer, create an invoice, then **Issue & generate copies**. Goods have three labeled copies; services support two copies or three with an additional office copy. Print / Save PDF uses the browser's print dialog. Download invoice HTML preserves the issue snapshot.

Working additions: organization onboarding; raster logo, payment QR and signature; address layout; GST registration format checks; bank details; invoice note/terms; number series; individual/business contacts and vendors; contact editing/search; catalogue creation; multi-line invoices; freight/discount/tax/adjustments; transport details; locked issue snapshots; issued register; local persistence; JSON export and clear controls; developer gap screen.

The inherited sales order → invoice and purchase order → bill → payment walkthroughs remain single-document demonstrations. Reports and payment allocations cover the CURRENT invoice and bill only, not the entire issue register. The old accounting view is illustrative, not a posting engine. Payment mode/date/reference inputs in that inherited view are presentation fields; only amount allocation affects demo balances.

This is not a production accounting system. Local storage is not tenant isolation, authentication or a secure financial database. GST calculations are illustrative, use JavaScript numbers and require production decimal arithmetic and tax review. No payment QR is generated or verified: a user-provided PNG/JPEG is displayed. No payment is processed; no GST return, IRN, signed government QR, e-way bill or delivery challan is generated. Document snapshots are locked in the interface but browser data can be changed externally. Organization support is one active India/INR organization per browser, not production multi-organization management.

See `DEVELOPER-HANDOFF.md` for feature gaps, data model, copy rules, priorities, acceptance scenarios and launch requirements. Research checked 26 October 2026. Production integration should occur within YBS authentication, organization permissions and Books access entitlement.

## Hosted review

Owner-only preview: https://ybs-books-organization-invoicing-2026.candidkoala1026.chatgpt.site

This folder is the standalone Books prototype. It complements the earlier Books screen in `../internal-ui/`. See `dist/index.html` for the current runnable version and `DEVELOPER-HANDOFF.md` for implementation requirements. The hosted preview was published from source commit `63b3f52c45921db4072401ad2417a981bbe8f3b8`; this GitHub copy excludes hosting identity and repository credentials.
