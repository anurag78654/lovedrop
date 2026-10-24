/**
 * Landing page content (SEO-3, Wave 1).
 * Each entry powers a marketing page at /<slug> via src/pages/Landing.jsx.
 * Keeping copy in data (not JSX) makes pages easy to edit/extend long-term.
 */
export const landingPages = {
  'long-distance': {
    slug: 'long-distance',
    metaTitle: 'Letters for Long Distance Relationships | LoveDrop',
    metaDescription:
      'Send a beautiful online letter to your long-distance partner. Add music, schedule it to unlock on a special date — free and no sign-up needed.',
    eyebrow: 'Long distance love',
    h1: 'Letters for Long Distance Relationships',
    intro: [
      'Missing someone is easier when words arrive by surprise. LoveDrop lets you write a beautiful letter, wrap it in an animated envelope, and send a single link your partner can open anywhere — no stamps, no waiting for the post.',
      'Add a song that reminds you of them, decorate the page with hearts, or schedule the letter to unlock on an anniversary or the day you finally meet again. It takes about two minutes, and it is completely free.',
    ],
    highlights: [
      {
        icon: '🎵',
        title: 'Add your song',
        text: 'Music starts softly as the envelope opens — a small detail that makes distance feel shorter.',
      },
      {
        icon: '⏰',
        title: 'Unlock on a special date',
        text: 'Write now, deliver later. The letter stays sealed until the moment you choose.',
      },
      {
        icon: '🔗',
        title: 'One link, any device',
        text: 'No app to install. Your partner opens it on their phone, wherever they are.',
      },
    ],
    ideasTitle: 'What to write when you are far apart',
    ideas: [
      'Describe an ordinary day and the one moment you wished they were there.',
      'List the first five things you will do together when you meet again.',
      'Write about a memory only the two of you understand.',
      'Tell them what song you have been playing on repeat.',
      'Reassure them on a hard day — distance is temporary, the feeling is not.',
      'Number your letters ("Open when you miss me") so they keep one for later.',
    ],
    faqs: [
      {
        q: 'Is LoveDrop free for long-distance letters?',
        a: 'Yes. Creating and sending a letter is completely free and requires no account. Just write, share the link, and your partner can open it instantly.',
      },
      {
        q: 'Can I schedule a letter to open on a specific date?',
        a: 'Yes. When creating a letter you can pick an unlock date and time. Until then, your partner sees a sealed envelope instead of the message.',
      },
      {
        q: 'Can I add music to the letter?',
        a: 'Yes — choose from romantic, calm, and playful soundtracks. The music begins when the envelope is opened and can be muted by the reader.',
      },
      {
        q: 'Does my partner need an app or account?',
        a: 'No. The letter is a normal web link that works in any browser on any device, including phones and tablets.',
      },
    ],
    related: ['open-when', 'letter-with-music', 'anonymous-letter'],
  },

  'letter-with-music': {
    slug: 'letter-with-music',
    metaTitle: 'Send a Letter With Music — Free Online | LoveDrop',
    metaDescription:
      'Create a free online letter with music. Pick a soundtrack, write your message, and send a link that opens with an animated envelope and your song.',
    eyebrow: 'Words + music',
    h1: 'Send a Letter With Music',
    intro: [
      'Some feelings need a soundtrack. LoveDrop lets you attach music to a letter, so when your person opens the envelope, a song starts playing softly underneath your words.',
      'Choose from romantic, calm, or playful tracks, write your message, and share one link. No sign-up, no app, no cost — just a moment they will remember every time they hear that song.',
    ],
    highlights: [
      {
        icon: '💌',
        title: 'Set the mood',
        text: 'The music fades in as the envelope opens, then loops gently while they read.',
      },
      {
        icon: '🔇',
        title: 'Reader friendly',
        text: 'A small speaker button lets them mute the music at any time — always their choice.',
      },
      {
        icon: '✨',
        title: 'Beautiful themes',
        text: 'Romantic, birthday, and friendship styles each have their own colors and animations.',
      },
    ],
    ideasTitle: 'How to pick the right song',
    ideas: [
      'Choose a song that was playing during a moment you shared together.',
      'Match the tempo to the message — slow for missing them, upbeat for good news.',
      'Use an instrumental track if your letter is long, so the words stay the focus.',
      'For apologies or serious messages, keep the music soft and warm.',
      'Tell them in the letter why you picked this song — the reason becomes the gift.',
    ],
    faqs: [
      {
        q: 'Can I choose which song plays?',
        a: 'You can pick from LoveDrop’s curated soundtrack categories — romantic, calm, and playful — each matched to the letter’s theme.',
      },
      {
        q: 'Will the music play automatically?',
        a: 'Browsers block autoplay before an interaction, so the music starts the moment your reader taps to open the envelope.',
      },
      {
        q: 'Is a letter with music free?',
        a: 'Yes, completely free. There is no account, no watermark, and no limit on how many people can open the link.',
      },
      {
        q: 'What if my partner has sound turned off?',
        a: 'The letter still works perfectly — music is a bonus, not a requirement. They can turn sound on and replay it any time.',
      },
    ],
    related: ['long-distance', 'open-when', 'anonymous-letter'],
  },

  'open-when': {
    slug: 'open-when',
    metaTitle: 'Open When Letters — Create Yours Online Free | LoveDrop',
    metaDescription:
      'Create "open when" letters online for free. Write messages for hard days, happy days, or the day you meet again — and schedule each one to unlock on time.',
    eyebrow: 'A letter for every moment',
    h1: 'Open When Letters, Online',
    intro: [
      'An "open when" letter is a message written for a future moment: open when you miss me, open when you cannot sleep, open when you need a laugh. It is one of the most personal gifts you can give — and you no longer need a box, ribbons, or a printer.',
      'Write each letter on LoveDrop, choose when it unlocks, and send the link. Your person will see a sealed envelope until the right moment arrives, then your words — and your song — are waiting for them.',
    ],
    highlights: [
      {
        icon: '📅',
        title: 'Schedule each unlock',
        text: 'Set the date and time for every letter so it opens exactly when it is needed.',
      },
      {
        icon: '🎁',
        title: 'Better than a box',
        text: 'No lost paper, no shipping — every letter lives in one link they can keep forever.',
      },
      {
        icon: '💝',
        title: 'Made in minutes',
        text: 'Pick a theme, write your message, and send. Three steps, no account required.',
      },
    ],
    ideasTitle: 'Open when letter ideas',
    ideas: [
      'Open when you miss me — describe the next time you will be together.',
      'Open when you have a bad day — list three things that always make you smile.',
      'Open when you cannot sleep — write a slow, quiet goodnight.',
      'Open when you need motivation — remind them what they are working toward.',
      'Open when it is your birthday — a message to read on the day itself.',
      'Open when we meet again — the first thing you will say at the airport.',
    ],
    faqs: [
      {
        q: 'What are open when letters?',
        a: 'They are letters written in advance for specific moments — "open when you are sad", "open when you miss me". Each one is read at the moment it is needed most.',
      },
      {
        q: 'Can I make open when letters online for free?',
        a: 'Yes. LoveDrop lets you create as many letters as you like, free of charge, with no sign-up and no app.',
      },
      {
        q: 'How do scheduled open-when letters work?',
        a: 'Choose an unlock date and time when creating a letter. Before that moment your reader sees a locked envelope; afterwards the full letter opens normally.',
      },
      {
        q: 'Can I send several open-when letters together?',
        a: 'Yes. Create each letter separately with its own unlock date, then share the links — or send them one at a time as surprises.',
      },
    ],
    related: ['long-distance', 'letter-with-music', 'anonymous-letter'],
  },

  'anonymous-letter': {
    slug: 'anonymous-letter',
    metaTitle: 'Send an Anonymous Love Letter Online Free | LoveDrop',
    metaDescription:
      'Write an anonymous love letter and share it with a private link. No account, no email needed — say what you feel without revealing who you are.',
    eyebrow: 'Say it without your name',
    h1: 'Send an Anonymous Love Letter',
    intro: [
      'Some words are easier to write when your name stays out of them. LoveDrop lets you create a beautiful letter and share it as a private link — no account, no email address, nothing that reveals who sent it.',
      'Use a nickname instead of your real name, decorate the page, and send the link however you like. The letter looks like a gift, not a message from a stranger.',
    ],
    highlights: [
      {
        icon: '🕵️',
        title: 'No account needed',
        text: 'Nothing is tied to your identity — no sign-up, no email, no profile.',
      },
      {
        icon: '🔒',
        title: 'Private by design',
        text: 'Letters are excluded from search engines, so only people with the link can read them.',
      },
      {
        icon: '💌',
        title: 'Still beautiful',
        text: 'Anonymous does not mean plain — animated envelopes, themes, and music included.',
      },
    ],
    ideasTitle: 'How to send one kindly',
    ideas: [
      'Keep it warm and respectful — anonymity should feel like a gift, not a threat.',
      'Sign with a hint only they would understand, if you want to be guessed.',
      'Avoid pressure: "no reply needed" is a kind way to end.',
      'Use it for crushes, gratitude, or a compliment you were too shy to say aloud.',
      'Never share someone else’s private information in the letter.',
    ],
    faqs: [
      {
        q: 'Is the letter really anonymous?',
        a: 'LoveDrop does not require an account or email, and the letter page does not display any sender details beyond the name you choose to type — you can use a nickname.',
      },
      {
        q: 'Can the recipient find out who sent it?',
        a: 'Not from LoveDrop — we do not attach identity information to letters. Only what you write in the letter can reveal you.',
      },
      {
        q: 'Will the letter appear on Google?',
        a: 'No. Letter pages are marked noindex and excluded from our sitemap, so they do not appear in search results.',
      },
      {
        q: 'Is it free?',
        a: 'Yes — anonymous letters are free, with no account and no limit on how many you create.',
      },
    ],
    related: ['long-distance', 'open-when', 'letter-with-music'],
  },

  'love-letter-maker': {
    slug: 'love-letter-maker',
    metaTitle: 'Free Love Letter Maker — Create Online | LoveDrop',
    metaDescription:
      'Create a love letter online for free. Pick a romantic theme, add music, and send a beautiful animated letter with one link. No sign-up needed.',
    eyebrow: 'Write it beautifully',
    h1: 'Free Love Letter Maker',
    intro: [
      'A love letter should feel like you — not like a template. LoveDrop gives you romantic designs, handwritten-style fonts, and soft animations so your words arrive looking as special as they feel.',
      'Type your message, choose a theme, add a song if you like, and share one link. No design skills, no account, and no cost — just a letter that opens like a gift.',
    ],
    highlights: [
      {
        icon: '💖',
        title: 'Romantic by default',
        text: 'Rose-tinted paper, floating hearts, and an envelope that opens with a flourish.',
      },
      {
        icon: '✍️',
        title: 'Your words, beautifully set',
        text: 'Handwritten-style typography makes even a short note feel personal.',
      },
      {
        icon: '⏱️',
        title: 'Two minutes, start to send',
        text: 'Three simple steps — theme, message, share. Nothing to install or configure.',
      },
    ],
    ideasTitle: 'What to put in a love letter',
    ideas: [
      'The moment you knew you liked them — be specific, not generic.',
      'One ordinary thing they do that you never want to lose.',
      'A memory only the two of you share, told in detail.',
      'Something you are looking forward to doing together.',
      'A promise you can actually keep — small and sincere beats grand.',
      'The sentence you have been too shy to say out loud.',
    ],
    faqs: [
      {
        q: 'Is the love letter maker really free?',
        a: 'Yes. Writing, decorating, and sending a letter costs nothing, with no account, no watermark, and no limit on how many letters you create.',
      },
      {
        q: 'Can I add music to my love letter?',
        a: 'Yes — pick a romantic or calm soundtrack and it will play softly when the envelope is opened. The reader can mute it at any time.',
      },
      {
        q: 'How does my partner receive the letter?',
        a: 'You get a private link. Share it by message, email, or any app — it opens in a normal browser on any phone or computer.',
      },
      {
        q: 'How long does a letter stay online?',
        a: 'Letters are stored for up to 90 days, so it is best to share your link soon after creating it. You can always write a new one.',
      },
    ],
    related: ['letter-with-music', 'long-distance', 'valentine'],
  },

  birthday: {
    slug: 'birthday',
    metaTitle: 'Free Birthday Letter Online — Send Yours | LoveDrop',
    metaDescription:
      'Send a free birthday letter online with confetti, animations, and music. Add a scratch-to-reveal surprise and share it with one simple link.',
    eyebrow: 'Happy birthday, beautifully',
    h1: 'Free Birthday Letter Online',
    intro: [
      'Birthday cards get read once and lost in a drawer. A birthday letter is something your person can open again on a hard day, years later — and LoveDrop makes it feel like a celebration from the very first tap.',
      'Confetti bursts when the envelope opens, a scratch card hides a little surprise, and you can schedule the letter to unlock on the morning of their birthday so the first thing they see is you.',
    ],
    highlights: [
      {
        icon: '🎉',
        title: 'Confetti on open',
        text: 'The envelope bursts into celebration — no wrapping paper required.',
      },
      {
        icon: '🎁',
        title: 'Scratch-to-reveal surprise',
        text: 'Hide a message, a memory, or a promise under a scratch card.',
      },
      {
        icon: '🌅',
        title: 'Opens on their birthday',
        text: 'Pick the date and time so it is waiting for them at midnight or breakfast.',
      },
    ],
    ideasTitle: 'Birthday letter ideas that actually land',
    ideas: [
      'The first birthday you spent together, in as much detail as you remember.',
      'Three things you admire about them that have nothing to do with achievements.',
      'A list of small wishes for the year ahead — specific and kind.',
      'An inside joke only the two of you will understand.',
      'A promise for the next year: one thing you will do together.',
      'A thank-you for something they did that they probably forgot.',
    ],
    faqs: [
      {
        q: 'Can I schedule a birthday letter in advance?',
        a: 'Yes. Choose the unlock date and time when you create the letter — for example, 7 AM on their birthday. Until then they see a sealed envelope.',
      },
      {
        q: 'Is the birthday letter free?',
        a: 'Completely free, with no account needed. Themes, animations, the scratch card, and music are all included.',
      },
      {
        q: 'Does it work for a friend, not just a partner?',
        a: 'Yes. There is a friendship theme made for best friends, and you can write to anyone — family, coworkers, or a crush.',
      },
      {
        q: 'What if their birthday is soon?',
        a: 'It takes about two minutes to create a letter, so a same-day birthday letter is absolutely possible.',
      },
    ],
    related: ['friendship', 'letter-with-music', 'open-when'],
  },

  friendship: {
    slug: 'friendship',
    metaTitle: 'Letter for Your Best Friend — Free Online | LoveDrop',
    metaDescription:
      'Send a free friendship letter online with playful flip cards and animations. Celebrate your best friend with a letter they can keep forever.',
    h1: 'Letters for Your Best Friend',
    intro: [
      'Friendships rarely get the words they deserve. A friendship letter is a small, specific way to say "I noticed" — and LoveDrop makes it playful rather than formal, with a friendship theme built for the people who know you best.',
      'Open the envelope and a set of flip cards appears, each hiding a message. Write your letter, add a song from the era of your friendship, and send one link they can keep.',
    ],
    highlights: [
      {
        icon: '🃏',
        title: 'Flip cards included',
        text: 'Hide short messages on cards that turn over when tapped — fun to explore.',
      },
      {
        icon: '😄',
        title: 'Playful, not formal',
        text: 'A friendship theme with warm colors and animations made for laughing together.',
      },
      {
        icon: '📎',
        title: 'Easy to keep',
        text: 'One link they can bookmark and reread whenever they need it.',
      },
    ],
    ideasTitle: 'Friendship letter ideas',
    ideas: [
      'How you met — and what you thought of them at first.',
      'Your favorite inside joke, written out so it survives.',
      'The time they showed up for you when they did not have to.',
      'Something they taught you without realizing it.',
      'A list of things you want to do together this year.',
      'The honest reason you are glad they are in your life.',
    ],
    faqs: [
      {
        q: 'Is the friendship letter free?',
        a: 'Yes — free, no sign-up, no app. The flip cards, themes, and music are all included.',
      },
      {
        q: 'Can I send it for a birthday or a random day?',
        a: 'Both. Many people send friendship letters for birthdays, but a letter on an ordinary Tuesday often means even more.',
      },
      {
        q: 'Can I schedule it to open on a specific day?',
        a: 'Yes. Set an unlock date and the letter stays sealed until that moment — useful for birthdays and anniversaries of your friendship.',
      },
      {
        q: 'Can I send it anonymously?',
        a: 'You can use a nickname instead of your real name, though most friendship letters land best with your name on them.',
      },
    ],
    related: ['birthday', 'open-when', 'letter-with-music'],
  },

  'sorry-letter': {
    slug: 'sorry-letter',
    metaTitle: 'Free Sorry Letter Online — Apologize | LoveDrop',
    metaDescription:
      'Write a sincere sorry letter online for free. Say what you feel, add a soft soundtrack, and share a heartfelt apology with one private link.',
    eyebrow: 'Say it sincerely',
    h1: 'Write a Sorry Letter Online',
    intro: [
      'Some apologies are too important to send as a rushed text. Writing a letter gives you time to choose your words carefully — and gives the other person space to read them without pressure to reply immediately.',
      'LoveDrop keeps the tone calm and honest: soft paper styling, quiet optional music, and a private link. No templates full of excuses — just your words, thought through.',
    ],
    highlights: [
      {
        icon: '🤍',
        title: 'A calm setting',
        text: 'Simple, quiet design that keeps the focus on what you are saying.',
      },
      {
        icon: '🎧',
        title: 'Optional soft music',
        text: 'A gentle soundtrack can soften the moment — or leave it silent and let the words stand.',
      },
      {
        icon: '🔒',
        title: 'Private by nature',
        text: 'The letter is not indexed and is only visible to people with the link.',
      },
    ],
    ideasTitle: 'How to write an apology that helps',
    ideas: [
      'Name the specific thing you did — vague apologies feel like avoidance.',
      'Acknowledge how it affected them, in their terms, not yours.',
      'Avoid "but" — one excuse can undo a sincere paragraph.',
      'Say what you will do differently, concretely.',
      'Ask for what you need (time, a conversation) without demanding forgiveness.',
      'Keep it short enough to be read in one calm sitting.',
    ],
    faqs: [
      {
        q: 'Should I apologize in a letter instead of in person?',
        a: 'A letter works best as a complement to a real conversation, not a replacement — especially for serious hurts. Use it to gather your thoughts, then talk.',
      },
      {
        q: 'Is the sorry letter private?',
        a: 'Yes. Letters are excluded from search engines and only people with the link can open them.',
      },
      {
        q: 'Can I send it anonymously?',
        a: 'You can use a nickname, but an apology usually carries more weight when the person knows it is you.',
      },
      {
        q: 'Is it free?',
        a: 'Yes, free and without an account — write, share the link, and they can read it whenever they are ready.',
      },
    ],
    related: ['anonymous-letter', 'long-distance', 'open-when'],
  },

  valentine: {
    slug: 'valentine',
    metaTitle: 'Free Valentine Letter Online — Send Yours | LoveDrop',
    metaDescription:
      "Create a free Valentine's letter online with romantic themes, floating hearts, music, and a scratch-to-reveal surprise. Send it with one link.",
    eyebrow: "Valentine's Day",
    h1: "Free Valentine's Letter Online",
    intro: [
      "Flowers wilt and chocolates disappear. A Valentine's letter keeps the words — the part that actually matters — and LoveDrop helps you make it feel like a keepsake rather than a card.",
      'Choose the romantic theme, add a song that belongs to the two of you, hide a surprise under a scratch card, and schedule the letter to unlock on the morning of February 14th.',
    ],
    highlights: [
      {
        icon: '💘',
        title: 'Romantic theme',
        text: 'Rose paper, floating hearts, and an envelope that opens with a soft flourish.',
      },
      {
        icon: '🎶',
        title: 'Your song',
        text: 'Attach the track that reminds you of them — it plays as the letter opens.',
      },
      {
        icon: '🌹',
        title: 'Ready before the 14th',
        text: 'Write it today, schedule the unlock, and let Valentine’s morning take care of itself.',
      },
    ],
    ideasTitle: "Valentine's letter ideas",
    ideas: [
      'The story of your first date, told like it happened yesterday.',
      'Five small things you love about them that they do not know you notice.',
      'What you want this year together to look like.',
      'A playlist in words — the songs that mean "us".',
      'Ask them out again, properly, with a time and a place.',
      'One sentence you would want them to remember on a bad day.',
    ],
    faqs: [
      {
        q: 'Can I schedule my Valentine letter to open on February 14th?',
        a: 'Yes. Set the unlock date and time — for example 8 AM on Valentine’s Day — and the envelope stays sealed until then.',
      },
      {
        q: 'Is the Valentine letter free?',
        a: 'Yes, completely free. No account, no payment, no limit on how many letters you create.',
      },
      {
        q: 'Can I send an anonymous Valentine?',
        a: 'Yes — use a nickname instead of your name, and the recipient will only know what you choose to tell them.',
      },
      {
        q: 'What if I remember on February 14th itself?',
        a: 'A letter takes about two minutes to make, so a same-day Valentine is completely doable — though scheduling ahead is more relaxed.',
      },
    ],
    related: ['love-letter-maker', 'letter-with-music', 'long-distance'],
  },
};

export const landingSlugs = Object.keys(landingPages);
