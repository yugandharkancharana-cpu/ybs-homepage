# YBS Books: product changes and developer handoff

Prepared 26 October 2026. Scope: the supplied standalone YBS Books HTML prototype, with reference to documented Zoho Books workflows and TallyPrime transport functionality. This is a focused gap analysis of the prototype, not an audit of the live YBS backend or a complete competitor feature inventory.

## 1. Product objective

After YBS authentication and a Books entitlement check, a user selects or creates an organization. The first invoice must represent that user's business: logo, legal identity, address, tax registration, bank details, optional payment QR, signature, customer details, notes and terms. A single issue event creates one accounting invoice with appropriately labeled copies. Transport handling must distinguish an invoice copy from a delivery challan, e-way bill and e-invoice.

The attached HTML makes these interactions reviewable. It stores demonstration data locally. Developers must integrate the workflow into the real platform and independently verify the live implementation.

## 2. Evidence and comparison

| Area | Original YBS HTML | Upgraded review prototype | Required production work |
|---|---|---|---|
| Organization onboarding | Hard-coded demo profile in settings | Five steps: business, tax/series, bank/QR, appearance, review | Tenant-bound organization creation, admin permissions, resuming onboarding, multi-org selector |
| Branding and address | Hard-coded YBS brand in preview | Uploaded logo; legal/trading names; stacked/compact address; contact details | Secure image storage, validated rendering, accessible PDF template service |
| Payment instructions | No configurable invoice bank/QR | Account, IFSC, branch, UPI text and uploaded payment QR; display switches | Payee verification process; bank-change audit; restricted visibility; payment gateway only if required |
| Notes and terms | Single invoice note field | Organization defaults copied to new invoices, editable per draft | Versioned templates and translated terms if needed |
| Contacts | Two static rows; create button placeholder | Add/edit/search business or individual, customer/vendor/both; billing/shipping; GST; terms | Server validation, uniqueness policy, contact persons, attachments, import and opening balances |
| Items | Static sample catalogue | Add goods/services; select catalogue entries into invoices | Persistent item master, pricing, correct classification and inventory if in scope |
| Invoice lines | One line and fixed tax-rate choices | Multiple lines; per-line GST, fixed discounts, freight/tax and adjustment | Decimal arithmetic, tax-inclusive pricing, permitted rates, rounding and tax determination |
| Invoice copies | Preview only | Issue once; preview/print/download the full copy pack | Stable server-generated PDFs and artifact retention |
| Transport | Absent | Transporter ID/name, mode, vehicle, LR/date, dispatch/destination, distance, external EWB reference | Challans, dispatch status, EWB/IRP applicability, API lifecycle and exception handling |
| Invoice history | One mutable form | Locked issued snapshots; register; series increment | Atomic series, issue idempotency, document versioning, cancellations and credit notes |
| Accounting | One invoice and bill; conceptual reports | Existing current-document allocations retained | Real ledgers, balanced journals, multi-document payments, credits, aging, statements and period close |
| Security and reliability | Session-only state | Browser-local save, JSON review export, clear control | Authentication, tenant isolation, secure storage, audit, backups/restore and monitoring |

Reference workflow observations: Zoho Books separates organization defaults, reusable contact records and PDF customization. Its organization details feed transaction outputs. Contacts support business and individual types. TallyPrime handles e-way bills through a distinct transport workflow. These are workflow references; YBS keeps its own interface and product scope.

Sources:

- [Zoho Books organization profile](https://www.zoho.com/in/books/help/settings/organization/organization-profile.html)
- [Zoho Books customers and vendors](https://www.zoho.com/in/books/help/contacts/)
- [Zoho Books PDF templates](https://www.zoho.com/in/books/help/settings/templates.html)
- [TallyPrime e-way bill FAQ](https://help.tallysolutions.com/tally-prime/e-way-bill-tallyprime/faq-e-way-bill-tally/)
- [CBIC Rule 48](https://taxinformation.cbic.gov.in/content-page/explore-rules/1000139/1000001)

## 3. First-use and organization flow

1. Authenticate through YBS; check the user's organization membership and Books entitlement on the server. Do not grant Books because the user can access a UI route.
2. Resolve an existing organization or start setup. Never create a duplicate organization on page refresh or an interrupted request.
3. Capture legal/trading name, address components, state/code, country, contact details and logo. Prototype address is simplified; production should store structured addresses separately from formatting.
4. Capture India tax registration, GSTIN/PAN where applicable, financial year, INR currency, number series and payment terms. The demo validates format only, not registration status. Validate country/state/GST consistency server-side; do not determine all place-of-supply rules by string comparison.
5. Capture optional invoice bank details, UPI text and payment QR. Keep bank management restricted to owner/admin roles. Display a clear bank-change history. Verify images and payee details using the organization's process.
6. Capture invoice style, address layout, note, terms and optional signature. Preview changes before saving.
7. Save the organization atomically; mark onboarding complete. Allow later profile edits with a clear policy: defaults affect new invoices, while issued snapshots remain unchanged.

Optional bank, QR and signature fields must not prevent a legitimate organization from completing setup. Missing legal identity/address and incomplete tax registration must prevent issue as appropriate. Keep an explicit draft state for incomplete onboarding.

## 4. Customer and vendor rules

- Separate role (customer/vendor/both) from party type (individual/business). An individual can be GST registered; do not infer tax treatment solely from type.
- For a business: legal company name, invoice/display name, primary contact, email/phone, tax category, GSTIN where required, billing and shipping addresses, terms and notes.
- For an individual: name, optional contact information, billing/shipping addresses, tax category and optional identifiers appropriate to the transaction. Do not require a company name.
- Support same-as-billing with explicit copy behavior; changing billing must not silently overwrite a separately entered shipping address.
- Give contacts stable IDs. Invoice selection must use IDs, never a legal name as the database key.
- Snapshot party details at issue. Later contact changes must leave previously issued documents reproducible.
- A contact's default state and terms may prefill a draft; the user must confirm transaction-specific place of supply and due date.

## 5. One invoice, multiple copies

The user's requested three outputs must be render variants of a single invoice record, not three separately numbered invoices or three sales postings.

| Supply / copy configuration | Copy labels in prototype |
|---|---|
| Goods | Original for recipient; Duplicate for transporter; Triplicate for supplier |
| Services, 2 copies | Original for recipient; Duplicate for supplier |
| Services, user-requested 3-copy pack | Original for recipient; Duplicate for supplier; Additional office copy |

Rule 48 describes goods triplicate and services duplicate arrangements and includes an exception for invoices prepared under its e-invoice provision. The production tax workflow must determine applicable rules; do not impose the goods transporter label on services. The optional third service copy is an operational preference, not a stated statutory requirement.

All copies share: invoice ID and number, issue date, organization/customer snapshots, line/tax totals, payment instructions, transport data and template version. Change only the copy label or explicitly approved display policy. One issue request must create one posting set regardless of the number of print/download actions.

A transporter copy does not generate or substitute for an e-way bill. An uploaded payment QR does not substitute for a government-signed e-invoice QR. The demo records external EWB references as plain text only and never claims validity. Treat e-invoice/IRN, EWB and delivery challans as separate entities with their own states and relationships.

## 6. Invoice and transport fields

Invoice: organization, customer ID, supply category, invoice/issue/due dates, number series, place of supply/state code, GST treatment, customer PO reference, source order, line array (item ID, description, HSN/SAC, UQC/unit, quantity, price, discount, tax component/rate), freight and its tax treatment, adjustment, note, terms, currency and template version.

The prototype calculates line taxable value as quantity × rate − fixed discount, adds freight, calculates tax per line/freight and adds an adjustment. This is illustrative. Production needs exact decimal calculations, approved component rounding, exemption/zero-rating distinctions, reverse charge/export/SEZ where in scope, tax-inclusive pricing, discount allocation and applicable TDS/TCS rules. Obtain an accounting/tax-reviewed specification rather than copying demo JavaScript into the ledger.

Transport: transporter ID/GSTIN, transporter name, mode, vehicle, transport document/LR number/date, dispatch-from and ship-to addresses, distance, external EWB number/date, movement reason and dispatch status. Production must support relevant mode-specific validations and bill-to/ship-to scenarios. Add EWB status, validity, cancellation and Part B changes only through a verified integration. Do not fabricate an IRN, signed QR or EWB status.

## 7. Suggested production data model

| Entity | Key relationships and requirements |
|---|---|
| Organization | tenant ID, legal identity, structured addresses, tax regime, financial year, currency, setup status |
| OrganizationMembership | user ID, organization ID, role, entitlement; enforced on every query/action |
| OrganizationProfileVersion | versioned invoice defaults, bank/branding asset references, effective date and audit actor |
| Contact / ContactAddress / ContactPerson | organization ID; party type distinct from role; tax and payment defaults |
| Item / ItemTaxDefault | organization ID, goods/service, classification, unit and pricing |
| NumberSeries | organization + financial year + document type + prefix; atomic next value; uniqueness constraint |
| Invoice / InvoiceLine / TaxComponent | stable IDs, draft/issued/part-paid/paid/void state, exact amounts, source references |
| InvoiceIssueSnapshot | immutable organization/party/item/template/transport values, issue timestamp and actor |
| InvoiceArtifact | issue ID, copy kind, PDF version, checksum and secured object-storage reference |
| Dispatch / DeliveryChallan / EWayBill / EInvoice | separate lifecycle records linked to invoice; external IDs and verified status |
| Payment / Allocation | actual payment record, bank/cash account, date/mode/reference and allocations across documents |
| Journal / JournalLine / CreditNote | balanced postings, reversal links, tax treatment and locked periods |
| AuditEvent | organization ID, actor, action, record version, reason and event timestamp; protected append-only store |

Every entity must carry or resolve an organization scope. Test cross-organization IDs, image URLs, exports and PDF access. Do not rely on hidden navigation for permissions.

## 8. Server contracts and issue transaction

Suggested interfaces (adapt to the existing YBS stack): organization create/update/setup status; asset upload/scan; contact CRUD/search; catalogue CRUD; invoice draft CRUD; issue; artifact download; payment/allocate; transport/EWB status. Use authenticated organization context, role checks, request validation, version checks and idempotency keys.

Issue must, in one recoverable transaction: authorize; validate draft/version; validate organization/customer/tax; reserve the number; compute authoritative totals; write the immutable snapshot; create one balanced posting set; record audit; commit. Render copy PDFs from the committed snapshot through a retryable job. Store artifact version/checksum. Retrying issue must return the same invoice, not consume another number or create duplicate postings. Retrying a PDF job must not issue again.

Persist payment allocation independently of invoice rendering. Issued invoice changes use approved credit/reversal/cancellation mechanisms with a reason and links. Never silently edit the historical invoice to match current organization settings.

## 9. Implementation order

**P0 before live financial use:** YBS authentication/entitlements; organization setup; role and tenant enforcement; persistent contacts/items; reviewed invoice/tax arithmetic; atomic numbering and idempotency; immutable snapshots/PDFs; postings and current balances; credit/reversal policy; payments/allocation; audit and period locks; backup/restore; error monitoring; accountant review. For goods, add a verified transport/compliance workflow required by the actual business before launch.

**P1 after the core is sound:** multiple sales/purchase orders and partial conversion; delivery challans and returns; estimates; expenses; credit/debit notes; bank reconciliation/import; AR/AP aging and statements; opening balances and migration; multi-document allocations; approval workflow; attachments; email delivery and reminder logs; customer portal with scoped access.

**P2 according to business need:** recurring invoices, bank feeds, payment gateway integration, inventory/warehouses, multicurrency, advanced reporting, automation and mobile refinements. These are roadmap candidates, not required just to match a competitor's largest plan.

## 10. Acceptance scenarios

1. New user cannot issue until organization setup is saved; reloading resumes persisted setup. Existing user enters the correct organization, never another tenant's records.
2. Upload PNG/JPEG logo, QR and signature; reject wrong type, corrupt image or size above 1 MB. Preview, issue, reopen and print retain the images. Production must also scan/decode/re-encode server-side.
3. Change legal name, address layout, bank and note. A new invoice picks up defaults; an already-issued invoice remains byte/content stable against its snapshot.
4. Add an individual without a company name; add a business requiring company legal name; add a registered individual and an unregistered business. Billing/shipping and selected terms appear correctly.
5. Add two invoice lines with different rates, discounts and tax rates; check freight tax and positive/negative adjustments against approved expected totals. Reject zero quantity, negative rates, excessive discount and invalid numbers.
6. Unregistered organization cannot charge GST. Registered organization requires valid-format identifiers and classification. Production verifies applicable registration/state/tax policy.
7. Goods issue creates three labeled copies with one number and identical values. Services can produce two or three copies with the correct office-copy label. Print-preview pagination works for long descriptions/many lines.
8. Double-click issue, retry after timeout and issue simultaneously from two tabs/users: one issue result, unique number, no duplicate posting. The prototype's local counter is not a solution to concurrency.
9. Enter transporter, vehicle, LR, dispatch/destination and external EWB reference; all selected copies preserve the transport snapshot. External reference entry never claims verified EWB status.
10. Save/edit contact after issue, change organization profile, then reopen old copy: old identity and terms remain. Create next invoice: new values apply.
11. Allocate partial receipt and final balance; reject zero, negative and over-allocation; verify journal and AR balances across multiple invoices. Prototype demonstrates amount allocation against current invoice only.
12. Attempt sales-user organization edits, auditor writes and cross-tenant PDF URLs: reject server-side. Test restore from backup, locked period restrictions and audited cancellation.

## 11. Prototype limitations to communicate during handoff

One India/INR organization per browser. Data uses localStorage and can be manipulated externally. No real sign-in, shared database, server authorization, statutory validation, filing or payment integration. A static QR image is not validated. Uploaded files are browser-local. Browser print creates PDFs through the user's chosen print settings; no server PDF renderer. The register archives issued copies, but inherited reports and payment allocation reflect only the current invoice and bill. Inherited payment date/mode/reference controls are illustrative and not durable payment records. Catalogue and contact changes do not constitute stock, ledger or tax migrations. JSON export is review data, not a tested production backup/restore system. A return to an old archived invoice does not offer payment allocation in this edition.

Use this as a reviewable interaction specification and implementation guide. Launch readiness requires the production checks above and verification of the actual YBS implementation.
