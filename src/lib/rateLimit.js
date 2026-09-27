/**
 * Rate limiting for letter creation (client-side)
 *
 * Protects the free Supabase tier from accidental spam:
 * - Max 10 letters per day per browser
 * - 15 second cooldown between creations
 *
 * Note: client-side limits can be bypassed by determined users -
 * for full protection a server-side check (Cloudflare Worker) can be
 * added later. This stops accidental/bulk spam which is 99% of cases.
 */

const DAILY_LIMIT = 10;
const COOLDOWN_MS = 15_000;
const STORE_KEY = 'lovedrop_rate_limit';

const getToday = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

function readState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeState(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // storage full/blocked - fail silently, limit just won't persist
  }
}

/**
 * Check whether creating a letter is currently allowed.
 * @returns {{ allowed: boolean, reason: string|null, retryInMs: number }}
 *   retryInMs = milliseconds until allowed (0 if allowed or daily block)
 */
export function canCreateLetter() {
  const state = readState();
  const now = Date.now();
  const today = getToday();

  if (!state) {
    return { allowed: true, reason: null, retryInMs: 0 };
  }

  // New day -> reset counter (keep cooldown check)
  const count = state.date === today ? state.count : 0;

  if (count >= DAILY_LIMIT) {
    return {
      allowed: false,
      reason: `daily`,
      retryInMs: 0, // resets tomorrow
    };
  }

  const sinceLast = now - (state.lastCreated || 0);
  if (sinceLast < COOLDOWN_MS) {
    return {
      allowed: false,
      reason: 'cooldown',
      retryInMs: COOLDOWN_MS - sinceLast,
    };
  }

  return { allowed: true, reason: null, retryInMs: 0 };
}

/**
 * Record a successful letter creation (updates counters).
 */
export function recordLetterCreated() {
  const state = readState();
  const today = getToday();
  const count = state && state.date === today ? state.count : 0;

  writeState({
    date: today,
    count: count + 1,
    lastCreated: Date.now(),
  });
}

/**
 * Get human-readable message for a blocked reason.
 * @param {string} reason - 'daily' | 'cooldown'
 * @param {number} retryInMs
 * @returns {string}
 */
export function getLimitMessage(reason, retryInMs = 0) {
  if (reason === 'daily') {
    return `You've created ${DAILY_LIMIT} letters today — take a break and come back tomorrow 💕`;
  }
  if (reason === 'cooldown') {
    const secs = Math.ceil(retryInMs / 1000);
    return `Please wait ${secs}s before creating another letter ⏳`;
  }
  return '';
}

export const RATE_LIMITS = { DAILY_LIMIT, COOLDOWN_MS };
