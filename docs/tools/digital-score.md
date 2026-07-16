# Digital Presence Score

`/tools/digital-score`

## Purpose

A 10-question yes/no checkup (website, Google Business, socials, SEO,
reviews, analytics, online payments) scored out of 100, with a specific,
static recommendation surfaced for every "no" answer — not generic
copy, and not an LLM call ("no fake AI"): a deterministic lookup table.

## Architecture

- `lib/tools/digitalScore.ts` — `DIGITAL_SCORE_QUESTIONS` (each with its
  own `recommendation` string) and `calculateDigitalScore()`, which is
  `yesCount / 10 × 100`, banded into Excellent (≥80) / Average (≥50) /
  Needs Improvement (<50).
- `DigitalScoreClient.tsx` — each question is a `.gx-toggle-chip` (same
  interaction pattern as the Website Cost Calculator's feature toggles),
  live-updating a `ScoreCircle` and the recommendation list, which is
  simply every unchecked question's `recommendation` string.

## Reusable components/utilities used

`ScoreCircle` (shared with Business Readiness Score), `useLocalStorageState`.

## Future improvements

- `ProgressBar`-driven step-by-step flow if user testing shows the
  all-at-once toggle grid is overwhelming (not built yet — no evidence
  it's needed, and the Cost Calculator's identical pattern already works
  well for a similar number of inputs).
- Track `Tool Completed` once all 10 questions have been touched at
  least once.
