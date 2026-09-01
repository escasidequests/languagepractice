# Handoff — 2026-09-01

## What was done this session

Built the Phrase Practice app from scratch, end to end, in a single session:
the core flashcard app (data transcribed from the user's phrase guide),
GitHub Pages deployment (with real troubleshooting of Pages config and a
stale environment branch-protection rule), a full Numbers Trainer covering
0–9,999 with an original ES/PT number-word generator, a per-language voice
picker (plus hands-on iOS voice-exposure troubleshooting with the user,
unresolved but not blocking), a Browse/reference screen, user-added custom
words that merge into training, a separate saved-sentences phrasebook with
swipe-to-delete, and an export/import backup system for all local data. Also
discussed (but declined, for now) adding password/access control, since all
app data is local-only per device and nothing is actually at risk.

## Current state of key artifacts

- **Repo:** `escasidequests/languagepractice`
- **Branches in sync:** `main` and `claude/language-flashcard-app-4wq9y0`,
  both at commit `b709420` ("Add export/import backup for added words,
  sentences, stats, and voice prefs")
- **Live site:** https://escasidequests.github.io/languagepractice/
- **Latest deploy:** GitHub Actions run #8, commit `b709420`, **succeeded**
  (verified via the Actions API this session, not just assumed)
- **Files:** `index.html`, `style.css`, `app.js`, `data.js`, `numbers.js`,
  `.github/workflows/deploy.yml`, `README.md`,
  `Spain_Portugal_Phrase_Guide.md` (the original uploaded doc, committed
  alongside the app)
- No uncommitted local changes; working tree clean at session end.

## Outstanding open items

- iOS Safari not exposing the user's downloaded "Marisol" voice — see the
  persistent narrative's Open Questions for full detail. Not blocking;
  user is using Mónica (es-ES) in the meantime, which is actually the
  geographically correct accent for the trip.
- No cross-device sync between the user and their partner (each device's
  added words/sentences stay separate). Flagged, not acted on.
- No password/access control (deliberate, see Decisions Log).

## Recommended next action

No specific next task was queued at session close — the app is feature-complete
against everything requested so far and deployed successfully. On session
open, confirm with the user whether they want to:
1. Keep iterating on features (e.g., revisit the iOS voice issue if they've
   learned anything new, or add something new), or
2. Just verify/polish before the trip (e.g., a live run-through on the
   user's actual phone).

Don't assume either — ask.
