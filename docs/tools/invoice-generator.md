# Invoice Generator

`/tools/invoice-generator`

## Purpose

A professional, GST-ready invoice — company/client details, line items,
GST, totals — downloadable as a real PDF.

## Architecture

- `lib/tools/invoice.ts` — `calculateInvoiceTotals()` (subtotal → GST →
  total) and `lineItemAmount()` (quantity × rate, both floored at 0).
- `InvoiceGeneratorClient.tsx` — an editable form (company/client details,
  GST rate as toggle chips reusing `GST_RATES` from the GST Calculator, a
  dynamic line-item list with Add/Remove) plus a **live preview** rendered
  in the exact layout that gets printed — what you see on screen is
  what downloads, not a second parallel template that could drift out of
  sync.
- **"Download PDF" is the browser's own print-to-PDF**, not a PDF-generation
  library: a `.gx-invoice-print` class on the preview plus `@media print`
  rules (in `app/globals.css`) hide the nav, footer, form controls, and
  the tool's own header/CTA (via `.gx-tool-header` / `.gx-tool-cta` /
  `.gx-print-hide`, added to the shared `ToolLayout` and `CTASection` so
  any future tool can reuse print support), then `window.print()` opens
  the native dialog where the user picks "Save as PDF." This was a
  deliberate choice over a PDF library: the browser's print engine always
  renders correctly, where a text-layout library could mis-wrap or
  mis-paginate — exactly the "mistake on functionality" to avoid.
- Line item IDs are assigned via a `useRef` counter starting after the
  one default row, incremented only inside the "Add Item" click handler
  — never during render, so there's no `Math.random()`/`Date.now()` /
  `crypto.randomUUID()` hydration-mismatch risk.

## Reusable components/utilities used

`FormField`, `GST_RATES` (from `lib/tools/gstCalculator.ts`), `formatInr`,
`useLocalStorageState`. Print support added to the shared `ToolLayout`
and `CTASection`.

## Future improvements

- Logo upload in the invoice header.
- Multiple saved invoices (currently only the most recent draft persists).
