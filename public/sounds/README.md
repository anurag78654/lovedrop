# Sounds Directory

## ✅ All sound files in place (processed Sept 26, 2026)

| File | Duration | Notes |
|------|----------|-------|
| `open-envelope.mp3` | 3.5s | trimmed from 30s |
| `chime.mp3` | 4.0s | trimmed from 27s |
| `party.mp3` | 4.0s | trimmed from 21s, was clipping (0 dB → -8 dB) |
| `confetti.mp3` | 3.5s | trimmed + normalized |
| `pop.mp3` | 3.0s | trimmed from 6.5s |
| `click.mp3` | 1.1s | normalized |
| `heart-pop.mp3` | 1.1s | normalized |
| `scratch.mp3` | 1.1s | normalized (was loud) |
| `flip.mp3` | 0.6s | normalized |
| `lofi-background.mp3` | 18.6s | kept (background loop, stays quiet) |

**Processing:** all normalized to -18 LUFS target, peak-limited below 0 dB (no clipping), trimmed with fade-outs.
**Originals backed up** outside the repo (session `/tmp/lovedrop-sounds-backup`).

Playback volume is further controlled per-sound in `src/hooks/useSound.js` (30–50%), and users can toggle sounds off entirely in the app.
