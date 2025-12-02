/*
  # EventSphere Management System Database Schema

  ## Overview
  This migration creates the complete database schema for the EventSphere Management system,
  including tables for users, expos, exhibitors, booths, sessions, registrations, and messaging.

  ## 1. New Tables

  ### `profiles`
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `role` (text) - User role: 'admin', 'exhibitor', 'attendee'
  - `company_name` (text, nullable) - For exhibitors
  - `phone` (text, nullable) - Contact phone
  - `avatar_url` (text, nullable) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp

  ### `expos`
  - `id` (uuid, primary key) - Unique expo identifier
  - `title` (text) - Expo name
  - `description` (text) - Detailed description
  - `theme` (text) - Event theme
  - `location` (text) - Venue location
  - `start_date` (date) - Event start date
  - `end_date` (date) - Event end date
  - `floor_plan_url` (text, nullable) - Floor plan image URL
  - `status` (text) - 'draft', 'published', 'completed', 'cancelled'
  - `created_by` (uuid) - Admin who created the expo
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `booths`
  - `id` (uuid, primary key) - Unique booth identifier
  - `expo_id` (uuid) - Foreign key to expos
  - `booth_number` (text) - Booth identifier
  - `size` (text) - 'small', 'medium', 'large'
  - `position_x` (integer) - X coordinate on floor plan
  - `position_y` (integer) - Y coordinate on floor plan
  - `price` (decimal) - Booth rental price
  - `status` (text) - 'available', 'reserved', 'occupied'
  - `exhibitor_id` (uuid, nullable) - Assigned exhibitor
  - `created_at` (timestamptz)

  ### `exhibitor_applications`
  - `id` (uuid, primary key) - Application identifier
  - `expo_id` (uuid) - Foreign key to expos
  - `exhibitor_id` (uuid) - Applicant user
  - `company_name` (text) - Company name
  - `products_services` (text) - What they offer
  - `logo_url` (text, nullable) - Company logo
  - `website` (text, nullable) - Company website
  - `booth_preference` (text) - Preferred booth size
  - `status` (text) - 'pending', 'approved', 'rejected'
  - `assigned_booth_id` (uuid, nullable) - Assigned booth
  - `submitted_at` (timestamptz)
  - `reviewed_at` (timestamptz, nullable)
  - `reviewed_by` (uuid, nullable)

  ### `sessions`
  - `id` (uuid, primary key) - Session identifier
  - `expo_id` (uuid) - Foreign key to expos
  - `title` (text) - Session title
  - `description` (text) - Session description
  - `speaker_name` (text) - Speaker name
  - `location` (text) - Session location
  - `start_time` (timestamptz) - Start time
  - `end_time` (timestamptz) - End time
  - `capacity` (integer) - Maximum attendees
  - `created_at` (timestamptz)

  ### `session_registrations`
  - `id` (uuid, primary key)
  - `session_id` (uuid) - Foreign key to sessions
  - `attendee_id` (uuid) - Registered attendee
  - `registered_at` (timestamptz)
  - Unique constraint on (session_id, attendee_id)

  ### `expo_registrations`
  - `id` (uuid, primary key)
  - `expo_id` (uuid) - Foreign key to expos
  - `attendee_id` (uuid) - Registered attendee
  - `registration_type` (text) - 'general', 'vip', 'press'
  - `registered_at` (timestamptz)
  - Unique constraint on (expo_id, attendee_id)

  ### `messages`
  - `id` (uuid, primary key)
  - `sender_id` (uuid) - Message sender
  - `recipient_id` (uuid) - Message recipient
  - `subject` (text) - Message subject
  - `content` (text) - Message body
  - `is_read` (boolean) - Read status
  - `created_at` (timestamptz)

  ### `booth_traffic`
  - `id` (uuid, primary key)
  - `booth_id` (uuid) - Foreign key to booths
  - `attendee_id` (uuid) - Visiting attendee
  - `visited_at` (timestamptz)

  ### `feedback`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Feedback author
  - `expo_id` (uuid, nullable) - Related expo
  - `type` (text) - 'suggestion', 'issue', 'praise'
  - `content` (text) - Feedback content
  - `status` (text) - 'open', 'in_progress', 'resolved'
  - `created_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Admins can manage all data
  - Exhibitors can view their own applications and assigned booths
  - Attendees can view public expo data and their own registrations
  - Users can only read/write their own messages
  - All users can submit feedback

  ## 3. Indexes
  - Created indexes on foreign keys for optimal query performance
  - Indexes on frequently queried fields (status, dates, etc.)
*/

-- Create enum-like checks using domains or constraints
-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'exhibitor', 'attendee')),
  company_name text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Expos table
CREATE TABLE IF NOT EXISTS expos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  theme text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  floor_plan_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'completed', 'cancelled')),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booths table
CREATE TABLE IF NOT EXISTS booths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expo_id uuid NOT NULL REFERENCES expos(id) ON DELETE CASCADE,
  booth_number text NOT NULL,
  size text NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  position_x integer DEFAULT 0,
  position_y integer DEFAULT 0,
  price decimal(10,2) DEFAULT 0,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'occupied')),
  exhibitor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(expo_id, booth_number)
);

-- Exhibitor applications table
CREATE TABLE IF NOT EXISTS exhibitor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expo_id uuid NOT NULL REFERENCES expos(id) ON DELETE CASCADE,
  exhibitor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  products_services text NOT NULL,
  logo_url text,
  website text,
  booth_preference text NOT NULL CHECK (booth_preference IN ('small', 'medium', 'large')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  assigned_booth_id uuid REFERENCES booths(id) ON DELETE SET NULL,
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  UNIQUE(expo_id, exhibitor_id)
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expo_id uuid NOT NULL REFERENCES expos(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  speaker_name text NOT NULL,
  location text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  capacity integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- Session registrations table
CREATE TABLE IF NOT EXISTS session_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  attendee_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(session_id, attendee_id)
);

-- Expo registrations table
CREATE TABLE IF NOT EXISTS expo_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expo_id uuid NOT NULL REFERENCES expos(id) ON DELETE CASCADE,
  attendee_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  registration_type text NOT NULL DEFAULT 'general' CHECK (registration_type IN ('general', 'vip', 'press')),
  registered_at timestamptz DEFAULT now(),
  UNIQUE(expo_id, attendee_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Booth traffic tracking table
CREATE TABLE IF NOT EXISTS booth_traffic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booth_id uuid NOT NULL REFERENCES booths(id) ON DELETE CASCADE,
  attendee_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  visited_at timestamptz DEFAULT now()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expo_id uuid REFERENCES expos(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('suggestion', 'issue', 'praise')),
  content text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_expos_created_by ON expos(created_by);
CREATE INDEX IF NOT EXISTS idx_expos_status ON expos(status);
CREATE INDEX IF NOT EXISTS idx_booths_expo_id ON booths(expo_id);
CREATE INDEX IF NOT EXISTS idx_booths_exhibitor_id ON booths(exhibitor_id);
CREATE INDEX IF NOT EXISTS idx_exhibitor_applications_expo_id ON exhibitor_applications(expo_id);
CREATE INDEX IF NOT EXISTS idx_exhibitor_applications_exhibitor_id ON exhibitor_applications(exhibitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expo_id ON sessions(expo_id);
CREATE INDEX IF NOT EXISTS idx_session_registrations_session_id ON session_registrations(session_id);
CREATE INDEX IF NOT EXISTS idx_session_registrations_attendee_id ON session_registrations(attendee_id);
CREATE INDEX IF NOT EXISTS idx_expo_registrations_expo_id ON expo_registrations(expo_id);
CREATE INDEX IF NOT EXISTS idx_expo_registrations_attendee_id ON expo_registrations(attendee_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_booth_traffic_booth_id ON booth_traffic(booth_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expos ENABLE ROW LEVEL SECURITY;
ALTER TABLE booths ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expo_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE booth_traffic ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Expos policies
CREATE POLICY "Anyone can view published expos"
  ON expos FOR SELECT
  TO authenticated
  USING (status = 'published' OR created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can insert expos"
  ON expos FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can update expos"
  ON expos FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can delete expos"
  ON expos FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Booths policies
CREATE POLICY "Authenticated users can view booths"
  ON booths FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage booths"
  ON booths FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Exhibitor applications policies
CREATE POLICY "Users can view own applications"
  ON exhibitor_applications FOR SELECT
  TO authenticated
  USING (exhibitor_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Exhibitors can create applications"
  ON exhibitor_applications FOR INSERT
  TO authenticated
  WITH CHECK (exhibitor_id = auth.uid() AND EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('exhibitor', 'admin')
  ));

CREATE POLICY "Admins can update applications"
  ON exhibitor_applications FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Sessions policies
CREATE POLICY "Authenticated users can view sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage sessions"
  ON sessions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Session registrations policies
CREATE POLICY "Users can view own session registrations"
  ON session_registrations FOR SELECT
  TO authenticated
  USING (attendee_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Attendees can register for sessions"
  ON session_registrations FOR INSERT
  TO authenticated
  WITH CHECK (attendee_id = auth.uid());

CREATE POLICY "Users can delete own session registrations"
  ON session_registrations FOR DELETE
  TO authenticated
  USING (attendee_id = auth.uid());

-- Expo registrations policies
CREATE POLICY "Users can view own expo registrations"
  ON expo_registrations FOR SELECT
  TO authenticated
  USING (attendee_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can register for expos"
  ON expo_registrations FOR INSERT
  TO authenticated
  WITH CHECK (attendee_id = auth.uid());

CREATE POLICY "Users can delete own expo registrations"
  ON expo_registrations FOR DELETE
  TO authenticated
  USING (attendee_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update own received messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- Booth traffic policies
CREATE POLICY "Users can view booth traffic"
  ON booth_traffic FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ) OR EXISTS (
    SELECT 1 FROM booths WHERE booths.id = booth_traffic.booth_id AND booths.exhibitor_id = auth.uid()
  ));

CREATE POLICY "System can track booth visits"
  ON booth_traffic FOR INSERT
  TO authenticated
  WITH CHECK (attendee_id = auth.uid());

-- Feedback policies
CREATE POLICY "Users can view own feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can submit feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update feedback status"
  ON feedback FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));