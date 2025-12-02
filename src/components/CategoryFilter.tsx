import { Code2, Palette, Wrench, Monitor, Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: { id: string; name: string; icon: string }[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const iconMap: Record<string, any> = {
  web: Monitor,
  design: Palette,
  wordpress: Wrench,
  development: Code2,
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>All Projects</span>
          </button>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Monitor;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
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