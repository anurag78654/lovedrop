import { describe, it, expect } from 'vitest';
import { calculateWinner, isWinningCell } from '../../../components/games/TicTacToe';

// ============ WHITE BOX TESTS: Tic-Tac-Toe Game Logic ============

describe('calculateWinner - X wins', () => {
  it('detects X winning on top row', () => {
    const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(calculateWinner(board)).toBe('X');
  });

  it('detects X winning on middle row', () => {
    const board = ['O', 'O', null, 'X', 'X', 'X', null, null, null];
    expect(calculateWinner(board)).toBe('X');
  });

  it('detects X winning on bottom row', () => {
    const board = [null, null, null, 'O', 'O', null, 'X', 'X', 'X'];
    expect(calculateWinner(board)).toBe('X');
  });

  it('detects X winning on left column', () => {
    const board = ['X', 'O', 'O', 'X', null, null, 'X', null, null];
    expect(calculateWinner(board)).toBe('X');
  });

  it('detects X winning on main diagonal', () => {
    const board = ['X', 'O', 'O', null, 'X', null, null, null, 'X'];
    expect(calculateWinner(board)).toBe('X');
  });

  it('detects X winning on anti-diagonal', () => {
    const board = ['O', 'O', 'X', null, 'X', null, 'X', null, null];
    expect(calculateWinner(board)).toBe('X');
  });
});

describe('calculateWinner - O wins', () => {
  it('detects O winning on right column', () => {
    const board = ['X', 'X', 'O', 'X', null, 'O', null, null, 'O'];
    expect(calculateWinner(board)).toBe('O');
  });

  it('detects O winning on middle column', () => {
    const board = ['X', 'O', 'X', null, 'O', null, 'X', 'O', null];
    expect(calculateWinner(board)).toBe('O');
  });
});

describe('calculateWinner - no winner', () => {
  it('returns null for empty board', () => {
    const board = Array(9).fill(null);
    expect(calculateWinner(board)).toBeNull();
  });

  it('returns null for in-progress game', () => {
    const board = ['X', 'O', 'X', null, 'O', null, null, null, null];
    expect(calculateWinner(board)).toBeNull();
  });

  it('returns null for a draw board', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calculateWinner(board)).toBeNull();
  });

  it('returns null even with full board and no line', () => {
    const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'O'];
    expect(calculateWinner(board)).toBeNull();
  });

  it('prefers first winning line when multiple exist (X, X, X top)', () => {
    // X wins both top row and left column
    const board = ['X', 'X', 'X', 'X', 'O', 'O', 'O', null, null];
    expect(calculateWinner(board)).toBe('X');
  });
});

describe('calculateWinner - input edge cases', () => {
  it('handles undefined cells gracefully', () => {
    const board = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    expect(calculateWinner(board)).toBeNull();
  });

  it('does not crash with invalid cell values', () => {
    const board = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    expect(calculateWinner(board)).toBeNull();
  });
});

describe('isWinningCell', () => {
  it('returns true for cells in winning line', () => {
    const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(isWinningCell(0, board)).toBe(true);
    expect(isWinningCell(1, board)).toBe(true);
    expect(isWinningCell(2, board)).toBe(true);
  });

  it('returns false for cells not in winning line', () => {
    const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(isWinningCell(3, board)).toBe(false);
    expect(isWinningCell(4, board)).toBe(false);
  });

  it('returns false when no winner', () => {
    const board = ['X', 'O', null, null, null, null, null, null, null];
    expect(isWinningCell(0, board)).toBe(false);
  });

  it('handles diagonal winner cells', () => {
    const board = ['O', 'O', 'X', null, 'X', null, 'X', null, null];
    // X wins on anti-diagonal: positions 2, 4, 6
    expect(isWinningCell(2, board)).toBe(true);
    expect(isWinningCell(4, board)).toBe(true);
    expect(isWinningCell(6, board)).toBe(true);
    // O is NOT in the winning line
    expect(isWinningCell(0, board)).toBe(false);
    expect(isWinningCell(1, board)).toBe(false);
  });
});
