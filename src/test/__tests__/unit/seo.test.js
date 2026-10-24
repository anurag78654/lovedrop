import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { applyLetterMeta, resetMeta, setCanonical } from '../../../lib/seo';

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

  it('marks letter pages as noindex for privacy', () => {
    applyLetterMeta(letter);
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toBeTruthy();
    expect(robots.getAttribute('content')).toContain('noindex');
  });
});

describe('setCanonical', () => {
  it('sets canonical link for a path', () => {
    setCanonical('/create');
    const link = document.querySelector('link[rel="canonical"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://lovedrop.pages.dev/create');
  });

  it('uses trailing slash for home page', () => {
    setCanonical('/');
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://lovedrop.pages.dev/'
    );
  });

  it('keeps og:url in sync', () => {
    setCanonical('/gallery');
    expect(document.querySelector('meta[property="og:url"]').getAttribute('content')).toBe(
      'https://lovedrop.pages.dev/gallery'
    );
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

  it('removes noindex robots tag when leaving letter page', () => {
    applyLetterMeta({ sender_name: 'A', recipient_name: 'B', title: 'Hi', message: 'yo' });
    resetMeta();
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });
});
