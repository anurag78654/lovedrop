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

const SITE_URL = 'https://lovedrop.pages.dev';

function upsertMeta(selectorAttr, key, content) {
  let el = document.querySelector(`meta[${selectorAttr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(selectorAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(selectorAttr, key) {
  const el = document.querySelector(`meta[${selectorAttr}="${key}"]`);
  if (el) el.remove();
}

/**
 * Point the canonical link at the current route (SEO: tells Google
 * which URL is the "official" version of this page).
 * @param {string} pathname e.g. "/create"
 */
export function setCanonical(pathname) {
  const href = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
  upsertMeta('property', 'og:url', href);
}

/**
 * Set title/description for a static marketing page (landing pages).
 * Canonical is handled globally by App.jsx.
 * @param {{title: string, description: string}} meta
 */
export function applyPageMeta({ title, description }) {
  if (title) {
    document.title = title;
    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);
  }
  if (description) {
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:description', description);
  }
}

/**
 * Inject a JSON-LD structured data block (rich results in Google).
 * @param {string} id unique script id
 * @param {Object} data JSON-LD object
 */
export function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * Set page title + OG/Twitter tags for a letter.
 * Letter pages are marked noindex (private content).
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
  upsertMeta('name', 'robots', 'noindex, nofollow');
}

/**
 * Restore site-wide defaults (call when leaving a letter page).
 */
export function resetMeta() {
  document.title = DEFAULTS.title;
  upsertMeta('name', 'description', DEFAULTS.description);
  upsertMeta('property', 'og:title', DEFAULTS.title);
  upsertMeta('property', 'og:description', DEFAULTS.description);
  upsertMeta('name', 'twitter:title', DEFAULTS.title);
  upsertMeta('name', 'twitter:description', DEFAULTS.description);
  removeMeta('name', 'robots');
}
