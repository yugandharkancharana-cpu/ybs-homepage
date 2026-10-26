# Verification record

Checked 26 October 2026 with browser interactions against the local static build.

- All 13 navigation routes rendered; no browser console errors were observed in the final route smoke check.
- First-use invoice access redirected to organization setup. Empty organization fields and missing registered GSTIN were rejected.
- Completed the five-step organization setup with explicitly fictitious test data. Edited legal name, tax registration, bank account, style and note; reloaded and verified persistence.
- PNG uploads for company logo, payment image and authorized signature appeared in previews and all three issued service copies. A labeled demo image was used for QR placement; no real payment QR was tested or generated.
- Created individual and business customers. Individual required no company name; separate shipping address appeared in invoice copies. Business legal name appeared in the invoice; search and sales-order customer selection worked.
- Tested two lines: 2 × ₹25,000 less ₹1,000 discount at 18%; another ₹1,000 at 5%; freight ₹100 at 18%; adjustment −₹0.50. Expected subtotal ₹50,100, tax ₹8,888 and total ₹58,987.50 matched the preview and issued copies.
- Goods issue created original/recipient, duplicate/transporter and triplicate/supplier copies under INV-2026-001. All copies shared the same totals and test transport/LR data.
- Two-copy service issue produced recipient and supplier copies under INV-2026-002. Three-copy service issue produced the additional-office label under INV-2026-003. Unregistered organization invoice tax was zero.
- Changed organization name and account after the first issue; historical copies retained the original identity and account. Register persisted across refresh.
- Blocked issue with no customer. Preserved the original current-invoice receipt allocation: ₹1,000 receipt against ₹50,000 changed status to partially paid and balance to ₹49,000.
- Sales-order conversion copied the selected business customer and item into a new draft with organization note, bank and image defaults.
- Invoice HTML download completed. Source file included embedded images and three labeled copies. The browser print action did not complete in the in-app browser, so PDF output/pagination is NOT visually verified. Instructions explain using downloaded HTML in Chrome/Edge; server PDF export remains a production requirement.
- All 13 screens were checked at 390 × 844 viewport. Forms reflowed into one column; long tables and navigation used local scrolling. Temporary viewport override was reset.
- Final self-contained HTML passed JavaScript syntax compilation. Original reference and supplied file SHA-256 matched: 190396a91d5eb4be8b10a23c48087bd215a5a90b94f18c1705d7ce87c764b71c.

This verifies the prototype interactions above, not backend security, accounting correctness, statutory compliance, production concurrency, automated registration verification, real QR payment collection or a complete PDF rendering service. Those checks are specified in DEVELOPER-HANDOFF.md.
