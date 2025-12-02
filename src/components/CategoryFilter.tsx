import { Code, Music, Trophy, GraduationCap, Users } from 'lucide-react';
import { Category } from '../lib/supabase';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const iconMap: Record<string, any> = {
  code: Code,
  music: Music,
  trophy: Trophy,
  'graduation-cap': GraduationCap,
  users: Users,
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Events
          </button>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Users;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  selectedCategory === category.id
                    ? { background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` }
                    : {}
                }
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
