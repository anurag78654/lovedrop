import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { getInitialTheme, applyTheme, toggleTheme } from '../../../lib/theme';
import ThemeToggle from '../../../components/ui/ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  // Default: system prefers light
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  window.matchMedia = globalThis.matchMedia;
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.classList.remove('dark');
});

describe('getInitialTheme', () => {
  it('returns saved dark', () => {
    localStorage.setItem('lovedrop-theme', 'dark');
    expect(getInitialTheme()).toBe('dark');
  });

  it('returns saved light', () => {
    localStorage.setItem('lovedrop-theme', 'light');
    expect(getInitialTheme()).toBe('light');
  });

  it('falls back to system preference when nothing saved', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(getInitialTheme()).toBe('dark');
  });

  it('defaults to light when system prefers light', () => {
    expect(getInitialTheme()).toBe('light');
  });
});

describe('applyTheme', () => {
  it('adds dark class for dark theme', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class for light theme', () => {
    document.documentElement.classList.add('dark');
    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists choice', () => {
    applyTheme('dark');
    expect(localStorage.getItem('lovedrop-theme')).toBe('dark');
  });
});

describe('toggleTheme', () => {
  it('flips dark to light', () => {
    expect(toggleTheme('dark')).toBe('light');
  });
  it('flips light to dark', () => {
    expect(toggleTheme('light')).toBe('dark');
  });
});

describe('ThemeToggle component', () => {
  it('renders accessible toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it('clicking switches to dark and updates label', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    expect(localStorage.getItem('lovedrop-theme')).toBe('dark');
  });
});
