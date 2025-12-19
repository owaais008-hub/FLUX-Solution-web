import React, { useEffect, useState } from 'react';
import { Code2, Palette, Monitor, Image, Globe, Wrench, Zap, Loader2 } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';
import { servicesApi } from '../lib/services';
import type { Service } from '../lib/supabase';

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  Code2: <Code2 className="w-10 h-10 text-indigo-600" />,
  Palette: <Palette className="w-10 h-10 text-pink-600" />,
  Monitor: <Monitor className="w-10 h-10 text-cyan-600" />,
  Globe: <Globe className="w-10 h-10 text-blue-600" />,
  Image: <Image className="w-10 h-10 text-purple-600" />,
  Wrench: <Wrench className="w-10 h-10 text-green-600" />,
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        // API has built-in fallback, so we don't need to handle errors here
        const { data } = await servicesApi.getAll();
        if (data && data.length > 0) {
          setServices(data.filter(s => s.is_active !== false).sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
        }
      } catch (err: unknown) {
        console.warn('Non-critical error fetching services (fallback will be used):', err instanceof Error ? err.message : String(err));
        // Don't set error - API has fallback built-in
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const techStack = [
    { name: "HTML5", category: "Frontend" },
    { name: "MERN Stack", category: "Full Stack" },
    { name: "Figma Designing", category: "UI/UX" },
    { name: "Flutter", category: "Mobile" },
    { name: "Java", category: "Backend" },
    { name: "WordPress", category: "CMS" },
    { name: "PHP", category: "Backend" }
  ];

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
            src={heroBg}
            alt="Services"
            className="w-full h-full object-cover opacity-10 animate-pulse-slow"
          />
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-300">OUR SERVICES</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              At Flux Solutions, we provide comprehensive software solutions designed to transform your business and accelerate growth with cutting-edge technology. Our expert team delivers high-quality digital products tailored to your unique requirements.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Offer</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end software development services tailored to your business needs
            </p>
          </div>

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
                    icon={iconMap[service.icon] || <Code2 className="w-10 h-10 text-indigo-600" />}
                    title={service.title}
                    description={service.description}
                    features={service.features || []}
                    gradient={service.gradient || "from-indigo-50 to-violet-50"}
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Technologies <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">We Work With</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge tools and frameworks that power our software solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-cyan-600">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Business?</span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join hundreds of satisfied clients who have revolutionized their operations with our software solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => {
                // Dispatch a custom event to navigate to the contact page
                const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                window.dispatchEvent(event);
              }}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-2 text-lg backdrop-blur-sm hover:scale-105"
            >
              <span>Get Started Today</span>
              <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;