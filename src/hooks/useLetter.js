import { useCallback, useEffect, useState } from 'react';
import { fetchLetter, supabase, classifyError } from '../lib/supabase';

/**
 * Hook to load a letter by its short ID
 *
 * Errors are classified so the UI can tell two very different stories apart:
 *   'not-found' - the server answered: no such letter
 *   'server'    - we could not reach the server at all (retry makes sense)
 *
 * @param {string} shortId - The letter's short ID from URL
 * @returns {Object} - { letter, loading, error, errorType, reload }
 */
export function useLetter(shortId) {
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const loadLetter = useCallback(async () => {
    if (!shortId) {
      setError('No letter ID provided');
      setErrorType('not-found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setErrorType(null);

    try {
      let serverError = null;

      // Try Supabase first
      if (supabase) {
        const { data, error: fetchError } = await fetchLetter(shortId);
        if (!fetchError && data) {
          setLetter(data);
          setLoading(false);
          return;
        }
        if (classifyError(fetchError) === 'server') {
          serverError = fetchError;
        }
      }

      // Fallback to localStorage (covers offline letters + demo mode)
      const localKey = `letter_${shortId}`;
      const localData = localStorage.getItem(localKey);

      if (localData) {
        setLetter(JSON.parse(localData));
        setErrorType(null);
      } else if (serverError) {
        setError("Couldn't reach the server. Check your connection and try again.");
        setErrorType('server');
      } else {
        setError('Letter not found');
        setErrorType('not-found');
      }
    } catch (err) {
      setError("Couldn't reach the server. Check your connection and try again.");
      setErrorType('server');
      console.error('Error loading letter:', err);
    } finally {
      setLoading(false);
    }
  }, [shortId]);

  useEffect(() => {
    loadLetter();
  }, [loadLetter]);

  return { letter, loading, error, errorType, reload: loadLetter };
}

export default useLetter;
