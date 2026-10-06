import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { applyLetterMeta, resetMeta } from '../../../lib/seo';

beforeEach(() => {
  document.title = 'LoveDrop - Send Beautiful Virtual Letters';
});

afterEach(() => {
  document.title = '';
});

describe('applyLetterMeta', () => {
  const letter = {
    sender_name: 'Anu',
    recipient_name: 'Riya',
    title: 'Happy Birthday',
    message: 'Wishing you the happiest birthday ever! Love you tons.',
  };

  it('sets document title from letter', () => {
    applyLetterMeta(letter);
    expect(document.title).toContain('Happy Birthday');
    expect(document.title).toContain('Riya');
    expect(document.title).toContain('LoveDrop');
  });

  it('falls back to sender/recipient when no title', () => {
    applyLetterMeta({ ...letter, title: '' });
    expect(document.title).toContain('A letter from Anu');
  });

  it('updates og:title meta tag', () => {
    applyLetterMeta(letter);
    const og = document.querySelector('meta[property="og:title"]');
    expect(og).toBeTruthy();
    expect(og.getAttribute('content')).toContain('Happy Birthday');
  });

  it('updates twitter:description meta tag', () => {
    applyLetterMeta(letter);
    const tw = document.querySelector('meta[name="twitter:description"]');
    expect(tw).toBeTruthy();
    expect(tw.getAttribute('content')).toContain('Wishing you');
  });

  it('truncates long messages in description', () => {
    applyLetterMeta({ ...letter, message: 'x'.repeat(300) });
    const og = document.querySelector('meta[property="og:description"]');
    expect(og.getAttribute('content').length).toBeLessThanOrEqual(121);
  });

  it('does nothing for null letter', () => {
    expect(() => applyLetterMeta(null)).not.toThrow();
  });
});

describe('resetMeta', () => {
  it('restores default title', () => {
    applyLetterMeta({ sender_name: 'A', recipient_name: 'B', title: 'Hi', message: 'yo' });
    resetMeta();
    expect(document.title).toBe('LoveDrop - Send Beautiful Virtual Letters');
  });

  it('restores default og:title', () => {
    applyLetterMeta({ sender_name: 'A', recipient_name: 'B', title: 'Hi', message: 'yo' });
    resetMeta();
    const og = document.querySelector('meta[property="og:title"]');
    expect(og.getAttribute('content')).toBe('LoveDrop - Send Beautiful Virtual Letters');
  });
});
