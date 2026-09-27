import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client (only if env vars are set).
// Wrapped in try/catch so a bad client never crashes the app -
// we fall back to localStorage mode instead.
export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Supabase init failed, using localStorage fallback:', err.message);
    return null;
  }
})();

// Check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase;

/**
 * Save a letter to Supabase
 * @param {Object} letter - The letter data
 * @returns {Object} - { data, error }
 */
export async function saveLetter(letter) {
  if (!supabase) return { data: null, error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('letters')
    .insert([letter])
    .select()
    .single();

  return { data, error };
}

/**
 * Fetch a letter by its short ID
 * @param {string} shortId - The short unique ID
 * @returns {Object} - { data, error }
 */
export async function fetchLetter(shortId) {
  if (!supabase) return { data: null, error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('short_id', shortId)
    .single();

  return { data, error };
}

/**
 * Generate a random short ID for shareable links
 * @returns {string} - 8 character alphanumeric ID
 */
export function generateShortId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
