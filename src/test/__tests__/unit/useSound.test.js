import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const mocks = vi.hoisted(() => ({
  play: vi.fn(),
  stop: vi.fn(),
  unload: vi.fn(),
  instances: [],
  Howl: vi.fn(),
  HowlerStop: vi.fn(),
}));

vi.mock('howler', () => ({
  Howl: mocks.Howl.mockImplementation((cfg) => {
    const inst = { cfg, play: mocks.play, stop: mocks.stop, unload: mocks.unload };
    mocks.instances.push(inst);
    return inst;
  }),
  Howler: { stop: mocks.HowlerStop },
}));

import { useSound } from '../../../hooks/useSound';

// Only count background-music Howl constructions (9 SFX preload on mount too)
const bgCalls = () =>
  mocks.Howl.mock.calls.filter((c) => String(c[0]?.src?.[0]).includes('lofi-background'));

beforeEach(() => {
  mocks.play.mockClear();
  mocks.stop.mockClear();
  mocks.unload.mockClear();
  mocks.Howl.mockClear();
  mocks.HowlerStop.mockClear();
  mocks.instances.length = 0;
  localStorage.clear();
  localStorage.setItem('soundEnabled', 'true');
});

describe('useSound - background music', () => {
  it('startMusic creates a looping Howl and marks playing', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.startMusic());

    expect(bgCalls()).toHaveLength(1);
    const cfg = bgCalls()[0][0];
    expect(cfg.loop).toBe(true);
    expect(cfg.volume).toBeLessThanOrEqual(0.3); // quiet background
    expect(mocks.play).toHaveBeenCalled();
    expect(result.current.musicPlaying).toBe(true);
  });

  it('startMusic does not create a second Howl on repeat calls', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.startMusic());
    act(() => result.current.startMusic());

    expect(bgCalls()).toHaveLength(1);
  });

  it('stopMusic stops the track and clears playing state', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.startMusic());
    act(() => result.current.stopMusic());

    expect(mocks.stop).toHaveBeenCalled();
    expect(result.current.musicPlaying).toBe(false);
  });

  it('toggleMusic starts then stops', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.toggleMusic());
    expect(result.current.musicPlaying).toBe(true);

    act(() => result.current.toggleMusic());
    expect(result.current.musicPlaying).toBe(false);
  });

  it('respects global sound preference (disabled = no music)', () => {
    localStorage.setItem('soundEnabled', 'false');
    const { result } = renderHook(() => useSound());

    act(() => result.current.startMusic());

    expect(bgCalls()).toHaveLength(0);
    expect(result.current.musicPlaying).toBe(false);
  });

  it('global toggle off stops music', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.startMusic());
    act(() => result.current.toggle()); // global sounds off

    expect(mocks.HowlerStop).toHaveBeenCalled();
    expect(result.current.musicPlaying).toBe(false);
  });
});

describe('useSound - sound effects', () => {
  it('preloads all sound effects on mount', () => {
    renderHook(() => useSound());
    // openEnvelope, confetti, heartPop, chime, party, pop, scratch, flip, click
    expect(mocks.Howl).toHaveBeenCalledTimes(9);
  });

  it('play triggers the named effect', () => {
    const { result } = renderHook(() => useSound());

    const before = mocks.play.mock.calls.length;
    act(() => result.current.play('openEnvelope'));
    expect(mocks.play.mock.calls.length).toBeGreaterThan(before);
  });

  it('play is a no-op when sounds are disabled', () => {
    localStorage.setItem('soundEnabled', 'false');
    const { result } = renderHook(() => useSound());

    const before = mocks.play.mock.calls.length;
    act(() => result.current.play('click'));
    expect(mocks.play.mock.calls.length).toBe(before);
  });
});
