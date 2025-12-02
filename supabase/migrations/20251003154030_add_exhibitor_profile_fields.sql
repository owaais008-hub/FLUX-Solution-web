-- Add additional fields to profiles for exhibitor functionality
ALTER TABLE IF EXISTS profiles
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS documents jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS address text;

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_company_name ON profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_profiles_is_verified ON profiles(is_verified);

-- Example: migrate existing users to set is_verified = false if null
UPDATE profiles SET is_verified = false WHERE is_verified IS NULL;

-- Notes:
-- - `documents` stores an array of uploaded document metadata (filename, url, uploaded_at)
-- - Use RLS policies to allow users to manage their own documents and for admins to verify profiles
