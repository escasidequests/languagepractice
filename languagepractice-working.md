# Project: Phrase Practice (languagepractice)

## North Star

A flashcard/practice web app for a Spain (San Sebastián) & Portugal trip, built
from a phrase guide the user supplied. No backend, no API keys — the user has
no external AI API budget beyond their Claude Pro account, so everything runs
client-side in the browser, hosted free on GitHub Pages.

## Scope

**In scope:**
- Flashcards in both directions (term↔English), filterable by language/section
- Click-to-hear pronunciation via the browser's built-in `SpeechSynthesis`
- "Say it back": record + playback comparison (universal), plus an optional
  Chrome-only speech-recognition "rough match" bonus check
- Numbers Trainer: full 0–9,999 coverage (not just the guide's sample words),
  Learn mode (see+hear) and Quiz mode (hear+type, scored)
- Browse screen: full word list per language/section, search, tap-to-hear,
  Term-first/English-first toggle
- User-added custom words — merge into the training deck (flashcards, Browse,
  section filters), full audio support
- Saved Sentences — a *separate* personal phrasebook (native+English pairs),
  deliberately NOT part of the training deck/Browse
- Swipe-to-delete (+ tap-to-delete fallback) on both user-content lists
- Voice picker per language (pick/test/remember which installed voice to use)
- Deploy version badge (top-right), stamped by the GitHub Actions workflow
- Export/Import backup of all localStorage data (one JSON file)

**Explicitly out of scope (decided, with reasons — see Decisions Log):**
- Real auto-translation
- Password/access control
- Cross-device sync between the user and their partner

## Checklist

- [x] Transcribe phrase guide → `data.js` (ES/PT, 7 sections each + numbers)
- [x] Core flashcard app (`index.html`/`app.js`/`style.css`)
- [x] TTS pronunciation + record/playback + optional recognition-match badge
- [x] GitHub Pages deploy workflow, debugged end-to-end (see Decisions Log)
- [x] Numbers Trainer (`numbers.js` generator + Learn/Quiz screens)
- [x] Voice picker + diagnostics
- [x] Browse (full word list) screen
- [x] Deploy version badge
- [x] Add-a-word screen (merges into training)
- [x] Saved Sentences screen (separate from training)
- [x] Swipe-to-delete shared component
- [x] Export/Import backup
- [ ] Nothing currently in progress — see latest dated handoff for next steps

## Decisions Log

- **No backend, no translation/scoring APIs.** User has no external AI API
  budget. Only the browser's own Web Speech API is used (free, but voice
  quality/availability varies by device — see iOS notes below).
- **Record-and-playback, not recognition-based scoring, is the primary
  "say it back" method.** iOS Safari doesn't support `SpeechRecognition` at
  all, so a recognition-only design would silently not work on the user's
  main device. Recognition-match is kept as a Chrome-only bonus, clearly
  labeled as a rough proxy, not real phonetic feedback.
- **Data lives in `data.js` as plain JS, not a database.** Appropriate for
  ~180 static, rarely-edited, read-only, single-user entries on a static
  host. Revisit only if the project grows multi-user, shared-write, or much
  larger in scale.
- **No auto-translation feature.** Would require a paid translation API and
  a backend proxy (to avoid exposing the key client-side) — a real
  infrastructure jump beyond "static GitHub Pages site." Built manual
  "Add a word" entry instead; the user looks up a translation themselves and
  types both sides in.
- **No password/access-control gate.** All app data lives in `localStorage`,
  per-device, never shared or at risk from other visitors — a password
  wouldn't protect anything that isn't already private. A genuine client-side
  password also isn't real security (visible in page source). Revisit only if
  the user wants actual access control (would need Cloudflare Access + a
  custom domain) or cross-device sync (would need a real backend either way).
- **Repo default branch had to be switched to `main` post-hoc.** The repo
  started empty; `claude/language-flashcard-app-4wq9y0` was pushed first and
  became the default branch automatically. GitHub's auto-created
  `github-pages` deploy environment defaulted its branch-protection rule to
  that branch. Fixed by (a) changing the repo's default branch to `main` in
  Settings → General, and (b) removing the stale environment protection rule
  in Settings → Environments → github-pages (had to be done manually in the
  GitHub UI — not available via the GitHub MCP tools used this session).
- **Numbers Trainer generates number words algorithmically**, not just from
  the guide's sample list — `numbers.js` implements real ES/PT cardinal
  number rules (cien vs ciento, quinientos, Portuguese's extra "e" connector
  logic, dezasseis/dezanove, etc.), verified against ~40 hand-picked tricky
  values including the guide's own "154 = ciento cincuenta y cuatro / cento e
  cinquenta e quatro" example.

## Narrative Log

- **2026-09-01** — Built the entire app in one long session: workshopped
  scope/architecture up front, then built the core flashcard app, debugged
  GitHub Pages deploy end-to-end (Pages source setting + environment branch
  protection), built the full Numbers Trainer, added a voice picker (with
  real hands-on iOS voice-exposure troubleshooting alongside the user — see
  Open Questions), added the Browse screen, added user-added words and a
  separate saved-sentences phrasebook with swipe-to-delete, added
  export/import backup, and talked through (but declined, for now) a
  password/access-control gate. Session ends with this handoff.

## Open Questions / Flags

- **iOS Safari voice exposure is unresolved and may be unfixable.** The user
  downloaded "Marisol" (a Spanish voice) via iPhone Settings → Accessibility
  → Read & Speak → Voices; it never appeared in the app's raw
  `speechSynthesis.getVoices()` dump, even after fully closing Safari and a
  full device power-cycle. A different downloaded voice (Joana, pt-PT) *did*
  appear fine, so it's not a blanket "downloaded voices never show up" rule —
  root cause undetermined. Not blocking: the user is proceeding with Mónica
  (es-ES), which is actually the geographically correct Castilian accent for
  their trip anyway (as opposed to the Mexican Spanish accent they're more
  used to hearing day-to-day).
- **No cross-device sync.** The user and their partner will each build up
  separate, unsynced word/sentence lists on their own devices (localStorage
  is per-browser/per-device). Flagged to the user; not acted on. Would need
  real backend infrastructure to fix, same as real access control would.

## Standing Conventions

- **Repo:** `escasidequests/languagepractice` on GitHub.
- **Dev branch:** `claude/language-flashcard-app-4wq9y0` — all work happens
  here first (per branch instructions).
- **After every change:** commit + push to the dev branch, then
  fast-forward-merge into `main` and push `main` too, since GitHub Pages
  deploys from `main`. Keep both in sync — don't let `main` fall behind.
  Never force-push or rebase shared history.
- **Zero build step, zero dependencies.** Plain HTML/CSS/JS:
  `index.html`, `style.css`, `app.js`, `data.js`, `numbers.js`.
- **All persistence via `localStorage`**, no backend. Keys in use:
  `phrasePractice.stats.v1`, `phrasePractice.customWords.v1`,
  `phrasePractice.sentences.v1`, `phrasePractice.voicePref.v1`.
- **Test discipline:** after any JS/HTML change, run `node --check` on
  modified JS, then a headless Playwright smoke test of the actual user flow
  before shipping (Chromium is pre-installed at `/opt/pw-browsers/chromium`;
  `NODE_PATH=/opt/node22/lib/node_modules` to find the `playwright` package).
  This caught two real bugs this session:
  1. Native HTML5 `pattern`/`required` constraint validation silently
     blocking the `submit` event before any JS could run — fixed with
     `novalidate` on the affected forms (numbers-quiz answer form, add-word
     form, sentence form). If you add another `<form>`, add `novalidate` and
     do your own JS-side validation, or you'll hit this again.
  2. A dropped closing brace from a careless edit — caught immediately by
     `node --check`, which is why that's step one after every JS edit.
- **Deploy workflow** (`.github/workflows/deploy.yml`) stamps a version badge
  into `index.html` at deploy time via `sed`, replacing the literal
  placeholder strings `local` / `Local build (not deployed)` with
  `#<run number> · <short sha>` / a full deploy-date tooltip. Don't rename
  those default placeholder strings without updating the workflow's `sed`
  patterns to match, or the stamping silently no-ops.
- **User's primary device is an iPhone (Safari)**, with occasional desktop
  Chrome testing. UI/UX decisions have been made around iOS Safari's real
  constraints throughout (no `SpeechRecognition` support, TTS voice-exposure
  limitations, native form-validation quirks — see above).
- **Live site:** https://escasidequests.github.io/languagepractice/
