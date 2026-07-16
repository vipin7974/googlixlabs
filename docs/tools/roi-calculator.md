# Website ROI Calculator

`/tools/roi-calculator`

## Purpose

Translate an abstract "grow your website" pitch into a concrete number:
if a visitor's monthly customers or order value grew by X%, what does
that mean in rupees this month and this year?

## Architecture

- `lib/tools/roiCalculator.ts` — `calculateRoi()`. Deliberately models the
  growth % as a **sustained one-time uplift** to current monthly revenue
  (not compounding month-over-month), because compounding would need
  retention/churn assumptions this tool doesn't collect — modeling it
  that way would overstate precision. The 12-month breakdown is a plain
  cumulative sum of the flat monthly increase.
- `RoiCalculatorClient.tsx` — three fields via the shared `useNumberField`
  hook (Monthly Customers, Average Order Value, Expected Growth %), live
  results, and a `BarChart` (shared component, also used by EMI
  Calculator) showing the 12-month cumulative gain.

## Reusable components/utilities used

`useNumberField`, `useLocalStorageState`, `FormField`, `ResultCard`,
`BarChart`, `formatInr`/`formatNumber` (`lib/tools/format.ts`).

## Future improvements

- Once analytics exists: track `Tool Completed` when growth % is changed
  from the default.
- Consider an optional "current ad spend" field to show a rough ROI
  ratio, not just an absolute revenue increase.
