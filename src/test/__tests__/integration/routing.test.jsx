import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';

// ============ BLACK BOX TESTS: Routing & Page Rendering ============
// Tests the app purely from user's perspective - no internal knowledge

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

describe('Home page (/)', () => {
  it('renders the LoveDrop brand', () => {
    renderAt('/');
    expect(screen.getAllByText(/LoveDrop/).length).toBeGreaterThan(0);
  });

  it('renders main heading', () => {
    renderAt('/');
    expect(screen.getByText(/Send a/)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful Letter/)).toBeInTheDocument();
  });

  it('shows Create Your Letter call-to-action', () => {
    renderAt('/');
    expect(screen.getAllByText(/Create Your Letter/).length).toBeGreaterThan(0);
  });

  it('shows all 3 theme cards', () => {
    renderAt('/');
    expect(screen.getByText('Romantic')).toBeInTheDocument();
    expect(screen.getByText('Birthday')).toBeInTheDocument();
    expect(screen.getByText('Friendship')).toBeInTheDocument();
  });

  it('explains how it works in 3 steps', () => {
    renderAt('/');
    expect(screen.getByText('STEP 1')).toBeInTheDocument();
    expect(screen.getByText('STEP 2')).toBeInTheDocument();
    expect(screen.getByText('STEP 3')).toBeInTheDocument();
  });

  it('has navigation links', () => {
    renderAt('/');
    expect(screen.getAllByRole('link', { name: /Create a Letter/i }).length).toBeGreaterThan(0);
  });

  it('lists feature highlights', () => {
    renderAt('/');
    expect(screen.getByText('Confetti Effects')).toBeInTheDocument();
    expect(screen.getByText('Heart Particles')).toBeInTheDocument();
    expect(screen.getByText('Mini Games')).toBeInTheDocument();
  });
});

describe('Gallery page (/gallery)', () => {
  it('renders gallery heading', () => {
    renderAt('/gallery');
    expect(
      screen.getByRole('heading', { name: /Letter Gallery/ })
    ).toBeInTheDocument();
  });

  it('shows theme filter buttons', () => {
    renderAt('/gallery');
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getAllByText(/Romantic/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Birthday/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Friendship/).length).toBeGreaterThan(0);
  });

  it('displays letter templates', () => {
    renderAt('/gallery');
    // Templates from themes should appear
    expect(screen.getAllByText(/Happy Valentine|To My Best Friend|Happy Birthday/i).length).toBeGreaterThan(0);
  });
});

describe('Create page (/create)', () => {
  it('starts at step 1 - theme selection', () => {
    renderAt('/create');
    expect(screen.getByText('Choose Your Theme')).toBeInTheDocument();
  });

  it('shows all 3 theme options', () => {
    renderAt('/create');
    expect(screen.getAllByText('Romantic').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Birthday').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Friendship').length).toBeGreaterThan(0);
  });

  it('has a continue button', () => {
    renderAt('/create');
    expect(screen.getByText(/Continue/)).toBeInTheDocument();
  });

  it('accepts theme via URL query parameter', () => {
    renderAt('/create?theme=birthday');
    // The continue step should still show, theme preselected
    expect(screen.getByText('Choose Your Theme')).toBeInTheDocument();
  });
});

describe('View page (/letter/:id)', () => {
  it('shows friendly not-found state for missing letter', async () => {
    renderAt('/letter/nonexistent');
    expect(
      await screen.findByText(/Letter Not Found/, {}, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(screen.getByText(/Ask the sender/)).toBeInTheDocument();
  });

  it('shows home link when letter not found', async () => {
    renderAt('/letter/missing');
    const homeLink = await screen.findByText(/Go Home/, {}, { timeout: 5000 });
    expect(homeLink).toBeInTheDocument();
  });
});

describe('Unknown routes (404)', () => {
  it('shows friendly 404 page for unknown paths', () => {
    renderAt('/totally-unknown');
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/This letter got lost in the mail/)
    ).toBeInTheDocument();
  });

  it('404 page offers way back home', () => {
    renderAt('/nope');
    const homeLink = screen.getByRole('link', { name: /Back to Home/ });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('404 page offers to create a letter', () => {
    renderAt('/nope');
    const createLink = screen.getByRole('link', { name: /Send a Letter/ });
    expect(createLink).toHaveAttribute('href', '/create');
  });
});
