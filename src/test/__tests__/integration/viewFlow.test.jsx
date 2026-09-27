import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import View from '../../../pages/View';

// ============ BLACK BOX TESTS: Letter Viewing Experience (Recipient) ===
// Simulates a recipient opening a shared letter link

const seedLetter = (overrides = {}) => {
  const letter = {
    short_id: 'test1234',
    sender_name: 'Alice',
    recipient_name: 'Bob',
    title: 'Happy Valentine Day',
    message: 'My love,\nYou mean everything to me.\n\nWith love,\nAlice',
    theme: 'romantic',
    decorations: [{ id: 'heart', emoji: '❤️', label: 'Heart' }],
    sounds_enabled: true,
    music_enabled: false,
    created_at: new Date().toISOString(),
    ...overrides,
  };
  localStorage.setItem('letter_test1234', JSON.stringify(letter));
  return letter;
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
});

describe('View flow - loading', () => {
  it('resolves loading quickly for missing letter (sync localStorage)', async () => {
    // Loading resolves almost instantly since localStorage is synchronous.
    // Verify the page transitions to a stable state instead.
    renderView('missing12');
    expect(
      await screen.findByText(/Letter Not Found/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
  });
});

describe('View flow - valid letter', () => {
  it('shows envelope with sender and recipient names', async () => {
    seedLetter();
    renderView();

    expect(
      await screen.findByText(/You've got a letter/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('has an open envelope interaction', async () => {
    seedLetter();
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    expect(envelope).toBeInTheDocument();
    expect(screen.getByText(/Tap to open/)).toBeInTheDocument();
  });

  it('reveals letter content when envelope opened', async () => {
    seedLetter();
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    // Letter message should appear after animation
    await waitFor(
      () => {
        expect(screen.getByText(/You mean everything to me/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it('shows title and sender signature after opening', async () => {
    seedLetter();
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText('Happy Valentine Day')).toBeInTheDocument();
        expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });

  it('shows decorations when letter has them', async () => {
    seedLetter();
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText('❤️')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it('shows Create a Letter CTA for recipient', async () => {
    seedLetter();
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText(/Create a Letter — It's Free/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});

describe('View flow - friendship theme', () => {
  it('shows flip cards for friendship letters', async () => {
    seedLetter({
      theme: 'friendship',
      title: 'To My Best Friend',
      message: 'Hey you! You are the best.',
    });
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText(/Fun Cards/)).toBeInTheDocument();
        expect(screen.getByText('Roast 🎤')).toBeInTheDocument();
        expect(screen.getByText('Compliment ⭐')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it('flip card reveals back content on click', async () => {
    seedLetter({ theme: 'friendship' });
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText('Roast 🎤')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    fireEvent.click(screen.getByText('Roast 🎤'));
    // The card should now be flipped - back content visible in DOM (CSS hides it visually)
    expect(screen.getByText(/bad habit/)).toBeInTheDocument();
  });
});

describe('View flow - birthday theme', () => {
  it('shows scratch card for birthday letters', async () => {
    seedLetter({
      theme: 'birthday',
      title: 'Happy Birthday!',
      message: 'Wishing you a wonderful day!',
    });
    renderView();

    const envelope = await screen.findByRole('button', { name: /Open envelope/i }, { timeout: 5000 });
    fireEvent.click(envelope);

    await waitFor(
      () => {
        expect(screen.getByText(/Scratch to reveal/)).toBeInTheDocument();
        expect(screen.getByText(/Happy Birthday!/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});

describe('View flow - not found', () => {
  it('shows friendly error for missing letter', async () => {
    renderView('doesnotexist');

    expect(
      await screen.findByText(/Letter Not Found/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
  });

  it('offers way back home from error', async () => {
    renderView('doesnotexist');

    const homeBtn = await screen.findByText(/Go Home/, {}, { timeout: 5000 });
    expect(homeBtn.closest('a')).toHaveAttribute('href', '/');
  });

  it('offers to create own letter from error', async () => {
    renderView('doesnotexist');

    const createBtn = await screen.findByText(/Create Your Own/, {}, { timeout: 5000 });
    expect(createBtn.closest('a')).toHaveAttribute('href', '/create');
  });
});
