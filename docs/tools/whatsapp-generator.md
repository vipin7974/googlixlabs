# WhatsApp Link Generator

`/tools/whatsapp-generator`

## Purpose

Turn a phone number and an optional pre-filled message into a one-tap
`wa.me` link — useful for a bio link, an ad, an invoice footer, or a
QR code (feeds directly into the future QR Generator tool).

## Architecture

- `lib/tools/whatsapp.ts` — `buildWhatsAppLink(phone, message)`. Accepts a
  bare 10-digit Indian number (assumes `+91`) or any number already
  including a country code; returns a discriminated union
  (`{ ok: true, url, displayPhone }` or `{ ok: false, error }`) so the UI
  can't accidentally render a broken link — invalid input is a typed
  error, not a silently-wrong URL. The message is encoded via
  `URL`/`URLSearchParams`, which is what `wa.me` actually expects.
- `app/tools/whatsapp-generator/page.tsx` — metadata, canonical URL,
  OpenGraph/Twitter tags, `WebApplication` JSON-LD, wraps the client
  component in `ToolLayout`.
- `app/tools/whatsapp-generator/WhatsAppGeneratorClient.tsx` — form +
  generate step + result panel.

## Behaviour

- Deliberately a two-step flow (fill in → **Generate Link**), matching
  how the tool is actually used (you don't want a half-typed phone number
  turning into a link yet). Editing either field after generating clears
  the previous result rather than leaving a stale link on screen that no
  longer matches the form.
- Empty state: before the first successful generation, a dashed
  placeholder panel reads "Your WhatsApp link will appear here" instead
  of empty space.
- Copy button gives inline "Copied!" feedback (falls back gracefully if
  the Clipboard API is unavailable — the link is still visible and
  selectable). Open button launches the real `wa.me` link in a new tab.
- Phone and message persist through `useLocalStorageState`.

## Reusable components used

`ToolLayout`, `FormField`, `.gx-tool-input`, `.gx-result-card`, the shared
`.gx-nav-cta` button style.

## Future improvements

- Once the QR Generator tool exists, offer "Turn this into a QR code"
  directly from the generated result.
- Track `Tool Completed` on successful generation and `Button Clicked`
  for Copy/Open, once an analytics provider is wired up.
