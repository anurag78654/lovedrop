-- ============================================
-- LoveDrop migration: scheduled "open on date" letters (C4)
-- Safe to run multiple times
-- ============================================

ALTER TABLE letters ADD COLUMN IF NOT EXISTS unlock_date TIMESTAMPTZ;

-- Verify
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'letters' AND column_name = 'unlock_date';

-- Expected: unlock_date | timestamp with time zone
