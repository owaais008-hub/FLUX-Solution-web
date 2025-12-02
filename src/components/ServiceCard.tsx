import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  gradient?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  features = [], 
  gradient = "from-indigo-50 to-violet-50",
  onClick 
}) => {
  return (
    <div 
      className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-cyan-300 relative overflow-hidden hover:scale-105 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-cyan-50 group-hover:to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-700 rounded-3xl blur-xl"></div>
      
      <div className="relative z-10">
        {/* Icon with enhanced animation */}
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg border-2 border-white/50 group-hover:border-cyan-300/50 group-hover:shadow-cyan-200/50`}>
          <div className="group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title with slide animation */}
        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-cyan-700 transition-all duration-300 transform group-hover:translate-x-1">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Features list with stagger animation */}
        {features.length > 0 && (
          <ul className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <li 
                key={idx} 
                className="flex items-center text-gray-700 group-hover:text-gray-800 transition-all duration-300 transform group-hover:translate-x-2"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300"></div>
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Contact us link with enhanced animation */}
        <div className="mt-6 flex items-center text-cyan-600 font-semibold group-hover:text-blue-600 transition-colors duration-300">
          <span className="text-sm group-hover:font-bold transition-all duration-300">Contact Us</span>
          <svg 
            className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;