import { useState, useEffect, useRef } from 'react';

/**
 * Memory Match game - find matching pairs
 *
 * @param {Object} props
 * @param {number} props.pairs - Number of pairs (default 6)
 */
export default function MemoryMatch({ pairs = 6 }) {
  const emojis = ['❤️', '🎂', '🤝', '🌟', '🎈', '🌹', '⚡', '🎁', '🎵', '🌈'];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const timersRef = useRef([]);

  // Clear pending timers on unmount (prevents state updates after unmount)
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  // Initialize cards
  useEffect(() => {
    resetGame();
  }, [pairs]);

  const resetGame = () => {
    const selectedEmojis = emojis.slice(0, pairs);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];

    // Shuffle
    const shuffled = cardPairs
      .map((emoji, i) => ({ id: i, emoji }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (isChecking) return;
    if (flipped.includes(id) || matched.includes(id)) return;
    if (flipped.length === 2) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        timersRef.current.push(
          setTimeout(() => {
            setMatched((prev) => [...prev, first, second]);
            setFlipped([]);
            setIsChecking(false);
          }, 500)
        );
      } else {
        // No match - flip back
        timersRef.current.push(
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 1000)
        );
      }
    }
  };

  const isComplete = matched.length === cards.length;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
        🧠 Memory Match
      </h3>

      {/* Stats */}
      <div className="flex gap-4 mb-4 text-sm text-gray-600">
        <span>Moves: <strong>{moves}</strong></span>
        <span>Pairs: <strong>{matched.length / 2}/{pairs}</strong></span>
      </div>

      {/* Win message */}
      {isComplete && (
        <div className="mb-4 p-3 bg-primary-50 rounded-xl text-center animate-bounce">
          <p className="text-primary-700 font-bold">
            🎉 You did it in {moves} moves!
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = matched.includes(card.id);
          const isShown = isFlipped || isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                w-16 h-16 md:w-18 md:h-18 rounded-xl text-2xl font-bold
                transition-all duration-300 flex items-center justify-center
                ${
                  isMatched
                    ? 'bg-primary-50 border-2 border-primary-200 scale-105'
                    : isFlipped
                    ? 'bg-gray-100 border-2 border-gray-300 rotate-y-180'
                    : 'bg-gradient-to-br from-primary-400 to-primary-600 hover:scale-105 hover:shadow-md'
                }
              `}
              style={{ transform: isFlipped && !isMatched ? 'rotateY(180deg)' : '' }}
              aria-label={isShown ? `Card: ${card.emoji}` : 'Hidden card'}
              disabled={isMatched}
            >
              {isShown ? card.emoji : '?'}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      <button
        onClick={resetGame}
        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        🔄 New Game
      </button>
    </div>
  );
}
