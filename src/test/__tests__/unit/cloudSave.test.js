import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLetterStore from '../../../store/letterStore';
import { saveLetter } from '../../../lib/supabase';

// Make Supabase look configured so we exercise the real cloud-save path
vi.mock('../../../lib/supabase', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    supabase: { mocked: true },
    saveLetter: vi.fn(),
  };
});

const fillValidLetter = () => {
  const s = useLetterStore.getState();
  s.updateField('senderName', 'Alice');
  s.updateField('recipientName', 'Bob');
  s.updateField('message', 'Hello Bob!');
};

beforeEach(() => {
  localStorage.clear();
  useLetterStore.getState().reset();
  saveLetter.mockReset();
});

describe('letterStore - cloud save failure (share link must survive)', () => {
  it('still returns a share link when the DB rejects the insert', async () => {
    saveLetter.mockResolvedValue({
      data: null,
      error: {
        code: 'PGRST204',
        message: "Could not find the 'unlock_date' column of 'letters' in the schema cache",
      },
    });

    fillValidLetter();
    const url = await useLetterStore.getState().saveLetter();

    expect(url).toMatch(/\/letter\/[A-Za-z0-9]{8}$/);
    const state = useLetterStore.getState();
    expect(state.shareLink).toBe(url);
    expect(state.error).toBeNull();
    expect(state.isSaving).toBe(false);
    expect(state.localOnly).toBe(true);
    expect(state.saveWarning).toMatch(/only works in this browser/i);
    expect(state.saveWarningDetail).toMatch(/unlock_date/);
  });

  it('writes the letter to localStorage so the sender can still open it', async () => {
    saveLetter.mockResolvedValue({ data: null, error: { message: 'boom' } });

    fillValidLetter();
    await useLetterStore.getState().saveLetter();

    const shortId = useLetterStore.getState().shareId;
    const stored = JSON.parse(localStorage.getItem(`letter_${shortId}`));
    expect(stored.message).toBe('Hello Bob!');
  });

  it('still returns a share link when the request throws (offline)', async () => {
    saveLetter.mockRejectedValue(new Error('Failed to fetch'));

    fillValidLetter();
    const url = await useLetterStore.getState().saveLetter();

    expect(url).toMatch(/\/letter\/[A-Za-z0-9]{8}$/);
    const state = useLetterStore.getState();
    expect(state.localOnly).toBe(true);
    expect(state.saveWarning).toMatch(/only works in this browser/i);
    expect(state.error).toBeNull();
    expect(state.isSaving).toBe(false);
  });

  it('flags demo mode (no Supabase keys) as device-only too', async () => {
    saveLetter.mockResolvedValue({ data: null, error: 'Supabase not configured' });

    fillValidLetter();
    await useLetterStore.getState().saveLetter();

    const state = useLetterStore.getState();
    expect(state.localOnly).toBe(true);
    expect(state.saveWarning).toMatch(/offline demo mode/i);
    expect(state.saveWarning).toMatch(/only works in this browser/i);
  });

  it('counts toward the rate limit even when saving locally', async () => {
    saveLetter.mockResolvedValue({ data: null, error: { message: 'boom' } });

    fillValidLetter();
    await useLetterStore.getState().saveLetter();

    expect(localStorage.getItem('lovedrop_rate_limit')).toBeTruthy();
  });
});

describe('letterStore - successful cloud save', () => {
  it('marks the link as shareable everywhere', async () => {
    saveLetter.mockResolvedValue({
      data: { short_id: 'AbCdEfGh' },
      error: null,
    });

    fillValidLetter();
    const url = await useLetterStore.getState().saveLetter();

    const state = useLetterStore.getState();
    expect(url).toMatch(/\/letter\/[A-Za-z0-9]{8}$/);
    expect(state.localOnly).toBe(false);
    expect(state.saveWarning).toBeNull();
    expect(state.saveWarningDetail).toBeNull();
    expect(state.error).toBeNull();
  });

  it('reset() clears the device-only flags', async () => {
    saveLetter.mockResolvedValue({ data: null, error: { message: 'boom' } });

    fillValidLetter();
    await useLetterStore.getState().saveLetter();
    expect(useLetterStore.getState().localOnly).toBe(true);

    useLetterStore.getState().reset();
    const state = useLetterStore.getState();
    expect(state.localOnly).toBe(false);
    expect(state.saveWarning).toBeNull();
    expect(state.shareLink).toBeNull();
  });
});
