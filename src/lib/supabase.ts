import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'exhibitor' | 'attendee';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Expo {
  id: string;
  title: string;
  description: string;
  theme: string;
  location: string;
  start_date: string;
  end_date: string;
  floor_plan_url?: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Booth {
  id: string;
  expo_id: string;
  booth_number: string;
  size: 'small' | 'medium' | 'large';
  position_x: number;
  position_y: number;
  price: number;
  status: 'available' | 'reserved' | 'occupied';
  exhibitor_id?: string;
  created_at: string;
}

export interface ExhibitorApplication {
  id: string;
  expo_id: string;
  exhibitor_id: string;
  company_name: string;
  products_services: string;
  logo_url?: string;
  website?: string;
  booth_preference: 'small' | 'medium' | 'large';
  status: 'pending' | 'approved' | 'rejected';
  assigned_booth_id?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface Session {
  id: string;
  expo_id: string;
  title: string;
  description: string;
  speaker_name: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
}
