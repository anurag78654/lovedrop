import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { fetchLetter } from '../../../lib/supabase';
import { useLetter } from '../../../hooks/useLetter';

// Supabase reachable in these tests (Node init normally falls back to null)
vi.mock('../../../lib/supabase', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    supabase: { mocked: true },
    fetchLetter: vi.fn(),
  };
});

const row = {
  short_id: 'abcd1234',
  sender_name: 'Alice',
  recipient_name: 'Bob',
  title: 'Hi',
  message: 'Hello',
  theme: 'romantic',
  decorations: [],
  sounds_enabled: true,
  music_enabled: false,
  created_at: new Date().toISOString(),
};

const renderUseLetter = (id = 'abcd1234') => renderHook(() => useLetter(id));

beforeEach(() => {
  localStorage.clear();
  fetchLetter.mockReset();
});

describe('useLetter - server answers', () => {
  it('returns the letter on success', async () => {
    fetchLetter.mockResolvedValue({ data: row, error: null });

    const { result } = renderUseLetter();
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.letter).toEqual(row);
    expect(result.current.error).toBeNull();
    expect(result.current.errorType).toBeNull();
  });

  it("classifies 'no such row' as not-found, not a server problem", async () => {
    fetchLetter.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116', message: 'JSON object requested, but no rows returned' },
    });

    const { result } = renderUseLetter('missing1');
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.letter).toBeNull();
    expect(result.current.errorType).toBe('not-found');
    expect(result.current.error).toBe('Letter not found');
  });
});

describe('useLetter - server unreachable', () => {
  it('classifies transport failures as server errors', async () => {
    fetchLetter.mockResolvedValue({
      data: null,
      error: { message: 'TypeError: Failed to fetch' },
    });

    const { result } = renderUseLetter('abcd1234');
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.letter).toBeNull();
    expect(result.current.errorType).toBe('server');
    expect(result.current.error).toMatch(/reach the server/i);
    expect(result.current.error).not.toBe('Letter not found');
  });

  it('classifies thrown network errors as server errors', async () => {
    fetchLetter.mockRejectedValue(new Error('network down'));

    const { result } = renderUseLetter('abcd1234');
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.errorType).toBe('server');
    expect(result.current.error).toMatch(/reach the server/i);
  });

  it('falls back to a local copy when the server is down', async () => {
    localStorage.setItem('letter_abcd1234', JSON.stringify(row));
    fetchLetter.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });

    const { result } = renderUseLetter('abcd1234');
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.letter?.sender_name).toBe('Alice');
    expect(result.current.errorType).toBeNull();
  });

  it('reload() retries the fetch', async () => {
    fetchLetter
      .mockResolvedValueOnce({ data: null, error: { message: 'Failed to fetch' } })
      .mockResolvedValueOnce({ data: row, error: null });

    const { result } = renderUseLetter('abcd1234');
    await waitFor(() => expect(result.current.errorType).toBe('server'));

    result.current.reload();
    await waitFor(() => expect(result.current.letter).toEqual(row));
    expect(result.current.errorType).toBeNull();
    expect(fetchLetter).toHaveBeenCalledTimes(2);
  });
});

describe('useLetter - no letter id', () => {
  it('reports not-found without calling the server', async () => {
    const { result } = renderUseLetter('');
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.errorType).toBe('not-found');
    expect(fetchLetter).not.toHaveBeenCalled();
  });
});
