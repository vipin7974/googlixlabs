# QR Code Generator

`/tools/qr-generator`

## Purpose

Generate a scannable QR code for a website, a WhatsApp chat link, or a
Google review link, and download it as a PNG.

## Architecture — the one deliberate dependency in this whole system

Every other tool in `/tools` is built with zero new dependencies. QR
encoding is the one deliberate exception: it requires Reed-Solomon error
correction, mask-pattern selection, and precise module placement per the
QR spec. Hand-rolling that from memory risks a code that *looks* right
but doesn't scan — a real, hard-to-catch functional bug, exactly the
kind explicitly flagged as unacceptable. Instead this tool uses
[`qrcode`](https://www.npmjs.com/package/qrcode) (MIT, ~30M downloads/week,
zero UI/CSS footprint — it only produces PNG data URLs, nothing that
touches the design system).

- `lib/tools/qrGenerator.ts` — `isLikelyUrl()` / `normalizeUrl()`, small
  URL validation/formatting helpers shared by the Website and Google
  Review QR types.
- `QrGeneratorClient.tsx` — a type switch (Website / WhatsApp / Google
  Review) resolves to a single `value: string` to encode.
  **The WhatsApp QR type reuses `buildWhatsAppLink()` from
  `lib/tools/whatsapp.ts` directly** — the exact same validated link the
  WhatsApp Link Generator tool produces, not a re-implementation.
  `QRCode.toDataURL()` renders the PNG (in the site's ink/paper colors,
  not default black/white) as a base64 data URL, which is used directly
  as both the on-screen preview (`next/image` with `unoptimized`, since
  it's a data URL, not a static asset) and the download — one artifact,
  not a canvas render plus a separate export path that could disagree.

## Reusable components/utilities used

`FormField`, `useLocalStorageState`, `buildWhatsAppLink` (from the
WhatsApp Link Generator tool).

## Future improvements

- A "turn this into a QR code" link from the WhatsApp Link Generator's
  result panel directly into this tool, prefilled.
- Logo-in-center QR codes, if requested (the `qrcode` library doesn't
  support this out of the box; would need canvas compositing on top of
  its output).
