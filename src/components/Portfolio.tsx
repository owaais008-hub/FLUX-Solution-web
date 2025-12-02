import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Palette, Monitor, Wrench, ArrowRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'Full-featured e-commerce solution with payment integration and inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'gradient-1'
    },
    {
      id: 2,
      title: 'Corporate Branding',
      category: 'design',
      description: 'Complete brand identity including logo, color palette, and marketing materials.',
      technologies: ['Adobe Illustrator', 'Photoshop', 'Figma'],
      image: 'gradient-2'
    },
    {
      id: 3,
      title: 'WordPress Blog',
      category: 'wordpress',
      description: 'Custom WordPress theme with responsive design and SEO optimization.',
      technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
      image: 'gradient-3'
    },
    {
      id: 4,
      title: 'Task Management App',
      category: 'web',
      description: 'Collaborative task management platform with real-time updates.',
      technologies: ['React', 'Node.js', 'Socket.io', 'JWT'],
      image: 'gradient-4'
    },
    {
      id: 5,
      title: 'Mobile Banking App',
      category: 'mobile',
      description: 'Secure financial application with biometric authentication.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: 'gradient-5'
    },
    {
      id: 6,
      title: 'Business Website',
      category: 'wordpress',
      description: 'Professional business website with custom theme and contact forms.',
      technologies: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
      image: 'gradient-6'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'wordpress', name: 'WordPress' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const getGradientClass = (image: string) => {
    const gradients: { [key: string]: string } = {
      'gradient-1': 'from-blue-500 via-cyan-500 to-teal-500',
      'gradient-2': 'from-pink-500 via-rose-500 to-red-500',
      'gradient-3': 'from-violet-500 via-purple-500 to-fuchsia-500',
      'gradient-4': 'from-emerald-500 via-green-500 to-lime-500',
      'gradient-5': 'from-orange-500 via-amber-500 to-yellow-500',
      'gradient-6': 'from-sky-500 via-blue-500 to-indigo-500'
    };
    return gradients[image] || 'from-gray-500 to-gray-700';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Explore our latest projects showcasing our expertise across various domains and technologies.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${getGradientClass(item.image)} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {item.github && (
                    <a 
                      href={item.github} 
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.category === 'web' ? 'bg-cyan-100 text-cyan-800' :
                    item.category === 'design' ? 'bg-pink-100 text-pink-800' :
                    item.category === 'wordpress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.category === 'web' ? 'Web Development' :
                     item.category === 'design' ? 'Graphic Design' :
                     item.category === 'wordpress' ? 'WordPress' :
                     'Mobile App'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200">
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;