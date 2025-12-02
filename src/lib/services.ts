import { supabase } from './supabase';
import type { Service, Project, TeamMember } from './supabase';

// Default fallback services
const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.',
    icon: 'Code2',
    features: ['Enterprise Applications', 'Legacy System Modernization', 'API Development & Integration', 'Microservices Architecture'],
    gradient: 'from-indigo-100 to-blue-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'User-centered design that enhances engagement and creates memorable digital experiences.',
    icon: 'Palette',
    features: ['User Research & Testing', 'Wireframing & Prototyping', 'Visual Design Systems', 'Design Thinking Workshops'],
    gradient: 'from-pink-100 to-rose-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Web Designing',
    description: 'Beautiful and functional website designs that capture your brand identity and engage visitors.',
    icon: 'Monitor',
    features: ['Responsive Web Design', 'Landing Page Creation', 'E-commerce Design', 'Website Redesign'],
    gradient: 'from-cyan-100 to-blue-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'WordPress',
    description: 'Custom WordPress solutions including theme development, plugin creation, and site optimization.',
    icon: 'Globe',
    features: ['Custom Theme Development', 'Plugin Creation', 'Performance Optimization', 'Security Implementation'],
    gradient: 'from-blue-100 to-indigo-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Graphic Designing',
    description: 'Creative visual solutions including branding, illustrations, and marketing materials.',
    icon: 'Image',
    features: ['Logo & Brand Identity', 'Marketing Materials', 'Illustrations & Icons', 'Print Design'],
    gradient: 'from-purple-100 to-pink-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Problem Solver',
    description: 'Expert problem-solving services to tackle your most challenging business and technical issues.',
    icon: 'Wrench',
    features: ['Technical Problem Solving', 'Business Process Optimization', 'System Integration Challenges', 'Debugging & Troubleshooting'],
    gradient: 'from-green-100 to-emerald-50',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

// Default fallback projects
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Event Management System',
    description: 'Full-stack MERN application for managing events, registrations, and attendee tracking with real-time updates.',
    category: 'web',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    status: 'completed',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Fitness Tracker Web App',
    description: 'Comprehensive fitness application with workout planning, progress tracking, and nutrition logging features.',
    category: 'web',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    status: 'completed',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Services API
export const servicesApi = {
  // Get all services
  async getAll(): Promise<{ data: Service[] | null; error: Error | null }> {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.warn('Supabase not configured, using fallback data');
        return { data: defaultServices, error: null };
      }

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // If table doesn't exist or error occurs, use fallback data
      if (error) {
        console.warn('Error fetching services from database, using fallback data:', error.message);
        return { data: defaultServices, error: null };
      }

      // If no data, use fallback
      if (!data || data.length === 0) {
        console.warn('No services found in database, using fallback data');
        return { data: defaultServices, error: null };
      }

      return { data, error: null };
    } catch (error: any) {
      console.warn('Exception fetching services, using fallback data:', error?.message || error);
      // Return fallback data instead of error to keep UI working
      return { data: defaultServices, error: null };
    }
  },

  // Get service by ID
  async getById(id: string): Promise<{ data: Service | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching service:', error);
      return { data: null, error: error as Error };
    }
  },

  // Create service (admin only)
  async create(service: Omit<Service, 'id' | 'created_at'>): Promise<{ data: Service | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating service:', error);
      return { data: null, error: error as Error };
    }
  },

  // Update service (admin only)
  async update(id: string, updates: Partial<Service>): Promise<{ data: Service | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating service:', error);
      return { data: null, error: error as Error };
    }
  },

  // Delete service (admin only)
  async delete(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting service:', error);
      return { error: error as Error };
    }
  },
};

// Projects API
export const projectsApi = {
  // Get all projects
  async getAll(): Promise<{ data: Project[] | null; error: Error | null }> {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.warn('Supabase not configured, using fallback data');
        return { data: defaultProjects, error: null };
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // If table doesn't exist or error occurs, use fallback data
      if (error) {
        console.warn('Error fetching projects from database, using fallback data:', error.message);
        return { data: defaultProjects, error: null };
      }

      // If no data, use fallback
      if (!data || data.length === 0) {
        console.warn('No projects found in database, using fallback data');
        return { data: defaultProjects, error: null };
      }

      return { data, error: null };
    } catch (error: any) {
      console.warn('Exception fetching projects, using fallback data:', error?.message || error);
      // Return fallback data instead of error to keep UI working
      return { data: defaultProjects, error: null };
    }
  },

  // Get featured projects
  async getFeatured(limit: number = 4): Promise<{ data: Project[] | null; error: Error | null }> {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.warn('Supabase not configured, using fallback data');
        return { data: defaultProjects.slice(0, limit), error: null };
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'completed')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      // If table doesn't exist or error occurs, use fallback data
      if (error) {
        console.warn('Error fetching featured projects from database, using fallback data:', error.message);
        return { data: defaultProjects.slice(0, limit), error: null };
      }

      // If no data, use fallback
      if (!data || data.length === 0) {
        console.warn('No featured projects found in database, using fallback data');
        return { data: defaultProjects.slice(0, limit), error: null };
      }

      return { data, error: null };
    } catch (error: any) {
      console.warn('Exception fetching featured projects, using fallback data:', error?.message || error);
      // Return fallback data instead of error to keep UI working
      return { data: defaultProjects.slice(0, limit), error: null };
    }
  },

  // Get project by ID
  async getById(id: string): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching project:', error);
      return { data: null, error: error as Error };
    }
  },

  // Get projects by category
  async getByCategory(category: string): Promise<{ data: Project[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return { data: null, error: error as Error };
    }
  },

  // Create project (admin only)
  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating project:', error);
      return { data: null, error: error as Error };
    }
  },

  // Update project (admin only)
  async update(id: string, updates: Partial<Project>): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating project:', error);
      return { data: null, error: error as Error };
    }
  },

  // Delete project (admin only)
  async delete(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { error: error as Error };
    }
  },
};

// Team Members API
export const teamApi = {
  // Get all team members
  async getAll(): Promise<{ data: TeamMember[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching team members:', error);
      return { data: null, error: error as Error };
    }
  },

  // Get team member by ID
  async getById(id: string): Promise<{ data: TeamMember | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching team member:', error);
      return { data: null, error: error as Error };
    }
  },
};

// Statistics API
export const statsApi = {
  // Get project statistics
  async getProjectStats(): Promise<{ data: any | null; error: Error | null }> {
    try {
      if (!supabase) {
        return { data: { total: defaultProjects.length, completed: defaultProjects.length, inProgress: 0, planning: 0, byCategory: {} }, error: null };
      }

      const { data: projects, error } = await supabase
        .from('projects')
        .select('status, category')
        .limit(1000);

      if (error) {
        console.warn('Error fetching project stats, using fallback:', error.message);
        return { data: { total: defaultProjects.length, completed: defaultProjects.length, inProgress: 0, planning: 0, byCategory: {} }, error: null };
      }

      const stats = {
        total: projects?.length || defaultProjects.length,
        completed: projects?.filter(p => p.status === 'completed').length || defaultProjects.length,
        inProgress: projects?.filter(p => p.status === 'in-progress').length || 0,
        planning: projects?.filter(p => p.status === 'planning').length || 0,
        byCategory: projects?.reduce((acc: any, p) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {}) || {},
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.warn('Exception fetching project stats, using fallback:', error?.message || error);
      return { data: { total: defaultProjects.length, completed: defaultProjects.length, inProgress: 0, planning: 0, byCategory: {} }, error: null };
    }
  },

  // Get service statistics
  async getServiceStats(): Promise<{ data: any | null; error: Error | null }> {
    try {
      if (!supabase) {
        return { data: { total: defaultServices.length }, error: null };
      }

      const { data: services, error } = await supabase
        .from('services')
        .select('id')
        .limit(1000);

      if (error) {
        console.warn('Error fetching service stats, using fallback:', error.message);
        return { data: { total: defaultServices.length }, error: null };
      }

      const stats = {
        total: services?.length || defaultServices.length,
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.warn('Exception fetching service stats, using fallback:', error?.message || error);
      return { data: { total: defaultServices.length }, error: null };
    }
  },
};

// Messages/Contact API
export const contactApi = {
  // Submit contact form
  async submitMessage(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<{ data: any | null; error: Error | null }> {
    try {
      // First, try to find or create a profile for the sender
      let senderId: string | null = null;

      // Check if user exists
      const { data: existingUser } = await supabase.auth.getUser();
      
      if (existingUser?.user) {
        senderId = existingUser.user.id;
      } else {
        // For anonymous users, we'll use a placeholder or create a guest profile
        // For now, we'll use a placeholder UUID
        senderId = '00000000-0000-0000-0000-000000000000';
      }

      // Get admin user ID (first admin user)
      const { data: adminUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1)
        .single();

      const recipientId = adminUser?.id || '00000000-0000-0000-0000-000000000000';

      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: senderId,
            recipient_id: recipientId,
            subject: subject,
            content: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
            is_read: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error submitting message:', error);
      return { data: null, error: error as Error };
    }
  },

  // Get messages (for admin)
  async getMessages(userId: string): Promise<{ data: any[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*, sender:profiles!messages_sender_id_fkey(id, full_name, email), recipient:profiles!messages_recipient_id_fkey(id, full_name, email)')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { data: null, error: error as Error };
    }
  },
};

