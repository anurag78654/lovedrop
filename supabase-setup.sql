-- ============================================
-- LoveDrop - Complete Database Setup
-- Safe to run multiple times (resets the table)
-- ============================================

-- 1. Remove old table if it exists (fresh start)
DROP TABLE IF EXISTS letters CASCADE;

-- 2. Create the letters table
CREATE TABLE letters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_id TEXT UNIQUE NOT NULL,
  sender_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  title TEXT DEFAULT '',
  message TEXT NOT NULL,
  theme TEXT DEFAULT 'romantic',
  decorations JSONB DEFAULT '[]',
  sounds_enabled BOOLEAN DEFAULT true,
  music_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- 4. Allow anyone with the link to READ letters
DROP POLICY IF EXISTS "Anyone can read letters" ON letters;
CREATE POLICY "Anyone can read letters" ON letters
  FOR SELECT USING (true);

-- 5. Allow letter creation
DROP POLICY IF EXISTS "Anyone can create letters" ON letters;
CREATE POLICY "Anyone can create letters" ON letters
  FOR INSERT WITH CHECK (true);

-- 6. Speed up lookups by share link
CREATE INDEX IF NOT EXISTS idx_letters_short_id ON letters (short_id);

-- ============================================
-- DONE! You should see: "Success. No rows returned"
-- ============================================
