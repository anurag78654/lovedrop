/**
 * Utility functions for LoveDrop
 */

/**
 * Format a date nicely
 * @param {Date|string} date
 * @returns {string} - e.g., "September 5, 2026"
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get emoji for a theme
 * @param {string} theme
 * @returns {string}
 */
export function getThemeEmoji(theme) {
  const emojis = {
    romantic: '💕',
    birthday: '🎂',
    friendship: '🤝',
  };
  return emojis[theme] || '💌';
}

/**
 * Get theme label
 * @param {string} theme
 * @returns {string}
 */
export function getThemeLabel(theme) {
  const labels = {
    romantic: 'Romantic',
    birthday: 'Birthday',
    friendship: 'Friendship',
  };
  return labels[theme] || 'General';
}

/**
 * Generate a shareable URL
 * @param {string} shortId
 * @returns {string}
 */
export function getShareUrl(shortId) {
  return `${window.location.origin}/letter/${shortId}`;
}

/**
 * Copy text to clipboard
 * @param {string} text
 * @returns {Promise<boolean>} - success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / denied clipboard permission
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
      document.body.removeChild(textarea);
      return !!copied;
    } catch {
      return false;
    }
  }
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate confetti colors based on theme
 */
export function getThemeColors(theme) {
  const colors = {
    romantic: ['#ff2861', '#ff6b9d', '#ff94b0', '#ffc0d1', '#ed0447'],
    birthday: ['#ffd93d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
    friendship: ['#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'],
  };
  return colors[theme] || colors.romantic;
}
