import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  value, 
  label, 
  icon: Icon, 
  gradient,
  delay = 0 
}) => {
  return (
    <div 
      className={`bg-gradient-to-br ${gradient} p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm border border-white/30 cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-5xl font-bold text-gray-900 mb-3">{value}</div>
      <div className="text-gray-700 font-semibold">{label}</div>
    </div>
  );
};

export default StatsCard;

