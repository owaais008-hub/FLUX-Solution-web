import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create supabase client with safe defaults
// If env vars are not set, create a client that will gracefully fail
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

export type UserRole = 'admin' | 'client' | 'developer';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  address?: string;
  is_verified?: boolean;
  documents?: any[];
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image_url?: string;
  gradient?: string;
  live_url?: string;
  github_url?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  featured?: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient?: string;
  display_order?: number;
  is_active?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
  // joined rows when selecting sender/recipient profiles
  sender?: {
    id?: string;
    full_name?: string;
    company_name?: string;
  };
  recipient?: {
    id?: string;
    full_name?: string;
    company_name?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills: string[];
  created_at: string;
}
