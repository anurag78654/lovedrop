import { vi, beforeEach, afterAll, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

// Mock canvas-confetti (needs real canvas which is unavailable in test env)
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock localStorage (ensure clean state per test)
beforeEach(() => {
  localStorage.clear();
});

// Mock navigator.clipboard (getter-only in happy-dom, so use defineProperty)
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
  configurable: true,
});

// Silence React Router future flag warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router')) return;
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
