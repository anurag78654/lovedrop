import { useState } from 'react';

/**
 * Tic-Tac-Toe game for couples/friends
 *
 * @param {Object} props
 * @param {string} props.player1Name - First player name
 * @param {string} props.player2Name - Second player name
 */
export default function TicTacToe({ player1Name = 'Player 1', player2Name = 'Player 2' }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for winner after move
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setScores((prev) => ({
        ...prev,
        [gameWinner === 'X' ? 'x' : 'o']: prev[gameWinner === 'X' ? 'x' : 'o'] + 1,
      }));
    } else if (newBoard.every((cell) => cell !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetAll = () => {
    reset();
    setScores({ x: 0, o: 0, draws: 0 });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
        ⭕ Tic-Tac-Toe
      </h3>

      {/* Scoreboard */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 font-medium">
          X: {player1Name} ({scores.x})
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 font-medium">
          Draws: {scores.draws}
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium">
          O: {player2Name} ({scores.o})
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 text-lg font-medium h-7">
        {winner ? (
          <span className="text-primary-600 animate-bounce">
            🎉 {winner === 'X' ? player1Name : player2Name} wins!
          </span>
        ) : isDraw ? (
          <span className="text-gray-500">It's a draw! 🤝</span>
        ) : (
          <span className="text-gray-700">
            {isXNext ? '⭕' : '❌'} {isXNext ? player1Name : player2Name}'s turn
          </span>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl font-bold rounded-xl
              transition-all duration-200 flex items-center justify-center
              ${
                cell
                  ? 'bg-gray-50 scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
              }
              ${winner && isWinningCell(index, board) ? 'bg-yellow-100 animate-pulse' : ''}
            `}
            aria-label={`Cell ${index + 1}${cell ? `, marked ${cell}` : ', empty'}`}
          >
            {cell === 'X' ? '❌' : cell === 'O' ? '⭕' : ''}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          🔄 New Game
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          🗑️ Reset Scores
        </button>
      </div>
    </div>
  );
}

// Helper functions (exported for unit testing)
export function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function isWinningCell(index, board) {
  const winner = calculateWinner(board);
  if (!winner) return false;

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  return lines.some((line) => line.includes(index) && line.every((i) => board[i] === winner));
}
