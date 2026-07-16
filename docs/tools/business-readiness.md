# Business Readiness Score

`/tools/business-readiness`

## Purpose

A "growth readiness" score from business age, team size and monthly
revenue — with a recommendation that also factors in industry and
competition level, without pretending those two have an objectively
"correct" value to score against.

## Architecture

- `lib/tools/businessReadiness.ts` — `calculateBusinessReadiness()`.
  Only Business Age, Employees, and Monthly Revenue contribute score
  points (20 each, out of 60, scaled to 100) — Industry and Competition
  deliberately score zero points and only shape the recommendation's
  wording, since there's no "better" industry to reward or penalize.
- `BusinessReadinessClient.tsx` — five `<select>` fields, live `ScoreCircle`
  + recommendation paragraph.

## Reusable components/utilities used

`ScoreCircle` (shared with Digital Presence Score), `FormField`,
`useLocalStorageState`.

## Future improvements

- Track `Tool Completed` once every field has been changed from its
  default at least once.
- Consider surfacing a specific next tool to try based on the band
  (e.g. "Needs Improvement" → link to the Website Cost Calculator).
