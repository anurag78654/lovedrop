-- ============================================
-- LoveDrop: letter expiration (E3)
-- Auto-deletes letters older than 90 days to keep the free DB tidy.
-- Safe to run multiple times.
-- ============================================

-- 1. Speeds up the daily cleanup query
CREATE INDEX IF NOT EXISTS idx_letters_created_at ON letters (created_at);

-- 2. pg_cron: schedule daily deletion (03:17 UTC, off-peak minute)
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'delete-old-letters',          -- job name
  '17 3 * * *',                  -- daily at 03:17 UTC
  $$DELETE FROM letters WHERE created_at < now() - interval '90 days';$$
);

-- Verify job is scheduled (should return one row)
SELECT jobid, schedule, command FROM cron.job WHERE jobname = 'delete-old-letters';

-- To remove the job later:
-- SELECT cron.unschedule('delete-old-letters');
