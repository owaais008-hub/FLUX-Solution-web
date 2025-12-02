/*
  # Software House Website Database Schema

  This migration creates tables for services, projects, team members, and testimonials
  for a software house website.
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  features text[] DEFAULT '{}',
  gradient text DEFAULT 'from-indigo-50 to-violet-50',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('web', 'graphic', 'wordpress', 'mobile', 'other')),
  technologies text[] DEFAULT '{}',
  image_url text,
  gradient text DEFAULT 'from-blue-500 via-cyan-500 to-teal-500',
  live_url text,
  github_url text,
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  avatar_url text,
  social_links jsonb DEFAULT '{}',
  skills text[] DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text,
  client_company text,
  client_avatar_url text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

CREATE POLICY "Services are insertable by admins" ON services
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Services are updatable by admins" ON services
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Services are deletable by admins" ON services
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for projects
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Projects are insertable by admins" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Projects are updatable by admins" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Projects are deletable by admins" ON projects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for team_members
CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Team members are insertable by admins" ON team_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Team members are updatable by admins" ON team_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Team members are deletable by admins" ON team_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for testimonials
CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Testimonials are insertable by everyone" ON testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Testimonials are updatable by admins" ON testimonials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Testimonials are deletable by admins" ON testimonials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert default services
INSERT INTO services (title, description, icon, features, gradient, display_order) VALUES
  ('Web Development', 'Modern, responsive web applications built with cutting-edge technologies and best practices.', 'Code2', 
   ARRAY['Enterprise Applications', 'Legacy System Modernization', 'API Development & Integration', 'Microservices Architecture'],
   'from-indigo-100 to-blue-50', 1),
  ('UI/UX Design', 'User-centered design that enhances engagement and creates memorable digital experiences.', 'Palette',
   ARRAY['User Research & Testing', 'Wireframing & Prototyping', 'Visual Design Systems', 'Design Thinking Workshops'],
   'from-pink-100 to-rose-50', 2),
  ('Web Designing', 'Beautiful and functional website designs that capture your brand identity and engage visitors.', 'Monitor',
   ARRAY['Responsive Web Design', 'Landing Page Creation', 'E-commerce Design', 'Website Redesign'],
   'from-cyan-100 to-blue-50', 3),
  ('WordPress', 'Custom WordPress solutions including theme development, plugin creation, and site optimization.', 'Globe',
   ARRAY['Custom Theme Development', 'Plugin Creation', 'Performance Optimization', 'Security Implementation'],
   'from-blue-100 to-indigo-50', 4),
  ('Graphic Designing', 'Creative visual solutions including branding, illustrations, and marketing materials.', 'Image',
   ARRAY['Logo & Brand Identity', 'Marketing Materials', 'Illustrations & Icons', 'Print Design'],
   'from-purple-100 to-pink-50', 5),
  ('Problem Solver', 'Expert problem-solving services to tackle your most challenging business and technical issues.', 'Wrench',
   ARRAY['Technical Problem Solving', 'Business Process Optimization', 'System Integration Challenges', 'Debugging & Troubleshooting'],
   'from-green-100 to-emerald-50', 6)
ON CONFLICT DO NOTHING;

-- Insert default projects
INSERT INTO projects (title, description, category, technologies, gradient, status, featured) VALUES
  ('Event Management System', 'Full-stack MERN application for managing events, registrations, and attendee tracking with real-time updates.', 'web',
   ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
   'from-blue-500 via-cyan-500 to-teal-500', 'completed', true),
  ('Fitness Tracker Web App', 'Comprehensive fitness application with workout planning, progress tracking, and nutrition logging features.', 'web',
   ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
   'from-emerald-500 via-green-500 to-lime-500', 'completed', true)
ON CONFLICT DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

