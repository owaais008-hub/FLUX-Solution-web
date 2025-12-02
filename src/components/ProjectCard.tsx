import React from 'react';
import { ExternalLink, Github, Monitor, Brush, Wrench } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: 'web' | 'graphic' | 'wordpress' | 'mobile' | 'other';
  gradientClass: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  technologies, 
  category,
  gradientClass,
  onClick 
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'web': return <Monitor className="w-16 h-16 text-white opacity-70" />;
      case 'graphic': return <Brush className="w-16 h-16 text-white opacity-70" />;
      case 'wordpress': return <Wrench className="w-16 h-16 text-white opacity-70" />;
      case 'mobile': return <Monitor className="w-16 h-16 text-white opacity-70" />;
      case 'other': return <Monitor className="w-16 h-16 text-white opacity-70" />;
      default: return null;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'web': return 'Web Development';
      case 'graphic': return 'Graphic Design';
      case 'wordpress': return 'WordPress';
      case 'mobile': return 'Mobile App';
      case 'other': return 'Other';
      default: return category;
    }
  };

  const getCategoryStyles = () => {
    switch (category) {
      case 'web': return 'bg-cyan-100/80 text-cyan-700 border-cyan-200';
      case 'graphic': return 'bg-pink-100/80 text-pink-700 border-pink-200';
      case 'wordpress': return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'mobile': return 'bg-green-100/80 text-green-700 border-green-200';
      case 'other': return 'bg-orange-100/80 text-orange-700 border-orange-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/30 hover:scale-105 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative h-48 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors shadow-lg">
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors shadow-lg">
            <Github className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/Screenshot%202025-10-22%20194707.png" 
            alt={title} 
            className="w-full h-full object-contain opacity-20"
          />
          {getCategoryIcon()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${getCategoryStyles()}`}>
            {getCategoryLabel()}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/50 backdrop-blur-sm text-gray-600 text-xs rounded-full border border-white/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;