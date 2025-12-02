import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, Code2, Palette, Monitor, Globe, Image, Wrench, Loader2 } from 'lucide-react';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';
import TypingText from '../components/TypingText';
import ParallaxImage from '../components/ParallaxImage';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';
import { servicesApi, projectsApi, statsApi } from '../lib/services';
import type { Service, Project } from '../lib/supabase';

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  Code2: <Code2 className="w-8 h-8 text-indigo-600" />,
  Palette: <Palette className="w-8 h-8 text-pink-600" />,
  Monitor: <Monitor className="w-8 h-8 text-cyan-600" />,
  Globe: <Globe className="w-8 h-8 text-blue-600" />,
  Image: <Image className="w-8 h-8 text-purple-600" />,
  Wrench: <Wrench className="w-8 h-8 text-green-600" />,
};

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({ projects: 30, services: 6, clients: 30 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch services (with built-in fallback)
        const { data: servicesData } = await servicesApi.getAll();
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData.filter(s => s.is_active !== false).slice(0, 6));
        }

        // Fetch featured projects (with built-in fallback)
        const { data: projectsData } = await projectsApi.getFeatured(4);
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
        }

        // Fetch statistics (with built-in fallback)
        const [projectStats, serviceStats] = await Promise.all([
          statsApi.getProjectStats(),
          statsApi.getServiceStats(),
        ]);

        if (projectStats.data && serviceStats.data) {
          setStats({
            projects: projectStats.data.total || 0,
            services: serviceStats.data.total || 0,
            clients: 30, // This could come from a clients table
          });
        } else {
          // Set default stats if API fails
          setStats({
            projects: 2,
            services: 6,
            clients: 30,
          });
        }
      } catch (err: unknown) {
        console.warn('Error in fetchData (non-critical, using fallbacks):', err instanceof Error ? err.message : String(err));
        // Don't set error state - APIs have fallbacks built-in
        // Just ensure we have some data displayed
        if (services.length === 0) {
          // Data will be loaded from API fallbacks
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(2deg);
            }
          }
          
          @keyframes float-delayed {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(-2deg);
            }
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          .animate-float-delay {
            animation: float-delayed 5s ease-in-out infinite;
            animation-delay: 1s;
          }

          @keyframes hero-fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hero-content {
            animation: hero-fade-in 1s ease-out;
          }

          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(56, 189, 248, 0.6);
            }
          }

          .hero-image-container {
            animation: glow-pulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10"></div>
        
        <ParticleBackground 
          particleCount={60}
          particleColor="rgba(56, 189, 248, 0.4)"
          particleSize={3}
          speed={0.25}
          className="opacity-40"
        />
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 to-slate-900/75"></div>
          <ParallaxImage 
            src="/Screenshot%202025-10-22%20194707.png" 
            alt="Background" 
            className="opacity-15"
            speed={0.25}
          />
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-56 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 hero-content">
              <ScrollReveal direction="down" delay={0.2}>
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm font-medium text-cyan-300">NEW INNOVATION RELEASED</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                      We Build Digital
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      <TypingText 
                        texts={['Experiences', 'Solutions', 'Innovations', 'Applications']}
                        speed={120}
                        pauseDuration={2000}
                      />
                    </span>
                  </h1>

                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    Building cutting-edge software solutions that empower businesses and ideas with unprecedented innovation. Transforming your vision into reality.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('navigateToPage', { detail: 'services' });
                      window.dispatchEvent(event);
                    }}
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm hover:scale-110 shadow-xl active:scale-95"
                  >
                    <span>EXPLORE SERVICES</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('navigateToPage', { detail: 'projects' });
                      window.dispatchEvent(event);
                    }}
                    className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-110 shadow-lg active:scale-95"
                  >
                    <span>VIEW PROJECTS</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.5}>
              <div className="relative">
                <div className="relative w-full h-96 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-md border-2 border-cyan-400/40 overflow-hidden shadow-2xl hero-image-container hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/Screenshot%202025-10-22%20194707.png" 
                      alt="Innovation" 
                      className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute w-72 h-72 bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                  </div>
                  
                  <div className="absolute top-8 left-8 w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-xl animate-float hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-xl animate-float-delay hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl"></div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 animate-pulse"></div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-400/40 to-pink-500/40 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {stats.projects > 0 || stats.services > 0 ? (
        <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyan-600 mb-2">{stats.projects}+</div>
                  <div className="text-gray-700 font-semibold">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{stats.services}</div>
                  <div className="text-gray-700 font-semibold">Services Offered</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">{stats.clients}+</div>
                  <div className="text-gray-700 font-semibold">Happy Clients</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ) : null}

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-cyan-600">WHAT WE OFFER</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive solutions designed to transform your business and accelerate growth with cutting-edge technology
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollReveal 
                  key={service.id || index}
                  direction="up" 
                  delay={0.1 * (index + 1)}
                  className="h-full"
                >
                  <ServiceCard
                    icon={iconMap[service.icon] || <Code2 className="w-8 h-8 text-indigo-600" />}
                    title={service.title}
                    description={service.description}
                    features={service.features || []}
                    gradient={service.gradient || "from-indigo-100 to-blue-50"}
                    onClick={() => {
                      // Navigate to contact page
                      const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                      window.dispatchEvent(event);
                      // Scroll to top after a small delay to allow page transition
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm mb-4">
                  <span className="text-sm font-medium text-purple-600">OUR WORK</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Featured <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Projects</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Our latest innovations in web application development that showcase our expertise and creativity
                </p>
              </div>
              
              <div className="flex space-x-4 mt-6 md:mt-0">
                <button className="p-4 rounded-full border-2 border-gray-200 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-300 shadow-sm hover:shadow-lg backdrop-blur-sm bg-white/80 hover:scale-110 active:scale-95">
                  <Heart className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'projects' });
                    window.dispatchEvent(event);
                  }}
                  className="p-4 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-lg backdrop-blur-sm bg-white/80 hover:scale-110 active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No projects available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <ScrollReveal 
                  key={project.id || index}
                  direction="up" 
                  delay={0.15 * (index + 1)}
                  className="h-full"
                >
                  <div 
                    className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border-2 border-white/20 hover:border-cyan-400/50 hover:scale-105 hover:-translate-y-2"
                    onClick={() => {
                      const event = new CustomEvent('navigateToPage', { detail: 'projects' });
                      window.dispatchEvent(event);
                    }}
                  >
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                      />
                    ) : null}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-blue-500 via-cyan-500 to-teal-500'} group-hover:opacity-95 transition-opacity duration-500`}></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                        <div className="mb-2">
                          <div className="w-12 h-1 bg-white/50 rounded-full mb-3 group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">{project.title}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {project.technologies.slice(0, 2).map((tech, idx) => (
                              <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
          
          <ScrollReveal direction="up" delay={0.5}>
            <div className="text-center mt-16">
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                  window.dispatchEvent(event);
                }}
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 backdrop-blur-sm hover:scale-110 active:scale-95 animate-gradient"
                style={{ backgroundSize: '200% 200%' }}
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Home;