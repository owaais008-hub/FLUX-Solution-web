import React, { useEffect } from 'react';
import { Target, Lightbulb, Users, Rocket } from 'lucide-react';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';
// import { supabase } from '../lib/supabase'; // Commented out unused import

const AboutUs: React.FC = () => {
  const stats = [
    { value: "30+", label: "Projects Completed", color: "text-blue-600", bg: "from-cyan-50 to-blue-50" },
    { value: "30+", label: "Happy Clients", color: "text-pink-600", bg: "from-blue-50 to-pink-50" },
    { value: "5+", label: "Years Experience", color: "text-cyan-600", bg: "from-pink-50 to-cyan-50" },
    { value: "15+", label: "Team Members", color: "text-blue-600", bg: "from-cyan-50 to-blue-50" }
  ];

  const values = [
    {
      icon: <Target className="w-7 h-7 text-white" />,
      title: "Excellence",
      description: "We strive for excellence in every project, ensuring the highest quality standards and attention to detail.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lightbulb className="w-7 h-7 text-white" />,
      title: "Innovation",
      description: "We embrace new technologies and creative approaches to solve complex challenges and stay ahead.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Collaboration",
      description: "We work closely with our clients, fostering partnerships built on trust, transparency, and communication.",
      gradient: "from-pink-500 to-blue-500"
    }
  ];

  useEffect(() => {
    const fetchStats = async () => {
      // In a real implementation, you would fetch stats from Supabase
      // const { data, error } = await supabase.from('stats').select('*');
      // if (data) setStats(data);
    };

    const fetchValues = async () => {
      // In a real implementation, you would fetch values from Supabase
      // const { data, error } = await supabase.from('values').select('*');
      // if (data) setValues(data);
    };

    fetchStats();
    fetchValues();
  }, []);

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
            src="/Screenshot%202025-10-22%20194707.png" 
            alt="About Us" 
            className="w-full h-full object-cover opacity-10 animate-pulse-slow"
          />
          {/* Fallback for missing image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-300">ABOUT US</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Flux</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              We are a team of passionate innovators dedicated to building cutting-edge software solutions that transform businesses and empower ideas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  // Find the Projects link in the header and simulate a click
                  const event = new CustomEvent('navigateToPage', { detail: 'projects' });
                  window.dispatchEvent(event);
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm hover:scale-105 shadow-lg"
              >
                <span>Our Projects</span>
                <Rocket className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Story</span></h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Founded with a vision to revolutionize the digital landscape, Flux has grown into a trusted partner for businesses seeking innovative technology solutions. Our journey began with a simple belief: technology should empower, not complicate.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Today, we work with clients across the globe, delivering exceptional web applications, problem-solving solutions, and cloud infrastructure that drive real business results.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our team combines technical expertise with creative thinking to solve complex challenges and create elegant, user-friendly solutions.
              </p>
              
              <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  At Flux Solutions, we empower businesses through innovative technology solutions that drive growth, efficiency, and competitive advantage. Our team of expert developers and designers create cutting-edge software products tailored to your unique business needs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.bg} p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm border border-white/30 cursor-pointer`} 
                  onClick={() => {
                    // Add animation effect when clicking on stats
                    const element = document.getElementById(`stat-${index}`);
                    if (element) {
                      element.classList.add('animate-pulse');
                      setTimeout(() => {
                        element.classList.remove('animate-pulse');
                      }, 1000);
                    }
                  }}
                  id={`stat-${index}`}>
                  <div className={`text-5xl font-bold ${stat.color} mb-3`}>{stat.value}</div>
                  <div className="text-gray-700 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Values</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 relative overflow-hidden hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-cyan-50 group-hover:to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      
    </div>
  );
};

export default AboutUs;