import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code2, Palette, Filter, Monitor, Brush, Wrench, Star, Loader2 } from 'lucide-react';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import { projectsApi } from '../lib/services';
import type { Project } from '../lib/supabase';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'graphic' | 'wordpress' | 'mobile' | 'other'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      
      try {
        // API has built-in fallback, so we don't need to handle errors here
        const { data } = await projectsApi.getAll();
        if (data && data.length > 0) {
          setProjects(data.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
        }
      } catch (err: any) {
        console.warn('Non-critical error fetching projects (fallback will be used):', err?.message || err);
        // Don't set error - API has fallback built-in
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getGradientClass = (project: Project) => {
    if (project.gradient) {
      return project.gradient;
    }
    // Default gradients based on category
    const categoryGradients: { [key: string]: string } = {
      'web': 'from-blue-500 via-cyan-500 to-teal-500',
      'graphic': 'from-pink-500 via-rose-500 to-red-500',
      'wordpress': 'from-violet-500 via-purple-500 to-fuchsia-500',
      'mobile': 'from-emerald-500 via-green-500 to-lime-500',
      'other': 'from-orange-500 via-amber-500 to-yellow-500',
    };
    return categoryGradients[project.category] || 'from-gray-500 to-gray-700';
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-64 md:py-80 relative overflow-hidden">
        <ParticleBackground 
          particleCount={40}
          particleColor="rgba(56, 189, 248, 0.2)"
          particleSize={2}
          speed={0.1}
          className="opacity-20"
        />
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/70"></div>
          <img 
            src="/FLUX-Solution-web/Screenshot%202025-10-22%20194707.png" 
            alt="Projects" 
            className="w-full h-full object-cover opacity-20 animate-pulse-slow"
          />
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              At Flux Solutions, we've successfully delivered a wide range of projects for clients across various industries. Explore our latest work showcasing web development, graphic design, and WordPress solutions that demonstrate our expertise and commitment to quality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all backdrop-blur-sm ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white/90 border border-white/30'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 backdrop-blur-sm ${
                  activeFilter === 'web'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white/90 border border-white/30'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Web Development</span>
              </button>
              <button
                onClick={() => setActiveFilter('graphic')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 backdrop-blur-sm ${
                  activeFilter === 'graphic'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white/90 border border-white/30'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Graphic Design</span>
              </button>
              <button
                onClick={() => setActiveFilter('wordpress')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 backdrop-blur-sm ${
                  activeFilter === 'wordpress'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white/90 border border-white/30'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>WordPress</span>
              </button>
              <button
                onClick={() => setActiveFilter('mobile')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 backdrop-blur-sm ${
                  activeFilter === 'mobile'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white/90 border border-white/30'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Mobile</span>
              </button>
            </div>

          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">
                {activeFilter === 'all' 
                  ? 'No projects available at the moment.' 
                  : `No ${activeFilter} projects found.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ScrollReveal
                  key={project.id}
                  direction="up"
                  delay={0.1 * (index + 1)}
                  className="h-full"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies || []}
                    category={project.category as 'web' | 'graphic' | 'wordpress'}
                    gradientClass={getGradientClass(project)}
                    onClick={() => {
                      if (project.live_url) {
                        window.open(project.live_url, '_blank');
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Have a Project in Mind?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Let's work together to bring your ideas to life with cutting-edge technology and beautiful design.
          </p>
          <button 
            onClick={() => {
              // Dispatch a custom event to navigate to the contact page
              const event = new CustomEvent('navigateToPage', { detail: 'contact' });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-sm hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default Projects;