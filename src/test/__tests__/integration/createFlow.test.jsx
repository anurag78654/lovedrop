import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Create from '../../../pages/Create';
import useLetterStore from '../../../store/letterStore';

// ============ BLACK BOX TESTS: Letter Creation User Flow ============
// Simulates a real user creating a letter through the UI

const renderCreate = (path = '/create') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Create />
    </MemoryRouter>
  );

beforeEach(() => {
  useLetterStore.getState().reset();
});

describe('Create flow - Step 1: Theme selection', () => {
  it('shows theme selection as first step', () => {
    renderCreate();
    expect(screen.getByText('Choose Your Theme')).toBeInTheDocument();
    expect(screen.getByText(/Pick the perfect occasion/)).toBeInTheDocument();
  });

  it('shows all three occasions', () => {
    renderCreate();
    expect(screen.getAllByText(/Valentine/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Birthday/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Best Friend/).length).toBeGreaterThan(0);
  });

  it('user can select a theme and continue', () => {
    renderCreate();
    // Select the Birthday theme card (h3 heading, not the occasion chip)
    const birthdayCard = screen.getAllByText('Birthday')[0];
    fireEvent.click(birthdayCard);
    fireEvent.click(screen.getByText(/Continue/));

    // Step 2 should appear
    expect(screen.getByText(/Write Your Letter/)).toBeInTheDocument();
  });
});

describe('Create flow - Step 2: Letter editing', () => {
  const goToStep2 = () => {
    renderCreate();
    fireEvent.click(screen.getByText(/Continue/));
  };

  it('shows sender and recipient inputs', () => {
    goToStep2();
    expect(screen.getByPlaceholderText('Your name...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Their name...')).toBeInTheDocument();
  });

  it('shows message textarea with counter', () => {
    goToStep2();
    expect(screen.getByPlaceholderText('Write something beautiful...')).toBeInTheDocument();
    expect(screen.getByText(/0\/2000 characters/)).toBeInTheDocument();
  });

  it('updates character count as user types', () => {
    goToStep2();
    const textarea = screen.getByPlaceholderText('Write something beautiful...');
    fireEvent.change(textarea, { target: { value: 'Hello there!' } });
    expect(screen.getByText(/12\/2000 characters/)).toBeInTheDocument();
  });

  it('shows quick templates for the selected theme', () => {
    goToStep2();
    expect(screen.getByText(/Quick Templates/)).toBeInTheDocument();
    // Romantic theme (default) templates
    expect(screen.getByText(/Happy Valentine/)).toBeInTheDocument();
  });

  it('clicking a template fills title and message', () => {
    goToStep2();
    fireEvent.click(screen.getByText(/Happy Anniversary/));
    const textarea = screen.getByPlaceholderText('Write something beautiful...');
    expect(textarea.value).toContain('My dearest');
  });

  it('shows decoration picker', () => {
    goToStep2();
    expect(screen.getByText(/Add Decorations/)).toBeInTheDocument();
    expect(screen.getByTitle('Heart')).toBeInTheDocument();
  });

  it('toggles decoration on click', () => {
    goToStep2();
    const heartBtn = screen.getByTitle('Heart');
    fireEvent.click(heartBtn);
    expect(screen.getByText(/1 decoration/)).toBeInTheDocument();
    fireEvent.click(heartBtn);
    expect(screen.queryByText(/1 decoration/)).not.toBeInTheDocument();
  });

  it('has sound and music toggles', () => {
    goToStep2();
    expect(screen.getByText(/Sound effects/)).toBeInTheDocument();
    expect(screen.getByText(/Background music/)).toBeInTheDocument();
  });

  it('disables Continue when required fields empty', () => {
    goToStep2();
    const continueBtn = screen.getByText(/Continue/).closest('button');
    expect(continueBtn).toBeDisabled();
  });

  it('enables Continue when all required fields filled', () => {
    goToStep2();
    fireEvent.change(screen.getByPlaceholderText('Your name...'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByPlaceholderText('Their name...'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByPlaceholderText('Write something beautiful...'), {
      target: { value: 'Hi Bob!' },
    });

    const continueBtn = screen.getByText(/Continue/).closest('button');
    expect(continueBtn).toBeEnabled();
  });

  it('shows live preview with entered names', () => {
    goToStep2();
    expect(screen.getByText(/Live Preview/)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Your name...'), {
      target: { value: 'Alice' },
    });
    expect(screen.getAllByText('Alice').length).toBeGreaterThan(1); // input + preview
  });

  it('user can go back to step 1', () => {
    goToStep2();
    fireEvent.click(screen.getAllByText(/← Back/)[0]);
    expect(screen.getByText('Choose Your Theme')).toBeInTheDocument();
  });
});

describe('Create flow - Step 3: Preview & share', () => {
  const goToStep3 = () => {
    renderCreate();
    fireEvent.click(screen.getByText(/Continue/)); // step 1 -> 2
    fireEvent.change(screen.getByPlaceholderText('Your name...'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByPlaceholderText('Their name...'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByPlaceholderText('Write something beautiful...'), {
      target: { value: 'Hello Bob, this is a test letter!' },
    });
    fireEvent.click(screen.getByText(/Continue/)); // step 2 -> 3
  };

  it('shows final preview step', () => {
    goToStep3();
    expect(screen.getByText(/Your Letter is Ready/)).toBeInTheDocument();
  });

  it('displays settings summary', () => {
    goToStep3();
    expect(screen.getByText(/Sounds: ON/)).toBeInTheDocument();
    expect(screen.getByText(/Music: OFF/)).toBeInTheDocument();
  });

  it('shows edit and create buttons', () => {
    goToStep3();
    expect(screen.getByText(/Edit Letter/)).toBeInTheDocument();
    expect(screen.getByText(/Create Share Link/)).toBeInTheDocument();
  });

  it('creates share link and shows share modal', async () => {
    goToStep3();
    fireEvent.click(screen.getByText(/Create Share Link/));

    await waitFor(
      () => {
        expect(screen.getByText(/Your Letter is Ready!/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Share modal should contain a URL
    await waitFor(() => {
      const linkInput = document.querySelector('input[readonly]');
      expect(linkInput).toBeTruthy();
      expect(linkInput.value).toMatch(/\/letter\/[A-Za-z0-9]{8}$/);
    });
  });

  it('copy button changes to Copied after click', async () => {
    goToStep3();
    fireEvent.click(screen.getByText(/Create Share Link/));

    const copyBtn = await screen.findByText(/Copy/, {}, { timeout: 5000 });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(screen.getByText(/Copied!/)).toBeInTheDocument();
    });
  });

  it('user can return to edit from step 3', () => {
    goToStep3();
    fireEvent.click(screen.getByText(/Edit Letter/));
    expect(screen.getByText(/Write Your Letter/)).toBeInTheDocument();
  });
});
