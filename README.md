# LoveDrop 💕

Send beautiful virtual letters to your loved ones with animations, effects, and music.

**Live site:** `lovedrop.pages.dev`

## Features

- 💌 Create letters for any occasion (Valentine, Birthday, Friendship)
- 🎭 3 themed experiences: Romantic, Birthday, Friendship
- ✉️ Animated envelope opening
- 🎉 Confetti bursts, floating hearts, flip cards, scratch-to-reveal
- 🎮 Mini couple/friendship games
- 👥 Collaborative group cards
- 🔗 Shareable unique links
- 📱 Fully responsive
- 🔔 Schedule notifications
- 🎵 Sound effects & lofi music

## Tech Stack

- **Frontend:** React + JavaScript + Tailwind CSS
- **Animations:** Framer Motion, particyles, canvas-confetti
- **Backend:** Supabase (free tier)
- **Hosting:** Cloudflare Pages (free tier)

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Fill in your Supabase keys in .env

# Start dev server
npm run dev
```

## Deployment

1. Push to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables
6. Deploy!

## License

MIT
