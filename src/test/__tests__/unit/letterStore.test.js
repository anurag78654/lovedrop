import { describe, it, expect, beforeEach } from 'vitest';
import useLetterStore from '../../../store/letterStore';

// ============ WHITE BOX TESTS: Zustand Letter Store ============

describe('letterStore - initial state', () => {
  beforeEach(() => {
    useLetterStore.getState().reset();
  });

  it('has correct default letter values', () => {
    const state = useLetterStore.getState();
    expect(state.currentLetter.senderName).toBe('');
    expect(state.currentLetter.recipientName).toBe('');
    expect(state.currentLetter.title).toBe('');
    expect(state.currentLetter.message).toBe('');
    expect(state.currentLetter.theme).toBe('romantic');
    expect(state.currentLetter.decorations).toEqual([]);
    expect(state.currentLetter.soundsEnabled).toBe(true);
    expect(state.currentLetter.musicEnabled).toBe(false);
  });

  it('has null share link initially', () => {
    const state = useLetterStore.getState();
    expect(state.shareLink).toBeNull();
    expect(state.shareId).toBeNull();
  });

  it('is not saving initially', () => {
    expect(useLetterStore.getState().isSaving).toBe(false);
  });
});

describe('letterStore - updateField', () => {
  beforeEach(() => {
    useLetterStore.getState().reset();
  });

  it('updates a single field', () => {
    useLetterStore.getState().updateField('senderName', 'Alice');
    expect(useLetterStore.getState().currentLetter.senderName).toBe('Alice');
  });

  it('updates multiple fields independently', () => {
    const store = useLetterStore.getState();
    store.updateField('senderName', 'Alice');
    store.updateField('recipientName', 'Bob');
    store.updateField('message', 'Hello Bob!');

    const state = useLetterStore.getState();
    expect(state.currentLetter.senderName).toBe('Alice');
    expect(state.currentLetter.recipientName).toBe('Bob');
    expect(state.currentLetter.message).toBe('Hello Bob!');
  });

  it('overwrites existing values', () => {
    useLetterStore.getState().updateField('title', 'First');
    useLetterStore.getState().updateField('title', 'Second');
    expect(useLetterStore.getState().currentLetter.title).toBe('Second');
  });

  it('can update boolean fields', () => {
    useLetterStore.getState().updateField('soundsEnabled', false);
    expect(useLetterStore.getState().currentLetter.soundsEnabled).toBe(false);
  });
});

describe('letterStore - setTheme', () => {
  beforeEach(() => {
    useLetterStore.getState().reset();
  });

  it('sets theme to birthday', () => {
    useLetterStore.getState().setTheme('birthday');
    expect(useLetterStore.getState().currentLetter.theme).toBe('birthday');
  });

  it('sets theme to friendship', () => {
    useLetterStore.getState().setTheme('friendship');
    expect(useLetterStore.getState().currentLetter.theme).toBe('friendship');
  });
});

describe('letterStore - toggleDecoration', () => {
  beforeEach(() => {
    useLetterStore.getState().reset();
  });

  const heart = { id: 'heart', emoji: '❤️', label: 'Heart' };
  const rose = { id: 'rose', emoji: '🌹', label: 'Rose' };

  it('adds a decoration when not present', () => {
    useLetterStore.getState().toggleDecoration(heart);
    expect(useLetterStore.getState().currentLetter.decorations).toHaveLength(1);
    expect(useLetterStore.getState().currentLetter.decorations[0].id).toBe('heart');
  });

  it('removes a decoration when already present', () => {
    useLetterStore.getState().toggleDecoration(heart);
    useLetterStore.getState().toggleDecoration(heart);
    expect(useLetterStore.getState().currentLetter.decorations).toHaveLength(0);
  });

  it('adds multiple decorations', () => {
    useLetterStore.getState().toggleDecoration(heart);
    useLetterStore.getState().toggleDecoration(rose);
    expect(useLetterStore.getState().currentLetter.decorations).toHaveLength(2);
  });

  it('toggling three times results in one item', () => {
    useLetterStore.getState().toggleDecoration(heart);
    useLetterStore.getState().toggleDecoration(heart);
    useLetterStore.getState().toggleDecoration(heart);
    expect(useLetterStore.getState().currentLetter.decorations).toHaveLength(1);
  });
});

describe('letterStore - saveLetter validation', () => {
  beforeEach(() => {
    useLetterStore.getState().reset();
  });

  it('rejects when sender name is empty', async () => {
    useLetterStore.getState().updateField('recipientName', 'Bob');
    useLetterStore.getState().updateField('message', 'Hi');
    const result = await useLetterStore.getState().saveLetter();
    expect(result).toBeNull();
    expect(useLetterStore.getState().error).toContain('sender and recipient');
  });

  it('rejects when recipient name is empty', async () => {
    useLetterStore.getState().updateField('senderName', 'Alice');
    useLetterStore.getState().updateField('message', 'Hi');
    const result = await useLetterStore.getState().saveLetter();
    expect(result).toBeNull();
    expect(useLetterStore.getState().error).toContain('sender and recipient');
  });

  it('rejects when message is empty', async () => {
    useLetterStore.getState().updateField('senderName', 'Alice');
    useLetterStore.getState().updateField('recipientName', 'Bob');
    const result = await useLetterStore.getState().saveLetter();
    expect(result).toBeNull();
    expect(useLetterStore.getState().error).toContain('message');
  });

  it('saves valid letter to localStorage and returns share URL', async () => {
    useLetterStore.getState().updateField('senderName', 'Alice');
    useLetterStore.getState().updateField('recipientName', 'Bob');
    useLetterStore.getState().updateField('message', 'Hello Bob!');
    useLetterStore.getState().updateField('title', 'Hi');

    const result = await useLetterStore.getState().saveLetter();

    expect(result).toMatch(/\/letter\/[A-Za-z0-9]{8}$/);
    expect(useLetterStore.getState().shareLink).toBe(result);
    expect(useLetterStore.getState().error).toBeNull();
    expect(useLetterStore.getState().isSaving).toBe(false);

    // Verify stored in localStorage (Supabase not configured in tests)
    const keys = Object.keys(localStorage);
    const letterKey = keys.find((k) => k.startsWith('letter_'));
    expect(letterKey).toBeDefined();

    const stored = JSON.parse(localStorage.getItem(letterKey));
    expect(stored.sender_name).toBe('Alice');
    expect(stored.recipient_name).toBe('Bob');
    expect(stored.message).toBe('Hello Bob!');
    expect(stored.theme).toBe('romantic');
    expect(stored.short_id).toHaveLength(8);
  });

  it('generates unique IDs for different letters', async () => {
    useLetterStore.getState().updateField('senderName', 'A');
    useLetterStore.getState().updateField('recipientName', 'B');
    useLetterStore.getState().updateField('message', 'M1');
    const first = await useLetterStore.getState().saveLetter();

    useLetterStore.getState().reset();
    useLetterStore.getState().updateField('senderName', 'A');
    useLetterStore.getState().updateField('recipientName', 'B');
    useLetterStore.getState().updateField('message', 'M2');
    const second = await useLetterStore.getState().saveLetter();

    expect(first).not.toBe(second);
  });
});

describe('letterStore - reset', () => {
  it('clears all letter data', () => {
    useLetterStore.getState().updateField('senderName', 'Alice');
    useLetterStore.getState().updateField('message', 'Test');
    useLetterStore.getState().setTheme('birthday');
    useLetterStore.getState().reset();

    const state = useLetterStore.getState();
    expect(state.currentLetter.senderName).toBe('');
    expect(state.currentLetter.message).toBe('');
    expect(state.currentLetter.theme).toBe('romantic');
    expect(state.shareLink).toBeNull();
    expect(state.error).toBeNull();
  });
});
