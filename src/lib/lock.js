/**
 * Lock/unlock helpers for scheduled letters (C4)
 * A letter with a future unlock_date is "locked" - shows countdown instead of content.
 */

/**
 * Is the letter currently locked?
 * @param {string|null} unlockDate - ISO date string or null
 * @param {number} now - epoch ms (injectable for tests)
 * @returns {boolean}
 */
export function isLetterLocked(unlockDate, now = Date.now()) {
  return getRemainingMs(unlockDate, now) > 0;
}

/**
 * Milliseconds until unlock (0 if no lock, invalid date, or already passed)
 */
export function getRemainingMs(unlockDate, now = Date.now()) {
  if (!unlockDate) return 0;
  const unlockTime = new Date(unlockDate).getTime();
  if (Number.isNaN(unlockTime)) return 0;
  return Math.max(0, unlockTime - now);
}

/**
 * Break milliseconds into display units
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */
export function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
