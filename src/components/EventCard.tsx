import { ExternalLink, Github, Code2, Palette, Wrench, Monitor } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  category: string;
  live_url?: string;
  github_url?: string;
}

interface ProjectCardProps {
  project: Project;
}

const categoryIcons: Record<string, any> = {
  web: Monitor,
  design: Palette,
  wordpress: Wrench,
  development: Code2,
};

const categoryColors: Record<string, string> = {
  web: 'from-blue-500 to-cyan-500',
  design: 'from-purple-500 to-pink-500',
  wordpress: 'from-blue-600 to-blue-800',
  development: 'from-green-500 to-teal-500',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = categoryIcons[project.category] || Monitor;
  const gradient = categoryColors[project.category] || 'from-gray-500 to-gray-700';

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center space-x-1">
          <Icon className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex space-x-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 bg-gray-800 text-white hover:shadow-lg hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}