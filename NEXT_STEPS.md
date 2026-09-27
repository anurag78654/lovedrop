# LoveDrop - Remaining Tasks & Action Plan

**Last updated:** September 26, 2026
**Current status:** Core app built, 157/157 tests passing, build works

---

## ✅ What's DONE

| # | Task | Status |
|---|------|--------|
| 1 | Project setup (Vite + React + Tailwind) | ✅ |
| 2 | Landing page + routing (4 pages) | ✅ |
| 3 | Letter creation wizard (3 steps) | ✅ |
| 4 | Envelope animation + 3 themes | ✅ |
| 5 | Effects: hearts, confetti, flip cards, scratch cards | ✅ |
| 6 | Mini games: TicTacToe + MemoryMatch | ✅ |
| 7 | Letter line alignment fix | ✅ |
| 8 | Sound hook (useSound - ready for files) | ✅ |
| 9 | White box + black box testing (157 tests, 86% coverage) | ✅ |
| 10 | Test report with future improvements | ✅ |

---

## 📋 REMAINING TASKS (in order we'll proceed)

### Phase A: Quick Wins ✅ DONE (Sept 26, 2026)

#### A1. 404 Page ✅
- Created `src/pages/NotFound.jsx` with "letter got lost in mail" design
- Added catch-all route `<Route path="*">` in App.jsx
- 3 new tests added

#### A2. Error Boundary ✅
- Created `src/components/ErrorBoundary.jsx` (friendly crash page + technical details + reset)
- Wrapped all routes in App.jsx
- 8 new tests added

#### A3. CI Pipeline ✅
- Created `.github/workflows/test.yml`
- Runs tests + build on every push/PR using Node 20
- Activates automatically on first GitHub push

---

### Phase B: Real Backend (needed for public launch) — ✅ DONE (Sept 26, 2026)

#### B1. Supabase Setup ✅ DONE
- **Result:** Real share links work across devices. Table `letters` created, `.env` configured (git-ignored), REST integration tested (SELECT 200 / INSERT 201), live end-to-end test passed.
- **Fixed along the way:** supabase-js crashed Node 18 when client init failed → `src/lib/supabase.js` now try/catch falls back to localStorage.
- **SQL file:** `supabase-setup.sql` (safe to re-run anytime — resets table)

#### B2. Rate Limiting ✅ DONE
- **Result:** 10 letters/day/browser + 15s cooldown between creates.
- **Files:** `src/lib/rateLimit.js` (logic), wired into `src/store/letterStore.js`, live countdown button in `src/pages/Create.jsx`.
- **Tests:** 14 new (total now **181 passing**).
- **Known limit:** client-side only — determined bots can bypass; Cloudflare Worker edge rules can be added later if needed.

---

### Phase C: Missing Features (promised in original plan)

#### C1. Sound Files ✅ DONE (Sept 26, 2026)
- **Result:** All 10 sounds in `public/sounds/` (9 SFX + lofi background). Long ones trimmed (30s→3.5s etc.), loudness normalized to −18 LUFS, no clipping. Originals backed up, README updated.

#### C2. Collaborative Group Cards
- **What:** Multiple people sign one letter (like GroupGreeting)
- **How:**
  1. New table `signatures` in Supabase: `id, letter_id, name, message, created_at`
  2. New page `/sign/:shortId` - form to add your signature
  3. Add Supabase realtime subscription so card updates live
  4. LetterViewer shows signatures section for group letters
- **Effort:** ~3-4 hours

#### C3. Music Sync (Lofi Background Track)
- **What:** Toggleable background music in letters
- **How:**
  1. Download 1 royalty-free lofi track (see sound sources below)
  2. Place at `public/sounds/lofi-background.mp3`
  3. Extend `useSound.js`: add `playBackground()/pauseBackground()` using Howler loop
  4. LetterViewer: if `letter.music_enabled`, start loop on envelope open, stop on unmount
  5. Add floating music toggle button (🔇/🔊)
- **Effort:** ~1-2 hours

#### C4. Schedule Notifications ("Open When" letters)
- **What:** Letter can only be opened on a specific date (birthday, anniversary)
- **How (simplest approach - no server needed):**
  1. Add `unlock_date` column to letters table (in Create step 2, optional date picker)
  2. In `useLetter.js`: if `unlock_date` is in future → show "locked" envelope with countdown timer
  3. Bonus: Web Notifications API - ask permission, store in localStorage, use `setTimeout` while page open (limited - only works if tab is open)
  4. Real scheduled emails later need a server (Supabase Edge Function + cron) - defer to later
- **Effort:** 2 hours (countdown lock) / 4+ hours (with email notifications)

---

### Phase D: Deployment (make it public)

#### D1. GitHub Repository
- **What:** Push code to GitHub (repo name: **`lovedrop`**)
- **How:**
  ```bash
  cd /mnt/ollama_storage/Lettergift-website
  git init
  git add .
  git commit -m "LoveDrop v1 - virtual letter website"
  gh repo create lovedrop --public --source=. --push
  # OR manually: create repo on github.com, then:
  # git remote add origin https://github.com/YOUR_USERNAME/lovedrop.git
  # git push -u origin main
  ```
- **Effort:** ~10 minutes
- **Note:** `.env` is already in `.gitignore` (keys never pushed - good!)

#### D2. Cloudflare Pages Deployment
- **What:** Free hosting at `lovedrop.pages.dev`
- **How:**
  1. Sign up https://dash.cloudflare.com (free)
  2. **Workers & Pages → Create → Pages → Connect to Git**
  3. Pick `lovedrop` repo → Framework preset: **Vite**
  4. Build command: `npm run build` → Output dir: `dist`
  5. **Environment Variables** (same as .env):
     - `VITE_SUPABASE_URL` = ...
     - `VITE_SUPABASE_ANON_KEY` = ...
  6. Deploy → site live at `lovedrop.pages.dev` in ~1 minute
  7. Every `git push` auto-redeploys
- **Effort:** ~15 minutes
- **Cost:** Free (unlimited bandwidth!)
- **Allowed:** Yes, commercial use allowed on free tier

#### D3. Custom Domain (optional, later)
- Buy `.com` (~$8/yr from Namecheap/IONOS) → add to Cloudflare Pages → change nameservers

---

### Phase E: Polish (post-launch)

| Task | How | Effort |
|------|-----|--------|
| Accessibility audit | Check color contrast, add aria-labels, test with screen reader | Medium |
| OG meta tags for shared links | Dynamic `<meta>` via small script reading letter on load | Small |
| Bundle code-splitting | `React.lazy()` for games/effects → faster first load | Small |
| Letter expiration (TTL) | Supabase cron deletes letters older than 90 days | Small |
| Visual regression tests | Playwright screenshots compared per PR | Medium |
| Dark mode | Tailwind `dark:` variants + toggle | Medium |
| Remove/Use `Card.jsx` | It's built but unused - either use it or delete | Trivial |

---

## 🔊 SOUND FILES - Complete Guide

### Current status
- ✅ `useSound.js` hook is **built and ready** - plays sounds by name
- ✅ Sound **toggles work** in the letter editor
- ⚠️ **No actual `.mp3` files yet** - app silently skips missing sounds (won't crash)
- 📄 Full list documented in `public/sounds/README.md`

### Files needed (place in `public/sounds/`)

| File name | When it plays | Duration |
|-----------|--------------|----------|
| `open-envelope.mp3` | Envelope opens | ~1 sec |
| `confetti.mp3` | Confetti burst | ~1 sec |
| `heart-pop.mp3` | Heart decoration tap | ~0.3 sec |
| `chime.mp3` | Romantic letter opens | ~1 sec |
| `party.mp3` | Birthday letter opens | ~1 sec |
| `pop.mp3` | Friendship letter opens | ~0.3 sec |
| `scratch.mp3` | Scratch card interaction | ~1 sec |
| `flip.mp3` | Flip card flip | ~0.3 sec |
| `click.mp3` | Button clicks | ~0.1 sec |
| `lofi-background.mp3` | Background music (C3 task) | 1-3 min, loop |

### 🆓 Where to get them FREE (no copyright issues)

| Source | Best for | License | Link |
|--------|----------|---------|------|
| **Pixabay** | Music + SFX, no attribution needed | Pixabay License (free commercial) | pixabay.com/sound-effects/ |
| **Mixkit** | Clean UI sound effects | Mixkit License (free) | mixkit.co/free-sound-effects/ |
| **Freesound** | Huge variety | ⚠️ Check each item (CC0 or CC-BY) | freesound.org |
| **Sonniss GDC** | Professional game SFX bundles | Royalty-free forever | sonniss.com/game-audio-gdc-bundle |
| **Freesound "UI" search** | Button clicks, pops | Filter by CC0 | freesound.org/search/?q=ui+click |

**⚠️ Avoid:** YouTube audio library (personal use only), random Google downloads (copyright risk)

### 📥 Step-by-step: Add your first sounds

1. Go to **pixabay.com/sound-effects/** (easiest, no attribution needed)
2. Search each term and download (MP3, small size):
   - Search: `envelope open`, `confetti pop`, `party horn`, `chime`, `pop`, `click ui`, `scratch card`
3. Rename exactly as in the table above (case-sensitive!)
4. Put them in `public/sounds/`
5. Optional: compress with https://cloudconvert.com (keep each file under 100 KB)
6. Run `npm run dev` → create a letter → test sound toggle 🔊

**Tip:** Start with just 4 files: `open-envelope.mp3`, `chime.mp3`, `party.mp3`, `click.mp3` - covers the main experience.

---

## 🎯 RECOMMENDED ACTION ORDER (what YOU should do)

### ✅ Done so far
- Phase A (404, ErrorBoundary, CI) ✅
- Phase B (Supabase + rate limiting) ✅ — 181/181 tests passing

### Next up
1. ~~**C1** - Sound files~~ ✅ DONE
2. **D1** - Create GitHub repo + push (I can run the commands for you)
3. **D2** - Deploy to Cloudflare Pages (~15 min, guide above)

### After launch
4. **C3** - Music sync
5. **C4** - Scheduled "open on date" letters
6. **C2** - Group cards
7. **Phase E** - Polish items

---

## 💰 Cost Tracker

| Item | Cost |
|------|------|
| Everything so far | $0 |
| Supabase | $0 (free tier) |
| Cloudflare Pages | $0 (free tier) |
| GitHub | $0 |
| Sound files (Pixabay/Mixkit) | $0 |
| Domain (later, optional) | ~$8/year |
| **Total to launch** | **$0** |

---

## ❓ Decisions Needed From You

| Question | Options | My recommendation |
|----------|---------|-------------------|
| Start Phase A (404 + error boundary)? | Yes / later | Yes - quick wins |
| Which sounds first? | Full set / minimal 4 | Minimal 4 to start |
| Supabase now or after deploy? | Now / later | Now - core feature |
| Public or private GitHub repo? | Public / Private | Public (looks good in portfolio) |

**Just tell me which task to start and I'll ask before making any changes, as agreed.**
