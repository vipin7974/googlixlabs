# GST Calculator

`/tools/gst-calculator`

## Purpose

Add or remove GST from an amount, correctly — the "remove GST" direction
is the one people get wrong (subtracting `rate%` of the total instead of
back-calculating the pre-tax base), so it's worth documenting explicitly.

## Architecture

- `lib/tools/gstCalculator.ts` — `calculateGst(amount, rate, mode)`.
  - `mode: "add"`: `gst = amount × rate / 100`, `total = amount + gst`.
  - `mode: "remove"`: `amount` is treated as GST-**inclusive**; the base
    price is `amount × 100 / (100 + rate)` — **not**
    `amount × (1 - rate/100)`, which under-subtracts and is the single
    most common GST-removal bug. Documented inline in the source as a
    guard against reintroducing it.
- `GstCalculatorClient.tsx` — a 2-way mode toggle (Add/Remove) plus the
  four standard Indian GST slabs (5/12/18/28%) as toggle chips, live results.

## Reusable components/utilities used

`useNumberField`, `useLocalStorageState`, `FormField`, `ResultCard`, `formatInr`.

## Future improvements

- A custom/non-standard rate input alongside the four standard slabs, if
  a real user ever needs one (not added speculatively).
