import { useCallback, useEffect, useState } from 'react';
import { fetchLetter, supabase } from '../lib/supabase';

/**
 * Hook to load a letter by its short ID
 * @param {string} shortId - The letter's short ID from URL
 * @returns {Object} - { letter, loading, error }
 */
export function useLetter(shortId) {
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLetter = useCallback(async () => {
    if (!shortId) {
      setError('No letter ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try Supabase first
      if (supabase) {
        const { data, error: fetchError } = await fetchLetter(shortId);
        if (!fetchError && data) {
          setLetter(data);
          setLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      const localKey = `letter_${shortId}`;
      const localData = localStorage.getItem(localKey);

      if (localData) {
        setLetter(JSON.parse(localData));
      } else {
        setError('Letter not found');
      }
    } catch (err) {
      setError('Failed to load letter');
      console.error('Error loading letter:', err);
    } finally {
      setLoading(false);
    }
  }, [shortId]);

  useEffect(() => {
    loadLetter();
  }, [loadLetter]);

  return { letter, loading, error, reload: loadLetter };
}

export default useLetter;
