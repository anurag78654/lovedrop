import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { isLetterLocked, getRemainingMs, formatCountdown } from '../../../lib/lock';
import LockedLetter from '../../../components/letter/LockedLetter';

const NOW = new Date('2026-09-27T12:00:00Z').getTime();

describe('isLetterLocked', () => {
  it('false when no unlock date', () => {
    expect(isLetterLocked(null, NOW)).toBe(false);
    expect(isLetterLocked('', NOW)).toBe(false);
    expect(isLetterLocked(undefined, NOW)).toBe(false);
  });

  it('true for future date', () => {
    expect(isLetterLocked('2026-12-25T10:00:00Z', NOW)).toBe(true);
  });

  it('false for past date', () => {
    expect(isLetterLocked('2026-01-01T10:00:00Z', NOW)).toBe(false);
  });

  it('false for invalid date string', () => {
    expect(isLetterLocked('not-a-date', NOW)).toBe(false);
  });
});

describe('getRemainingMs', () => {
  it('computes difference for future dates', () => {
    const future = NOW + 60_000;
    expect(getRemainingMs(new Date(future).toISOString(), NOW)).toBe(60_000);
  });

  it('returns 0 for past dates (never negative)', () => {
    expect(getRemainingMs('2020-01-01T00:00:00Z', NOW)).toBe(0);
  });

  it('returns 0 for empty input', () => {
    expect(getRemainingMs(null, NOW)).toBe(0);
  });
});

describe('formatCountdown', () => {
  it('breaks ms into d/h/m/s', () => {
    const ms = (1 * 86400 + 2 * 3600 + 3 * 60 + 4) * 1000;
    expect(formatCountdown(ms)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it('handles zero', () => {
    expect(formatCountdown(0)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('handles negative input gracefully', () => {
    expect(formatCountdown(-5000).seconds).toBe(0);
  });
});

describe('LockedLetter component', () => {
  const lockedLetter = {
    sender_name: 'Anu',
    recipient_name: 'Riya',
    title: 'Happy Birthday',
    message: 'SECRET MESSAGE',
    theme: 'romantic',
    decorations: [],
    unlock_date: new Date(Date.now() + 86_400_000).toISOString(), // tomorrow
  };

  const unlockedLetter = {
    ...lockedLetter,
    unlock_date: new Date(Date.now() - 1000).toISOString(), // passed
  };

  it('shows countdown for future unlock date (hides message)', () => {
    render(<LockedLetter letter={lockedLetter} />);
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.getByText(/This letter is sealed/i)).toBeInTheDocument();
    expect(screen.queryByText('SECRET MESSAGE')).not.toBeInTheDocument();
    expect(screen.getByText('Anu')).toBeInTheDocument();
  });

  it('shows letter directly when unlock date already passed', () => {
    render(<LockedLetter letter={unlockedLetter} />);
    // Countdown gone, envelope stage showing (message stays sealed until opened)
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
    expect(screen.getByText(/You've got a letter/i)).toBeInTheDocument();
    expect(screen.queryByText(/sealed/i)).not.toBeInTheDocument();
  });
});
