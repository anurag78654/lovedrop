import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  canCreateLetter,
  recordLetterCreated,
  getLimitMessage,
  RATE_LIMITS,
} from '../../../lib/rateLimit';

const STORE_KEY = 'lovedrop_rate_limit';
const { DAILY_LIMIT, COOLDOWN_MS } = RATE_LIMITS;

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-09-26T10:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('rateLimit - initial state', () => {
  it('allows creation when nothing stored', () => {
    const result = canCreateLetter();
    expect(result.allowed).toBe(true);
    expect(result.reason).toBeNull();
    expect(result.retryInMs).toBe(0);
  });
});

describe('rateLimit - recordLetterCreated', () => {
  it('stores count after creating a letter', () => {
    recordLetterCreated();
    const stored = JSON.parse(localStorage.getItem(STORE_KEY));
    expect(stored.count).toBe(1);
    expect(stored.date).toBe('2026-09-26');
  });

  it('increments count for same day', () => {
    recordLetterCreated();
    recordLetterCreated();
    recordLetterCreated();
    const stored = JSON.parse(localStorage.getItem(STORE_KEY));
    expect(stored.count).toBe(3);
  });

  it('allows creation right after first record (no cooldown issues initially)', () => {
    recordLetterCreated();
    vi.advanceTimersByTime(COOLDOWN_MS);
    expect(canCreateLetter().allowed).toBe(true);
  });
});

describe('rateLimit - cooldown', () => {
  it('blocks immediately after creation', () => {
    recordLetterCreated();
    const result = canCreateLetter();
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('cooldown');
    expect(result.retryInMs).toBeGreaterThan(0);
    expect(result.retryInMs).toBeLessThanOrEqual(COOLDOWN_MS);
  });

  it('cooldown expires after 15 seconds', () => {
    recordLetterCreated();
    vi.advanceTimersByTime(COOLDOWN_MS);
    expect(canCreateLetter().allowed).toBe(true);
  });

  it('retryInMs counts down over time', () => {
    recordLetterCreated();
    const first = canCreateLetter();
    vi.advanceTimersByTime(5_000);
    const later = canCreateLetter();
    expect(later.retryInMs).toBeLessThan(first.retryInMs);
  });
});

describe('rateLimit - daily limit', () => {
  it(`blocks after ${DAILY_LIMIT} letters in a day`, () => {
    for (let i = 0; i < DAILY_LIMIT; i++) {
      recordLetterCreated();
      vi.advanceTimersByTime(COOLDOWN_MS);
    }
    const result = canCreateLetter();
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('daily');
  });

  it('allows exactly the limit, then blocks on next check', () => {
    for (let i = 0; i < DAILY_LIMIT - 1; i++) {
      recordLetterCreated();
      vi.advanceTimersByTime(COOLDOWN_MS);
    }
    recordLetterCreated(); // now at limit
    vi.advanceTimersByTime(COOLDOWN_MS);
    expect(canCreateLetter().allowed).toBe(false);
  });

  it('daily counter resets next day', () => {
    for (let i = 0; i < DAILY_LIMIT; i++) {
      recordLetterCreated();
      vi.advanceTimersByTime(COOLDOWN_MS);
    }
    expect(canCreateLetter().allowed).toBe(false);

    // Advance to next day + past cooldown
    vi.setSystemTime(new Date('2026-09-27T10:00:00Z'));
    expect(canCreateLetter().allowed).toBe(true);
  });
});

describe('rateLimit - corrupt storage', () => {
  it('treats corrupt JSON as empty state', () => {
    localStorage.setItem(STORE_KEY, 'not-json{{{');
    const result = canCreateLetter();
    expect(result.allowed).toBe(true);
  });
});

describe('rateLimit - getLimitMessage', () => {
  it('returns daily message', () => {
    const msg = getLimitMessage('daily');
    expect(msg).toContain('tomorrow');
    expect(msg).toContain(String(DAILY_LIMIT));
  });

  it('returns cooldown message with seconds', () => {
    const msg = getLimitMessage('cooldown', 7500);
    expect(msg).toContain('8s'); // ceil(7.5)
  });

  it('returns empty string for unknown reason', () => {
    expect(getLimitMessage('mystery')).toBe('');
  });
});
