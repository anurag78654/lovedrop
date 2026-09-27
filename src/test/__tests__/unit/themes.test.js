import { describe, it, expect } from 'vitest';
import { themes, getTheme, getThemeIds } from '../../../themes';
import { generateShortId } from '../../../lib/supabase';

// ============ WHITE BOX TESTS: Theme Configuration ============

describe('themes - structure integrity', () => {
  it('has exactly 3 themes', () => {
    expect(Object.keys(themes)).toHaveLength(3);
  });

  it('contains romantic, birthday, friendship themes', () => {
    expect(Object.keys(themes)).toEqual(
      expect.arrayContaining(['romantic', 'birthday', 'friendship'])
    );
  });

  it('every theme has required fields', () => {
    Object.values(themes).forEach((theme) => {
      expect(theme).toHaveProperty('id');
      expect(theme).toHaveProperty('name');
      expect(theme).toHaveProperty('emoji');
      expect(theme).toHaveProperty('description');
      expect(theme).toHaveProperty('className');
      expect(theme).toHaveProperty('colors');
      expect(theme).toHaveProperty('effects');
      expect(theme).toHaveProperty('envelope');
      expect(theme).toHaveProperty('decorations');
      expect(theme).toHaveProperty('letterTemplates');
    });
  });

  it('every theme id matches its key', () => {
    Object.entries(themes).forEach(([key, theme]) => {
      expect(theme.id).toBe(key);
    });
  });

  it('every theme has primary/secondary colors', () => {
    Object.values(themes).forEach((theme) => {
      expect(theme.colors.primary).toMatch(/^#/);
      expect(theme.colors.secondary).toMatch(/^#/);
      expect(theme.colors.background).toMatch(/^#/);
      expect(theme.colors.text).toMatch(/^#/);
    });
  });

  it('every theme has at least 3 decorations', () => {
    Object.values(themes).forEach((theme) => {
      expect(theme.decorations.length).toBeGreaterThanOrEqual(3);
      theme.decorations.forEach((d) => {
        expect(d).toHaveProperty('id');
        expect(d).toHaveProperty('emoji');
        expect(d).toHaveProperty('label');
      });
    });
  });

  it('every theme has at least 1 letter template', () => {
    Object.values(themes).forEach((theme) => {
      expect(theme.letterTemplates.length).toBeGreaterThanOrEqual(1);
      theme.letterTemplates.forEach((t) => {
        expect(t).toHaveProperty('id');
        expect(t).toHaveProperty('title');
        expect(t).toHaveProperty('content');
        expect(t.content.length).toBeGreaterThan(10);
      });
    });
  });

  it('every theme has unique decoration IDs', () => {
    Object.values(themes).forEach((theme) => {
      const ids = theme.decorations.map((d) => d.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  it('theme classNames match the CSS in index.css', () => {
    expect(themes.romantic.className).toBe('theme-romantic');
    expect(themes.birthday.className).toBe('theme-birthday');
    expect(themes.friendship.className).toBe('theme-friendship');
  });
});

describe('themes - getTheme helper', () => {
  it('returns theme by id', () => {
    expect(getTheme('romantic').name).toBe('Romantic');
    expect(getTheme('birthday').name).toBe('Birthday');
    expect(getTheme('friendship').name).toBe('Friendship');
  });

  it('returns null for unknown id', () => {
    expect(getTheme('unknown')).toBeNull();
    expect(getTheme('')).toBeNull();
    expect(getTheme(null)).toBeNull();
    expect(getTheme(undefined)).toBeNull();
  });
});

describe('themes - getThemeIds helper', () => {
  it('returns all 3 theme ids', () => {
    expect(getThemeIds()).toEqual(['romantic', 'birthday', 'friendship']);
  });
});

// ============ WHITE BOX TESTS: Short ID Generator ============

describe('generateShortId', () => {
  it('generates 8-character IDs', () => {
    expect(generateShortId()).toHaveLength(8);
  });

  it('generates alphanumeric IDs only', () => {
    for (let i = 0; i < 100; i++) {
      expect(generateShortId()).toMatch(/^[A-Za-z0-9]{8}$/);
    }
  });

  it('generates unique IDs (probabilistic)', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateShortId());
    }
    // 1000 IDs of 8 chars from 62-char alphabet: collision probability ~0
    expect(ids.size).toBe(1000);
  });

  it('produces different results across calls', () => {
    expect(generateShortId()).not.toBe(generateShortId());
  });
});
