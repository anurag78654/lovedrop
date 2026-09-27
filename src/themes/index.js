/**
 * Theme configurations for LoveDrop
 * Each theme defines colors, effects, sounds, and decorations
 */

export const themes = {
  romantic: {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    description: 'Perfect for Valentine\'s Day, anniversaries, and love notes',
    occasions: ['Valentine\'s Day', 'Anniversary', 'Love Note', 'Just Because'],
    className: 'theme-romantic',
    colors: {
      primary: '#ff6b9d',
      secondary: '#ff2861',
      accent: '#c44569',
      background: '#ffe4ec',
      text: '#8b0732',
    },
    effects: ['hearts', 'sparkles', 'float'],
    sound: 'chime',
    envelope: {
      color: '#ff2861',
      sealColor: '#ffd700',
      flapColor: '#ed0447',
    },
    decorations: [
      { id: 'heart', emoji: '❤️', label: 'Heart' },
      { id: 'rose', emoji: '🌹', label: 'Rose' },
      { id: 'kiss', emoji: '💋', label: 'Kiss' },
      { id: 'cupid', emoji: '💘', label: 'Cupid' },
      { id: 'sparkle', emoji: '✨', label: 'Sparkle' },
      { id: 'cherry', emoji: '🍒', label: 'Cherry' },
      { id: 'chocolate', emoji: '🍫', label: 'Chocolate' },
      { id: 'ring', emoji: '💍', label: 'Ring' },
    ],
    letterTemplates: [
      {
        id: 'valentine',
        title: 'Happy Valentine\'s Day',
        content: 'My love,\n\nEvery moment with you feels like a beautiful dream. On this Valentine\'s Day, I want you to know that you are my everything.\n\nWith all my love,\n',
      },
      {
        id: 'anniversary',
        title: 'Happy Anniversary',
        content: 'My dearest,\n\nAnother year of love, laughter, and beautiful memories together. Here\'s to many more years by your side.\n\nForever yours,\n',
      },
      {
        id: 'goodmorning',
        title: 'Good Morning, My Love',
        content: 'Hey sleepyhead,\n\nJust wanted to be the first thing you see today. Hope your day is as amazing as you are.\n\nLove you tons,\n',
      },
    ],
  },

  birthday: {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    description: 'Celebrate birthdays with confetti, candles, and joy',
    occasions: ['Birthday', 'Congratulations', 'Celebration', 'Achievement'],
    className: 'theme-birthday',
    colors: {
      primary: '#ffd93d',
      secondary: '#ff6b6b',
      accent: '#4ecdc4',
      background: '#fff3cd',
      text: '#92400e',
    },
    effects: ['confetti', 'candles', 'sparkles'],
    sound: 'party',
    envelope: {
      color: '#ffd93d',
      sealColor: '#ff6b6b',
      flapColor: '#f0a500',
    },
    decorations: [
      { id: 'cake', emoji: '🎂', label: 'Cake' },
      { id: 'balloon', emoji: '🎈', label: 'Balloon' },
      { id: 'gift', emoji: '🎁', label: 'Gift' },
      { id: 'party', emoji: '🎉', label: 'Party' },
      { id: 'star', emoji: '⭐', label: 'Star' },
      { id: 'confetti', emoji: '🎊', label: 'Confetti' },
      { id: 'candle', emoji: '🕯️', label: 'Candle' },
      { id: 'trophy', emoji: '🏆', label: 'Trophy' },
    ],
    letterTemplates: [
      {
        id: 'happy-birthday',
        title: 'Happy Birthday!',
        content: 'Hey there, birthday star! 🎂\n\nWishing you a day filled with love, laughter, and all your favorite things. May this year bring you endless joy!\n\nParty hard!\n',
      },
      {
        id: 'celebration',
        title: 'Congratulations!',
        content: 'You did it! 🎉\n\nSo incredibly proud of everything you\'ve achieved. This calls for a celebration!\n\nCheers to you!\n',
      },
    ],
  },

  friendship: {
    id: 'friendship',
    name: 'Friendship',
    emoji: '🤝',
    description: 'Celebrate your best friends with roasts and compliments',
    occasions: ['Best Friend', 'Friendship Day', 'Just Because', 'Roast'],
    className: 'theme-friendship',
    colors: {
      primary: '#4ecdc4',
      secondary: '#45b7d1',
      accent: '#96ceb4',
      background: '#d4f5f0',
      text: '#134e4a',
    },
    effects: ['flip-cards', 'bounce', 'shake'],
    sound: 'pop',
    envelope: {
      color: '#4ecdc4',
      sealColor: '#45b7d1',
      flapColor: '#2c9c94',
    },
    decorations: [
      { id: 'fistbump', emoji: '🤛', label: 'Fist Bump' },
      { id: 'handshake', emoji: '🤝', label: 'Handshake' },
      { id: 'sunglasses', emoji: '😎', label: 'Cool' },
      { id: 'laugh', emoji: '😂', label: 'Laugh' },
      { id: 'fire', emoji: '🔥', label: 'Fire' },
      { id: 'clap', emoji: '👏', label: 'Clap' },
      { id: 'thumbsup', emoji: '👍', label: 'Thumbs Up' },
      { id: 'star', emoji: '🌟', label: 'Star' },
    ],
    letterTemplates: [
      {
        id: 'best-friend',
        title: 'To My Best Friend',
        content: 'Hey you! 👋\n\nReal talk - you\'re the best thing that ever happened to me. Thanks for always being there, through the good, the bad, and the ugly.\n\nYou\'re stuck with me forever!\n',
      },
      {
        id: 'roast',
        title: 'A Friendly Roast 🎤',
        content: 'Listen here... 😏\n\nYou\'re like a really bad habit I can\'t quit. But seriously, who else is gonna put up with me? Thanks for being my partner in crime!\n\nYour favorite disaster,\n',
      },
    ],
  },
};

/**
 * Get a theme by ID
 * @param {string} id - Theme ID (romantic, birthday, friendship)
 * @returns {Object|null}
 */
export function getTheme(id) {
  return themes[id] || null;
}

/**
 * Get all theme IDs
 * @returns {string[]}
 */
export function getThemeIds() {
  return Object.keys(themes);
}
