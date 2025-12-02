/*
  # EventSphere Database Schema

  ## Overview
  Complete database schema for a college events management platform with event categories,
  events, and registration tracking.

  ## New Tables

  ### 1. categories
  Event categories for organizing different types of college events.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (e.g., Technical, Cultural, Sports)
  - `description` (text) - Category description
  - `icon` (text) - Icon identifier for UI display
  - `color` (text) - Color code for visual differentiation
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. events
  Main events table storing all college event information.
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Event title/name
  - `description` (text) - Detailed event description
  - `category_id` (uuid, foreign key) - Links to categories table
  - `image_url` (text) - Event banner/poster image URL
  - `venue` (text) - Event location/venue
  - `event_date` (timestamptz) - Scheduled date and time
  - `registration_deadline` (timestamptz) - Last date to register
  - `max_participants` (integer) - Maximum number of attendees
  - `current_participants` (integer) - Current registration count
  - `organizer` (text) - Organizing department/club name
  - `contact_email` (text) - Contact email for queries
  - `status` (text) - Event status (upcoming, ongoing, completed, cancelled)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. registrations
  Tracks student registrations for events.
  - `id` (uuid, primary key) - Unique identifier
  - `event_id` (uuid, foreign key) - Links to events table
  - `student_name` (text) - Registrant's name
  - `student_email` (text) - Registrant's email
  - `student_id` (text) - College student ID
  - `phone` (text) - Contact phone number
  - `registered_at` (timestamptz) - Registration timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with appropriate policies:

  1. **categories table**
     - Public read access (no authentication required)
     - Allows anyone to view event categories

  2. **events table**
     - Public read access for viewing events
     - Unrestricted access for event discovery

  3. **registrations table**
     - Public insert access for new registrations
     - Public read access to view registration data
     - Allows students to register without authentication

  ## Notes
  - All timestamps use `timestamptz` for timezone awareness
  - Foreign key constraints ensure data integrity
  - Default values set for timestamps and participant counts
  - Status field uses check constraint to enforce valid values
  - Indexes added on foreign keys for optimal query performance
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'calendar',
  color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  venue text NOT NULL,
  event_date timestamptz NOT NULL,
  registration_deadline timestamptz NOT NULL,
  max_participants integer DEFAULT 100,
  current_participants integer DEFAULT 0,
  organizer text NOT NULL,
  contact_email text NOT NULL,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  student_name text NOT NULL,
  student_email text NOT NULL,
  student_id text NOT NULL,
  phone text DEFAULT '',
  registered_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON registrations(event_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read access)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Events policies (public read access)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- Registrations policies (public insert and read)
CREATE POLICY "Anyone can register for events"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view registrations"
  ON registrations FOR SELECT
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, description, icon, color) VALUES
  ('Technical', 'Hackathons, coding competitions, and tech talks', 'code', '#8B5CF6'),
  ('Cultural', 'Music, dance, drama, and art events', 'music', '#EC4899'),
  ('Sports', 'Athletic competitions and sports meets', 'trophy', '#10B981'),
  ('Workshop', 'Skill development and training sessions', 'graduation-cap', '#F59E0B'),
  ('Social', 'Meetups, networking, and community events', 'users', '#3B82F6')
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, category_id, image_url, venue, event_date, registration_deadline, max_participants, organizer, contact_email, status) VALUES
  (
    'TechFest 2025',
    'Annual technical festival featuring hackathons, robotics competitions, and tech exhibitions. Join us for three days of innovation and technology.',
    (SELECT id FROM categories WHERE name = 'Technical' LIMIT 1),
    'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Main Auditorium',
    NOW() + INTERVAL '15 days',
    NOW() + INTERVAL '10 days',
    500,
    'Computer Science Department',
    'techfest@college.edu',
    'upcoming'
  ),
  (
    'Cultural Night',
    'Experience an evening of music, dance, and drama performances by talented students. Celebrating diversity and creativity.',
    (SELECT id FROM categories WHERE name = 'Cultural' LIMIT 1),
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Open Air Theatre',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '5 days',
    300,
    'Cultural Committee',
    'cultural@college.edu',
    'upcoming'
  ),
  (
    'Annual Sports Meet',
    'Inter-department sports competition including cricket, football, basketball, and athletics. Show your sporting spirit!',
    (SELECT id FROM categories WHERE name = 'Sports' LIMIT 1),
    'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Sports Complex',
    NOW() + INTERVAL '20 days',
    NOW() + INTERVAL '15 days',
    800,
    'Sports Department',
    'sports@college.edu',
    'upcoming'
  ),
  (
    'Web Development Workshop',
    'Learn modern web development with React, Node.js, and databases. Hands-on sessions with industry experts.',
    (SELECT id FROM categories WHERE name = 'Workshop' LIMIT 1),
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Computer Lab 3',
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '2 days',
    50,
    'Tech Club',
    'techclub@college.edu',
    'upcoming'
  ),
  (
    'Entrepreneurship Summit',
    'Meet successful entrepreneurs, attend startup pitches, and network with like-minded innovators.',
    (SELECT id FROM categories WHERE name = 'Social' LIMIT 1),
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Conference Hall',
    NOW() + INTERVAL '12 days',
    NOW() + INTERVAL '8 days',
    200,
    'Entrepreneurship Cell',
    'ecell@college.edu',
    'upcoming'
  ),
  (
    'Photography Exhibition',
    'Showcase of stunning photographs captured by students. Theme: Campus Life & Beyond.',
    (SELECT id FROM categories WHERE name = 'Cultural' LIMIT 1),
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Art Gallery',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '3 days',
    150,
    'Photography Club',
    'photoclub@college.edu',
    'upcoming'
  )
ON CONFLICT DO NOTHING;