import { themes } from '../../themes';
import Input from '../ui/Input';

/**
 * LetterEditor - Form for creating a letter
 *
 * @param {Object} props
 * @param {Object} props.letter - Current letter data
 * @param {Function} props.onUpdate - Update a field
 * @param {Function} props.onToggleDecoration - Toggle a decoration
 */
export default function LetterEditor({ letter, onUpdate, onToggleDecoration }) {
  const theme = themes[letter.theme] || themes.romantic;

  return (
    <div className="space-y-6">
      {/* Sender & Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="From (Your name)"
          placeholder="Your name..."
          value={letter.senderName}
          onChange={(v) => onUpdate('senderName', v)}
          required
          maxLength={50}
        />
        <Input
          label="To (Recipient's name)"
          placeholder="Their name..."
          value={letter.recipientName}
          onChange={(v) => onUpdate('recipientName', v)}
          required
          maxLength={50}
        />
      </div>

      {/* Title */}
      <Input
        label="Letter Title"
        placeholder={`e.g., ${theme.letterTemplates[0].title}`}
        value={letter.title}
        onChange={(v) => onUpdate('title', v)}
        maxLength={80}
      />

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Your Message <span className="text-primary-500">*</span>
        </label>
        <textarea
          placeholder="Write something beautiful..."
          value={letter.message}
          onChange={(e) => onUpdate('message', e.target.value)}
          rows={8}
          maxLength={2000}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 resize-none font-handwritten text-lg leading-relaxed"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{letter.message.length}/2000 characters</span>
          <span>Pro tip: Use line breaks for a natural letter feel ✍️</span>
        </div>
      </div>

      {/* Quick templates */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {theme.letterTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                onUpdate('title', template.title);
                onUpdate('message', template.content);
              }}
              className="px-3 py-1.5 text-sm rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-gray-600 hover:text-primary-600"
            >
              {template.title}
            </button>
          ))}
        </div>
      </div>

      {/* Decorations */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Add Decorations {theme.emoji}
        </label>
        <div className="flex flex-wrap gap-2">
          {theme.decorations.map((decoration) => {
            const isSelected = letter.decorations.find((d) => d.id === decoration.id);
            return (
              <button
                key={decoration.id}
                onClick={() => onToggleDecoration(decoration)}
                className={`
                  w-12 h-12 rounded-xl text-2xl flex items-center justify-center
                  transition-all duration-200 border-2
                  ${
                    isSelected
                      ? 'border-primary-400 bg-primary-50 scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                  }
                `}
                title={decoration.label}
                aria-label={decoration.label}
                aria-pressed={!!isSelected}
              >
                {decoration.emoji}
              </button>
            );
          })}
        </div>
        {letter.decorations.length > 0 && (
          <p className="text-xs text-gray-400">
            {letter.decorations.length} decoration(s) selected
          </p>
        )}
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Settings</label>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-sm text-gray-600">🔊 Sound effects</span>
          <button
            onClick={() => onUpdate('soundsEnabled', !letter.soundsEnabled)}
            className={`
              w-12 h-6 rounded-full transition-all duration-300 relative
              ${letter.soundsEnabled ? 'bg-primary-500' : 'bg-gray-300'}
            `}
            role="switch"
            aria-checked={letter.soundsEnabled}
            aria-label="Toggle sound effects"
          >
            <span
              className={`
                absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300
                ${letter.soundsEnabled ? 'left-6.5 left-[26px]' : 'left-0.5'}
              `}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <span className="text-sm text-gray-600">🎵 Background music</span>
          <button
            onClick={() => onUpdate('musicEnabled', !letter.musicEnabled)}
            className={`
              w-12 h-6 rounded-full transition-all duration-300 relative
              ${letter.musicEnabled ? 'bg-primary-500' : 'bg-gray-300'}
            `}
            role="switch"
            aria-checked={letter.musicEnabled}
            aria-label="Toggle background music"
          >
            <span
              className={`
                absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300
                ${letter.musicEnabled ? 'left-6.5 left-[26px]' : 'left-0.5'}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
