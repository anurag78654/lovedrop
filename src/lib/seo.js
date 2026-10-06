/**
 * SEO / social preview helpers (E1)
 *
 * Updates document title + og/twitter meta tags when a letter is viewed,
 * so shared links show the letter's title in browser tabs and
 * JS-executing scrapers.
 *
 * Note: static scrapers (WhatsApp/Facebook) don't run JS - they always see
 * the site-wide defaults from index.html. Full per-letter previews would
 * need server-side rendering (future enhancement).
 */

const DEFAULTS = {
  title: 'LoveDrop - Send Beautiful Virtual Letters',
  description:
    'Create and send beautiful virtual letters to your loved ones.',
};

function upsertMeta(selectorAttr, key, content) {
  let el = document.querySelector(`meta[${selectorAttr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(selectorAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Set page title + OG/Twitter tags for a letter.
 * @param {Object} letter
 */
export function applyLetterMeta(letter) {
  if (!letter) return;
  const sender = letter.sender_name || 'Someone';
  const title = letter.title
    ? `${letter.title} — a letter for ${letter.recipient_name || 'you'} 💌`
    : `💌 A letter from ${sender} for ${letter.recipient_name || 'you'}`;
  const description = letter.message
    ? `${letter.message.slice(0, 120)}${letter.message.length > 120 ? '…' : ''}`
    : DEFAULTS.description;

  document.title = `${title} | LoveDrop`;

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
}

/**
 * Restore site-wide defaults (call when leaving a letter page).
 */
export function resetMeta() {
  document.title = DEFAULTS.title;
  upsertMeta('property', 'og:title', DEFAULTS.title);
  upsertMeta('property', 'og:description', DEFAULTS.description);
  upsertMeta('name', 'twitter:title', DEFAULTS.title);
  upsertMeta('name', 'twitter:description', DEFAULTS.description);
}
