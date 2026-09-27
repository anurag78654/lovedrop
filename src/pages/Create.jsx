import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useLetterStore from '../store/letterStore';
import { themes } from '../themes';
import LetterEditor from '../components/letter/LetterEditor';
import LetterPreview from '../components/letter/LetterPreview';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfettiBurst from '../components/effects/ConfettiBurst';
import { copyToClipboard } from '../lib/utils';
import { canCreateLetter } from '../lib/rateLimit';

/**
 * Create page - Multi-step letter creation wizard
 */
export default function Create() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    currentLetter,
    updateField,
    toggleDecoration,
    setTheme,
    saveLetter,
    shareLink,
    isSaving,
    error,
    reset,
  } = useLetterStore();

  // Set theme from URL params
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam && themes[themeParam]) {
      setTheme(themeParam);
    }
  }, [searchParams, setTheme]);

  const theme = themes[currentLetter.theme] || themes.romantic;
  const totalSteps = 3;

  // Pick up an active cooldown (e.g. page reloaded during cooldown)
  useEffect(() => {
    const limit = canCreateLetter();
    if (!limit.allowed && limit.reason === 'cooldown') {
      setCooldown(Math.ceil(limit.retryInMs / 1000));
    }
  }, []);

  // Tick countdown every second while on cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown > 0]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = async () => {
    const url = await saveLetter();
    if (url) {
      setShowConfetti(true);
      setShowShareModal(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // If blocked by cooldown, start live countdown on button
      const limit = canCreateLetter();
      if (!limit.allowed && limit.reason === 'cooldown') {
        setCooldown(Math.ceil(limit.retryInMs / 1000));
      }
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Confetti on success */}
      <ConfettiBurst trigger={showConfetti} theme="romantic" />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <span className="font-display font-bold text-gradient">LoveDrop</span>
          </Link>

          {/* Progress steps */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-300
                    ${
                      s < step
                        ? 'bg-primary-500 text-white'
                        : s === step
                        ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-500'
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && <div className="w-6 md:w-8 h-0.5 bg-gray-200 rounded" />}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Step 1: Theme Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-2">
              Choose Your Theme
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Pick the perfect occasion for your letter
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {Object.values(themes).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`
                    ${t.className} rounded-3xl p-8 text-center transition-all duration-300
                    ${
                      currentLetter.theme === t.id
                        ? 'ring-4 ring-primary-400 scale-105 shadow-xl'
                        : 'hover:shadow-lg hover:-translate-y-1'
                    }
                  `}
                >
                  <span className="text-6xl block mb-4">{t.emoji}</span>
                  <h3 className="text-2xl font-display font-bold mb-2" style={{ color: t.colors.text }}>
                    {t.name}
                  </h3>
                  <p className="text-sm opacity-75 mb-3" style={{ color: t.colors.text }}>
                    {t.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {t.occasions.slice(0, 3).map((occ) => (
                      <span
                        key={occ}
                        className="text-xs px-2 py-1 rounded-full bg-white/50"
                        style={{ color: t.colors.text }}
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" onClick={handleNext}>
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Write Letter */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
              <span className="text-sm text-gray-400">Step 2 of 3</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Editor */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-display font-bold mb-4">
                  {theme.emoji} Write Your Letter
                </h2>
                <LetterEditor
                  letter={currentLetter}
                  onUpdate={updateField}
                  onToggleDecoration={toggleDecoration}
                />
              </div>

              {/* Preview */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
                  <span className="text-sm text-gray-400">See how it looks!</span>
                </div>
                <LetterPreview letter={currentLetter} />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Next */}
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={handleBack}>
                ← Back
              </Button>
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!currentLetter.message.trim() || !currentLetter.senderName.trim() || !currentLetter.recipientName.trim()}
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Share */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
              <span className="text-sm text-gray-400">Step 3 of 3</span>
            </div>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-2">
                Your Letter is Ready! 💌
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Preview it below and create a shareable link
              </p>

              {/* Full preview */}
              <LetterPreview letter={currentLetter} />

              {/* Settings summary */}
              <div className="mt-6 p-4 bg-white rounded-xl shadow-sm flex flex-wrap gap-4 justify-center text-sm">
                <span className="text-gray-600">
                  🔊 Sounds: {currentLetter.soundsEnabled ? 'ON' : 'OFF'}
                </span>
                <span className="text-gray-600">
                  🎵 Music: {currentLetter.musicEnabled ? 'ON' : 'OFF'}
                </span>
                <span className="text-gray-600">
                  🎨 Decorations: {currentLetter.decorations.length}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                >
                  ← Edit Letter
                </Button>
                <Button
                  size="lg"
                  onClick={handleCreate}
                  disabled={isSaving || cooldown > 0}
                >
                  {isSaving
                    ? '⏳ Creating...'
                    : cooldown > 0
                      ? `⏳ Wait ${cooldown}s`
                      : '✨ Create Share Link'}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="🎉 Your Letter is Ready!"
      >
        <div className="text-center space-y-4">
          <span className="text-5xl block">💌</span>
          <p className="text-gray-600">
            Share this link with <strong>{currentLetter.recipientName}</strong>
          </p>

          {/* Link box */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="text"
              value={shareLink || ''}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
            />
            <button
              onClick={handleCopy}
              className={`
                px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-300
                ${copied ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600'}
              `}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              <Button fullWidth>🔗 Preview Letter</Button>
            </a>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleReset}
              >
                ✏️ Create Another
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowShareModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
