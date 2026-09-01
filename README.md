# Phrase Practice

A tiny flashcard app for practicing the Spanish (San Sebastián) and Portuguese
(Portugal) phrases from `Spain_Portugal_Phrase_Guide.md`, built for phone use
before/during the trip. No backend, no API keys — everything runs in the
browser.

## Features

- **Flashcards in both directions** — term → English or English → term —
  filterable by language and by section (Basics, Coffee, Getting Around,
  Ordering, Money, Social, Numbers).
- **Click to hear it pronounced** via the browser's built-in text-to-speech
  (`SpeechSynthesis`), using a Spanish/Portuguese voice when the device has
  one installed.
- **Say it back** — record yourself with 🎤 and play it back right after the
  native pronunciation to compare by ear. Works on iPhone Safari and desktop
  Chrome alike.
- On browsers that support live speech recognition (currently Chrome/Android/
  desktop — not iOS Safari), it also shows a rough "did that sound close"
  auto-check next to what it heard you say. This is a proxy based on speech-
  to-text matching, not real pronunciation scoring — treat it as a bonus
  signal, not a verdict.
- **Self-paced review** — "Knew it" / "Didn't know it" on each card. Missed
  cards resurface later in the same session and are prioritized first next
  time you study. Progress is stored locally in the browser (`localStorage`)
  — nothing leaves your device.

## Running locally

No build step. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which publishes the site
on every push to `main`. One-time setup:

1. On GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` — the workflow will build and publish automatically.
   The Pages URL will show up in the workflow run summary and in
   **Settings → Pages**.

## Updating the phrase list

All the phrase data lives in `data.js` as plain JS objects, grouped by
language → section → cards. Add, edit, or remove entries there; the app
picks up any change automatically, no other file needs to change.

## Notes on the "say it back" feature

- Recording requires microphone permission and works over HTTPS (GitHub
  Pages) or `localhost`.
- Speech recognition compare uses the Web Speech API, which is not supported
  in Safari on iOS as of this writing — the record-and-playback flow still
  works there, just without the auto "close match" badge.
