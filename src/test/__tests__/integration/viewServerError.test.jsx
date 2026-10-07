import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import View from '../../../pages/View';
import { fetchLetter } from '../../../lib/supabase';

// Supabase reachable in these tests so the server-error branch is exercised
vi.mock('../../../lib/supabase', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    supabase: { mocked: true },
    fetchLetter: vi.fn(),
  };
});

const letter = {
  short_id: 'test1234',
  sender_name: 'Alice',
  recipient_name: 'Bob',
  title: 'Hello',
  message: 'Server is back online',
  theme: 'romantic',
  decorations: [],
  sounds_enabled: true,
  music_enabled: false,
  created_at: new Date().toISOString(),
};

const renderView = (id = 'test1234') =>
  render(
    <MemoryRouter initialEntries={[`/letter/${id}`]}>
      <Routes>
        <Route path="/letter/:id" element={<View />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  fetchLetter.mockReset();
});

describe('View - server unreachable', () => {
  it('shows a retry screen instead of a misleading "Letter not found"', async () => {
    fetchLetter.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });

    renderView();

    expect(await screen.findByText(/Can't reach LoveDrop/, {}, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.queryByText(/Letter Not Found/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });

  it('retry recovers once the server responds', async () => {
    fetchLetter
      .mockResolvedValueOnce({ data: null, error: { message: 'Failed to fetch' } })
      .mockResolvedValueOnce({ data: letter, error: null });

    renderView();

    const retryBtn = await screen.findByRole('button', { name: /Try Again/i }, { timeout: 5000 });
    fireEvent.click(retryBtn);

    expect(
      await screen.findByText(/You've got a letter/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(fetchLetter).toHaveBeenCalledTimes(2);
  });

  it('still shows the real not-found screen for a missing letter', async () => {
    fetchLetter.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116', message: 'no rows returned' },
    });

    renderView('gone1234');

    expect(await screen.findByText(/Letter Not Found/, {}, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Try Again/i })).not.toBeInTheDocument();
  });
});

describe('View - local fallback while server is down', () => {
  it('opens a locally saved letter even when the cloud is unreachable', async () => {
    localStorage.setItem('letter_test1234', JSON.stringify(letter));
    fetchLetter.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });

    renderView();

    expect(
      await screen.findByText(/You've got a letter/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
  });
});
