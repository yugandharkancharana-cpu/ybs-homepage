# YBS internal UI design

Interactive frontend design for The Y Business Services, matching the navy, gold, ivory, and sage visual direction of the public homepage. This is a developer handoff and workflow reference, not a production application. All names, figures, deadlines, documents, and transactions are sample data. Changes reset on refresh.

## Open the design

Open `dist/index.html` in a modern browser, or run `node preview.cjs` and visit `http://127.0.0.1:5190`. No installation or build is required. The accompanying `YBS-Internal-UI.html` combines the HTML, CSS, and JavaScript into one shareable file. Google Fonts loads DM Sans and Manrope; system fallbacks are used offline.

Use the top switcher to choose Client, Admin, Provider, or Books. The switcher exists for design review only and must never become production role selection or authorization.

## Screen coverage

| Workspace | Screens |
| --- | --- |
| Client | Overview, service catalogue, projects, documents, billing, business profile |
| Admin | Overview, orders and clients, providers, task queue, Books access, profile |
| Provider | Overview, task inbox, active tasks, earnings and payouts, profile |
| Books | Overview, invoices, sales orders, vendor bills, purchase orders, payments, reports |

24 navigable workspace screens, plus contextual dialogs and scoped Books variants. Hash routes are directly linkable, for example `#admin/orders`, `#provider/inbox`, and `#books/invoices`.

## Working preview flows

- Create a service request: Client → Explore services → choose service → add a brief. Adds a sample order to the shared admin queue, without checkout or payment.
- Review a deliverable: Client → My projects → Brand identity. Approve to complete the sample project or request revision to return it to progress.
- Add a provider: Admin → Service providers → Add provider. Creates a sample provider record with Books access off; does not send an invitation or create credentials.
- Assign work: Admin → Task queue → Assign. Assign to Ananya to see the work in the representative provider inbox. Other providers have sample records but do not have separate impersonation views in this prototype.
- Accept or decline: Provider → Task inbox. Acceptance updates an assigned order or adds active work for seeded inbox tasks. Rejection returns the work to the admin queue. The 24-hour escalation policy is described, but no server scheduler exists.
- Update progress: Provider → Active tasks. 100% submits for review rather than automatically completing the client order.
- Control access: Admin → Books access. Per-person switches and scope selectors update the preview. In Books, the context selector demonstrates finance admin, Ananya, or the sample client. Scoped providers see their own payout records; scoped clients see their own service orders; off hides the finance navigation and shows an access explanation.
- Sales order → invoice: Books → Sales orders. Edit quantity, rate, GST, and treatment; the preview updates. Convert to an invoice draft, issue, and record full or partial receipts.
- Purchase order → bill: Books → Purchase orders. Convert to a vendor bill draft, approve, and allocate payments.
- Reports and CSV exports: document totals and open balances follow sample state. Report charts, historical earnings, and some dashboard figures are illustrative. Reports are document-based workings, not a general ledger, tax filing, or validated financial statement.
- Search, notifications, document metadata, profile editing, and a sample support message preview. The support preview does not send messages. Document selection adds only filename and size; file contents are never read or uploaded.

## Developer integration

Preserve the visual structure, component states, typography, spacing, tokens, and responsive behavior. Split the existing HTML templates into your application framework's components and replace the demo state with your API and server-side domain rules. Use real authenticated identities, explicit tenant boundaries, and server-enforced authorization for every route and record. Client-visible service records and each organisation's books must stay separate from YBS platform finances.

The top portal/context switches and sample permission toggles are UI demonstrations, not access enforcement. Never rely on hidden navigation or client-side state for security. The prototype has no production authentication, billing gateway, real invitations, file storage, messaging, accounting engine, role enforcement, or backend persistence.

Reference inputs: YBS platform specification v2.0; combined portal visualization; standalone Books flow. This pass focuses on the shared visual system and representative end-to-end workflows. Future implementation scope includes packages/checkout, provider onboarding qualification and bank fields, commissions and actual payout processing, referral program, AI assistance, complete contacts/items masters, expenses, chart of accounts, true ledger-driven reports, inventory, e-invoicing, and administrative settings. Existing spec features remain product requirements even when not represented by a separate screen here.

## Design system

Colors: navy `#122633`, gold `#d6b977`, ivory `#f5f6f2`, ink `#203640`, sage `#72917b`. Manrope headings and DM Sans interface text. 224px desktop sidebar; four-column KPI row; white panels with subtle boundaries. Responsive breakpoints at 1500, 1200, 1000, and 760px. Mobile uses a drawer and scrollable tables. Animation is limited to the dashboard's small brand mark and page transition; reduced-motion preferences disable both.

Native dialogs support Escape, backdrop dismissal, and focus return. Inputs have labels, tables use header cells, toggles announce state, toast messages use a live region, and the closed mobile sidebar is inert. Validate against your team's accessibility target and browser matrix before production use.

## Files

- `dist/index.html`: app shell and SVG icon definitions.
- `dist/styles.css`: design tokens, component styles, layout, and responsive rules.
- `dist/app.js`: screen templates, sample state, interactions, and CSV generation.
- `preview.cjs`: optional local static server on port 5190.

Deploy the contents of `dist` for a standalone static prototype. For production, integrate into the existing app behind its existing login routes. This design does not modify ybusinessservices.com.
