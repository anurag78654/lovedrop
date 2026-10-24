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
};

export const landingSlugs = Object.keys(landingPages);
