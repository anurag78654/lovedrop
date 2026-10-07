import { create } from 'zustand';
import { generateShortId, saveLetter, classifyError } from '../lib/supabase';
import { canCreateLetter, recordLetterCreated, getLimitMessage } from '../lib/rateLimit';

/**
 * User-facing warning for letters that could not reach the cloud.
 * We never block the share link - we label it instead.
 */
function localOnlyWarning(kind) {
  if (kind === 'unconfigured') {
    return 'Offline demo mode — this link only works in this browser: the letter was saved here, not in the cloud.';
  }
  return "We couldn't reach the cloud just now, so this link only works in this browser. Try creating it again in a moment.";
}

/**
 * Global letter state store using Zustand
 */
const useLetterStore = create((set, get) => ({
  // Current letter being created
  currentLetter: {
    senderName: '',
    recipientName: '',
    title: '',
    message: '',
    theme: 'romantic',
    decorations: [],
    soundsEnabled: true,
    musicEnabled: false,
    unlockDate: '',
  },

  // Generated share link
  shareLink: null,
  shareId: null,

  // Save provenance: true when the letter only lives in this browser
  localOnly: false,
  saveWarning: null,
  saveWarningDetail: null,

  // UI state
  isCreating: false,
  isSaving: false,
  error: null,

  // Update letter fields
  updateField: (field, value) =>
    set((state) => ({
      currentLetter: {
        ...state.currentLetter,
        [field]: value,
      },
    })),

  // Set theme
  setTheme: (theme) =>
    set((state) => ({
      currentLetter: { ...state.currentLetter, theme },
    })),

  // Toggle decoration
  toggleDecoration: (decoration) =>
    set((state) => {
      const current = state.currentLetter.decorations;
      const exists = current.find((d) => d.id === decoration.id);
      return {
        currentLetter: {
          ...state.currentLetter,
          decorations: exists
            ? current.filter((d) => d.id !== decoration.id)
            : [...current, decoration],
        },
      };
    }),

  // Save letter and generate share link
  saveLetter: async () => {
    const { currentLetter } = get();

    // Validate
    if (!currentLetter.senderName.trim() || !currentLetter.recipientName.trim()) {
      set({ error: 'Please fill in sender and recipient names' });
      return null;
    }
    if (!currentLetter.message.trim()) {
      set({ error: 'Please write your message' });
      return null;
    }

    // Unlock date validation (optional field)
    if (currentLetter.unlockDate) {
      const unlockTime = new Date(currentLetter.unlockDate).getTime();
      if (Number.isNaN(unlockTime)) {
        set({ error: 'Invalid unlock date' });
        return null;
      }
      if (unlockTime <= Date.now()) {
        set({ error: 'Unlock date must be in the future 🕐' });
        return null;
      }
    }

    // Rate limiting: daily quota + cooldown
    const limit = canCreateLetter();
    if (!limit.allowed) {
      set({ error: getLimitMessage(limit.reason, limit.retryInMs) });
      return null;
    }

    set({ isSaving: true, error: null });

    const shortId = generateShortId();

    const letterData = {
      short_id: shortId,
      sender_name: currentLetter.senderName,
      recipient_name: currentLetter.recipientName,
      title: currentLetter.title,
      message: currentLetter.message,
      theme: currentLetter.theme,
      decorations: currentLetter.decorations,
      sounds_enabled: currentLetter.soundsEnabled,
      music_enabled: currentLetter.musicEnabled,
      unlock_date: currentLetter.unlockDate
        ? new Date(currentLetter.unlockDate).toISOString()
        : null,
      created_at: new Date().toISOString(),
    };

    const shareUrl = `${window.location.origin}/letter/${shortId}`;

    /**
     * Cloud unreachable / rejected the write. We still hand over a share
     * link (sharing is the product), but flag it as device-only so the
     * sender can see the truth instead of silently sending a dead link.
     */
    const finishLocally = (kind, detail) => {
      try {
        localStorage.setItem(`letter_${shortId}`, JSON.stringify(letterData));
      } catch {
        // storage blocked/full - link is still issued, warning explains it
      }
      recordLetterCreated();
      set({
        shareLink: shareUrl,
        shareId: shortId,
        isSaving: false,
        error: null,
        localOnly: true,
        saveWarning: localOnlyWarning(kind),
        saveWarningDetail: detail || null,
      });
      return shareUrl;
    };

    try {
      const { error } = await saveLetter(letterData);

      if (error) {
        return finishLocally(classifyError(error), error.message || String(error));
      }

      recordLetterCreated();
      set({
        shareLink: shareUrl,
        shareId: shortId,
        isSaving: false,
        error: null,
        localOnly: false,
        saveWarning: null,
        saveWarningDetail: null,
      });
      return shareUrl;
    } catch (err) {
      return finishLocally('server', err?.message || String(err));
    }
  },

  // Reset store
  reset: () =>
    set({
      currentLetter: {
        senderName: '',
        recipientName: '',
        title: '',
        message: '',
        theme: 'romantic',
        decorations: [],
        soundsEnabled: true,
        musicEnabled: false,
        unlockDate: '',
      },
      shareLink: null,
      shareId: null,
      localOnly: false,
      saveWarning: null,
      saveWarningDetail: null,
      isCreating: false,
      isSaving: false,
      error: null,
    }),
}));

export default useLetterStore;
