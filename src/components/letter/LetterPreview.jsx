import { themes } from '../../themes';

/**
 * LetterPreview - Shows how the letter will look
 *
 * @param {Object} props
 * @param {Object} props.letter - Letter data to preview
 */
export default function LetterPreview({ letter }) {
  const theme = themes[letter.theme] || themes.romantic;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl ${theme.className}`}
      style={{ minHeight: '400px' }}
    >
      {/* Decorations floating in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {letter.decorations.map((dec, i) => (
          <span
            key={dec.id}
            className="absolute text-3xl animate-float opacity-30"
            style={{
              left: `${15 + (i * 20) % 70}%`,
              top: `${10 + (i * 25) % 80}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {dec.emoji}
          </span>
        ))}
      </div>

      {/* Letter content */}
      <div className="relative z-10 p-6 md:p-10">
        {/* From/To header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed"
          style={{ borderColor: theme.colors.primary + '40' }}
        >
          <div>
            <p className="text-xs uppercase tracking-wider opacity-60">From</p>
            <p className="font-handwritten text-xl" style={{ color: theme.colors.text }}>
              {letter.senderName || 'Your name'}
            </p>
          </div>
          <span className="text-3xl">{theme.emoji}</span>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider opacity-60">To</p>
            <p className="font-handwritten text-xl" style={{ color: theme.colors.text }}>
              {letter.recipientName || 'Their name'}
            </p>
          </div>
        </div>

        {/* Title */}
        {letter.title && (
          <h2
            className="text-2xl md:text-3xl font-bold font-display mb-4 text-center"
            style={{ color: theme.colors.text }}
          >
            {letter.title}
          </h2>
        )}

        {/* Message */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-sm">
          <p className="font-handwritten text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
            {letter.message || 'Your beautiful message will appear here...'}
          </p>
        </div>

        {/* Decorations row */}
        {letter.decorations.length > 0 && (
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {letter.decorations.map((dec) => (
              <span key={dec.id} className="text-2xl" title={dec.label}>
                {dec.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Signature */}
        <div className="text-center mt-6">
          <p className="text-sm opacity-60" style={{ color: theme.colors.text }}>
            With {theme.id === 'romantic' ? 'love' : theme.id === 'birthday' ? 'joy' : 'love & laughter'},
          </p>
          <p className="font-handwritten text-2xl mt-1" style={{ color: theme.colors.primary }}>
            {letter.senderName || 'Your name'}
          </p>
        </div>
      </div>

      {/* Postmark decoration */}
      <div
        className="absolute -top-3 -right-3 w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center text-xs font-bold opacity-20 rotate-12"
        style={{ borderColor: theme.colors.text, color: theme.colors.text }}
      >
        LOVE
        <br />
        DROP
      </div>
    </div>
  );
}
