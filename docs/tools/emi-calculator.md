# EMI Calculator

`/tools/emi-calculator`

## Purpose

Standard loan EMI (equated monthly instalment) calculator — loan amount,
interest rate, tenure in, monthly payment and total interest out.

## Architecture

- `lib/tools/emiCalculator.ts` — `calculateEmi()` uses the standard
  reducing-balance formula `EMI = P × r × (1+r)^n / ((1+r)^n − 1)` where
  `r` is the *monthly* rate (`annualRate / 12 / 100`) and `n` is the
  tenure in months. Handles the `r = 0` edge case (interest-free loan)
  separately to avoid a `0/0` division.
- `EmiCalculatorClient.tsx` — three `useNumberField`-backed inputs (Loan
  Amount, Interest Rate, Tenure), live results, and a `BarChart` (shared
  with ROI Calculator) comparing total principal vs. total interest paid.

## Reusable components/utilities used

`useNumberField`, `useLocalStorageState`, `FormField`, `ResultCard`,
`BarChart`, `formatInr`.

## Future improvements

- A month-by-month amortization table (principal vs. interest split per
  month) if requested — the current chart shows the totals, not the
  schedule.
