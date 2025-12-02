import { Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                EventSphere
              </h1>
              <p className="text-xs text-gray-500">College Events Hub</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </a>
            <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Categories
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
              Host Event
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-3">
          <a href="#events" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
            Events
          </a>
          <a href="#categories" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
            Categories
          </a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">
            About
          </a>
          <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium">
            Host Event
          </button>
        </div>
      )}
    </nav>
  );
}
