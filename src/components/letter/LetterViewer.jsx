import { useState, useEffect } from 'react';
import { themes } from '../../themes';
import Envelope from '../envelope/Envelope';
import HeartParticles from '../effects/HeartParticles';
import ConfettiBurst from '../effects/ConfettiBurst';
import FlipCard from '../effects/FlipCard';
import ScratchReveal from '../effects/ScratchReveal';
import Button from '../ui/Button';

/**
 * LetterViewer - Full experience for viewing a received letter
 * Includes envelope animation, theme effects, and interactive elements
 *
 * @param {Object} props
 * @param {Object} props.letter - The letter data
 */
export default function LetterViewer({ letter }) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const theme = themes[letter.theme] || themes.romantic;

  // Fire confetti when envelope opens (birthday theme)
  useEffect(() => {
    if (isEnvelopeOpen && letter.theme === 'birthday') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen, letter.theme]);

  const handleOpen = () => {
    setIsEnvelopeOpen(true);
    setIsRead(true);
  };

  // Friend flip cards data
  const flipCards = [
    {
      front: <span className="text-2xl font-bold">Roast 🎤</span>,
      back: (
        <div className="text-center">
          <p className="text-sm">You're like a really bad habit...</p>
          <p className="text-lg font-bold mt-2">...that I can't quit! 😂</p>
        </div>
      ),
    },
    {
      front: <span className="text-2xl font-bold">Compliment ⭐</span>,
      back: (
        <div className="text-center">
          <p className="text-sm">Honestly, you're...</p>
          <p className="text-lg font-bold mt-2">the best thing ever! 🌟</p>
        </div>
      ),
    },
    {
      front: <span className="text-2xl font-bold">Memory 📸</span>,
      back: (
        <div className="text-center">
          <p className="text-sm">Remember that time when...</p>
          <p className="text-lg font-bold mt-2">we laughed until we cried! 😂</p>
        </div>
      ),
    },
  ];

  return (
    <div className={`relative min-h-screen ${theme.className}`}>
      {/* Floating particles (romantic theme) */}
      {letter.theme === 'romantic' && isEnvelopeOpen && (
        <HeartParticles theme="romantic" count={15} active={true} />
      )}

      {/* Confetti (birthday theme) */}
      <ConfettiBurst trigger={showConfetti} theme="birthday" />

      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Envelope stage */}
        {!isEnvelopeOpen ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">
                You've got a letter! 💌
              </h1>
              <p className="text-gray-500">
                From <span className="font-semibold">{letter.sender_name}</span> to{' '}
                <span className="font-semibold">{letter.recipient_name}</span>
              </p>
            </div>

            <Envelope isOpen={false} onOpen={handleOpen} theme={letter.theme}>
              {letter.title || 'A special message for you'}
            </Envelope>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto animate-slide-up">
            {/* Letter card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div
                className="p-6 md:p-8 text-center"
                style={{ backgroundColor: theme.colors.background }}
              >
                <span className="text-5xl mb-3 block">{theme.emoji}</span>
                {letter.title && (
                  <h1 className="text-2xl md:text-3xl font-display font-bold" style={{ color: theme.colors.text }}>
                    {letter.title}
                  </h1>
                )}
                <p className="text-sm mt-2 opacity-60" style={{ color: theme.colors.text }}>
                  From {letter.sender_name} with {theme.id === 'romantic' ? '❤️' : theme.id === 'birthday' ? '🎉' : '🤝'}
                </p>
              </div>

              {/* Letter body */}
              <div className="p-6 md:p-10">
                {/* Decorations */}
                {letter.decorations && letter.decorations.length > 0 && (
                  <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {letter.decorations.map((dec) => (
                      <span key={dec.id} className="text-3xl animate-bounce-slow" style={{ animationDelay: `${dec.id.length * 0.1}s` }}>
                        {dec.emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Message */}
                <div className="letter-paper p-6 rounded-xl mb-8">
                  <p className="font-handwritten text-xl text-gray-700 whitespace-pre-wrap">
                    {letter.message}
                  </p>
                </div>

                {/* Signature */}
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm">With love,</p>
                  <p className="font-handwritten text-3xl text-primary-500 mt-1">
                    {letter.sender_name}
                  </p>
                </div>

                {/* Theme-specific interactive content */}
                {letter.theme === 'friendship' && (
                  <div className="space-y-6">
                    <h3 className="text-center font-display font-bold text-xl text-gray-700">
                      Fun Cards for You! 🃏
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {flipCards.map((card, i) => (
                        <FlipCard key={i} front={card.front} back={card.back} />
                      ))}
                    </div>
                  </div>
                )}

                {letter.theme === 'birthday' && (
                  <div className="text-center space-y-4">
                    <h3 className="font-display font-bold text-xl text-gray-700">
                      Scratch to reveal your surprise! 🎁
                    </h3>
                    <div className="flex justify-center">
                      <ScratchReveal
                        width={280}
                        height={150}
                        coverColor="#ffd93d"
                        coverText="Scratch here! 🎁"
                        onReveal={() => setShowConfetti(true)}
                      >
                        <div className="text-center">
                          <span className="text-4xl block mb-2">🎂</span>
                          <p className="font-bold text-lg">Many happy returns!</p>
                          <p className="text-sm text-gray-500">Hope all dreams come true</p>
                        </div>
                      </ScratchReveal>
                    </div>
                  </div>
                )}

                {letter.theme === 'romantic' && (
                  <div className="text-center space-y-4">
                    <ScratchReveal
                      width={280}
                      height={140}
                      coverColor="#ff2861"
                      coverText="Scratch for a surprise 💕"
                      onReveal={() => {}}
                    >
                      <div className="text-center">
                        <span className="text-4xl block mb-2 animate-pulse-heart">💖</span>
                        <p className="font-handwritten text-lg text-primary-600">
                          A little something only for you
                        </p>
                      </div>
                    </ScratchReveal>
                  </div>
                )}
              </div>
            </div>

            {/* Create your own CTA */}
            <div className="text-center mt-8 mb-12">
              <p className="text-gray-500 mb-3">Want to send your own letter?</p>
              <a href="/create">
                <Button variant="primary" size="lg">
                  ✨ Create a Letter — It's Free
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
