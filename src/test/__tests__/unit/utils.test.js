import { describe, it, expect } from 'vitest';
import {
  formatDate,
  getThemeEmoji,
  getThemeLabel,
  getShareUrl,
  copyToClipboard,
  clamp,
  getThemeColors,
} from '../../../lib/utils';

// ============ WHITE BOX TESTS: Utility Functions ============

describe('utils - formatDate', () => {
  it('formats a date string to readable format', () => {
    const result = formatDate('2026-09-05T12:00:00');
    expect(result).toBe('September 5, 2026');
  });

  it('handles Date objects', () => {
    const result = formatDate(new Date('2026-12-25'));
    expect(result).toBe('December 25, 2026');
  });

  it('handles timestamp numbers', () => {
    const result = formatDate(1767225600000); // 2026-01-01
    expect(result).toContain('2026');
  });
});

describe('utils - getThemeEmoji', () => {
  it('returns correct emoji for romantic theme', () => {
    expect(getThemeEmoji('romantic')).toBe('💕');
  });

  it('returns correct emoji for birthday theme', () => {
    expect(getThemeEmoji('birthday')).toBe('🎂');
  });

  it('returns correct emoji for friendship theme', () => {
    expect(getThemeEmoji('friendship')).toBe('🤝');
  });

  it('falls back to envelope emoji for unknown theme', () => {
    expect(getThemeEmoji('unknown')).toBe('💌');
    expect(getThemeEmoji('')).toBe('💌');
    expect(getThemeEmoji(null)).toBe('💌');
  });
});

describe('utils - getThemeLabel', () => {
  it('returns correct labels', () => {
    expect(getThemeLabel('romantic')).toBe('Romantic');
    expect(getThemeLabel('birthday')).toBe('Birthday');
    expect(getThemeLabel('friendship')).toBe('Friendship');
  });

  it('falls back to General for unknown themes', () => {
    expect(getThemeLabel('unknown')).toBe('General');
  });
});

describe('utils - getShareUrl', () => {
  it('generates a valid URL with short ID', () => {
    const url = getShareUrl('abc12345');
    expect(url).toContain('/letter/abc12345');
    expect(url).toMatch(/^https?:\/\/.+\/letter\/abc12345$/);
  });
});

describe('utils - copyToClipboard', () => {
  it('copies text successfully', async () => {
    const result = await copyToClipboard('test text');
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('returns false when clipboard API fails and no fallback available', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('denied'));
    const result = await copyToClipboard('fallback');
    // happy-dom has no execCommand, so fallback cannot copy
    expect(result).toBe(false);
  });

  it('never throws on clipboard failure', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('denied'));
    await expect(copyToClipboard('text')).resolves.not.toThrow();
  });
});

describe('utils - clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles edge equal values', () => {
    expect(clamp(0, 0, 0)).toBe(0);
  });
});

describe('utils - getThemeColors', () => {
  it('returns romantic colors', () => {
    const colors = getThemeColors('romantic');
    expect(colors).toContain('#ff2861');
    expect(colors.length).toBeGreaterThanOrEqual(3);
  });

  it('returns birthday colors', () => {
    const colors = getThemeColors('birthday');
    expect(colors).toContain('#ffd93d');
  });

  it('returns friendship colors', () => {
    const colors = getThemeColors('friendship');
    expect(colors).toContain('#4ecdc4');
  });

  it('falls back to romantic colors for unknown theme', () => {
    const colors = getThemeColors('unknown');
    expect(colors).toContain('#ff2861');
  });

  it('returns arrays of valid hex colors', () => {
    ['romantic', 'birthday', 'friendship', 'unknown'].forEach((theme) => {
      getThemeColors(theme).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});
