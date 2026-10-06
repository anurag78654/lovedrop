import { describe, it, expect, beforeEach } from 'vitest';
import useLetterStore from '../../../store/letterStore';

const fillValidLetter = () => {
  const s = useLetterStore.getState();
  s.updateField('senderName', 'Anu');
  s.updateField('recipientName', 'Riya');
  s.updateField('message', 'Hello there!');
};

beforeEach(() => {
  localStorage.clear();
  useLetterStore.getState().reset();
});

describe('unlockDate validation in saveLetter', () => {
  it('accepts letters with no unlock date', async () => {
    fillValidLetter();
    const url = await useLetterStore.getState().saveLetter();
    expect(url).toBeTruthy();
    expect(useLetterStore.getState().error).toBeNull();
  });

  it('accepts future unlock date and stores ISO in localStorage fallback', async () => {
    fillValidLetter();
    // Build datetime-local value in LOCAL time (1 hour from now)
    const d = new Date(Date.now() + 3_600_000);
    const pad = (n) => String(n).padStart(2, '0');
    const localValue = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    useLetterStore.getState().updateField('unlockDate', localValue);
    const url = await useLetterStore.getState().saveLetter();
    expect(url).toBeTruthy();

    const shortId = useLetterStore.getState().shareId;
    const stored = JSON.parse(localStorage.getItem(`letter_${shortId}`));
    expect(stored.unlock_date).toBeTruthy();
    expect(new Date(stored.unlock_date).getTime()).toBeGreaterThan(Date.now());
  });

  it('rejects past unlock date with friendly error', async () => {
    fillValidLetter();
    useLetterStore.getState().updateField('unlockDate', '2020-01-01T10:00');
    const url = await useLetterStore.getState().saveLetter();
    expect(url).toBeNull();
    expect(useLetterStore.getState().error).toMatch(/future/i);
  });

  it('rejects invalid unlock date', async () => {
    fillValidLetter();
    useLetterStore.getState().updateField('unlockDate', 'garbage-date');
    const url = await useLetterStore.getState().saveLetter();
    expect(url).toBeNull();
    expect(useLetterStore.getState().error).toMatch(/invalid/i);
  });

  it('defaults unlockDate to empty string', () => {
    expect(useLetterStore.getState().currentLetter.unlockDate).toBe('');
  });

  it('reset clears unlockDate', () => {
    useLetterStore.getState().updateField('unlockDate', '2027-01-01T10:00');
    useLetterStore.getState().reset();
    expect(useLetterStore.getState().currentLetter.unlockDate).toBe('');
  });
});
