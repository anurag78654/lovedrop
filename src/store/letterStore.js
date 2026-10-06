import { create } from 'zustand';
import { generateShortId, saveLetter } from '../lib/supabase';
import { canCreateLetter, recordLetterCreated, getLimitMessage } from '../lib/rateLimit';

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

    try {
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

      const { data, error } = await saveLetter(letterData);

      if (error) {
        // If Supabase not configured, save locally
        const localKey = `letter_${shortId}`;
        localStorage.setItem(localKey, JSON.stringify(letterData));
        const shareUrl = `${window.location.origin}/letter/${shortId}`;
        recordLetterCreated();
        set({ shareLink: shareUrl, shareId: shortId, isSaving: false });
        return shareUrl;
      }

      const shareUrl = `${window.location.origin}/letter/${shortId}`;
      recordLetterCreated();
      set({ shareLink: shareUrl, shareId: shortId, isSaving: false });
      return shareUrl;
    } catch (err) {
      set({ error: 'Failed to save letter. Please try again.', isSaving: false });
      return null;
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
      isCreating: false,
      isSaving: false,
      error: null,
    }),
}));

export default useLetterStore;
