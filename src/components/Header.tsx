import React, { useEffect, useState } from 'react';
import { Home, Users, Briefcase, FolderKanban, HelpCircle, Mail, Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      if (event.detail && typeof event.detail === 'string') {
        setIsLoading(true);
        setCurrentPage(event.detail);
        setIsMenuOpen(false); // Close mobile menu when navigating

        // Simulate loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    window.addEventListener('navigateToPage', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('navigateToPage', handleNavigation as EventListener);
    };
  }, [setCurrentPage]);

  const handleNavigation = (page: string) => {
    // Add smooth scrolling to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setIsLoading(true);
    setCurrentPage(page);
    setIsMenuOpen(false);

    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
      : 'bg-white/95 backdrop-blur-2xl shadow-md border-b border-white/30'
      }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className="relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse"></div>
              <img
                src={logo}
                alt="Company Logo"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white/80 shadow-xl relative z-10 backdrop-blur-sm group-hover:border-cyan-300 transition-colors"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                Flux
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 tracking-wider group-hover:text-cyan-600 transition-colors duration-300 font-medium">
                INNOVATION CONNECTS
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  disabled={isLoading}
                  className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive
                    ? 'text-cyan-600 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md'
                    : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-50/80'
                    } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Phone button - visible on larger screens */}
            <a
              href="tel:+923194699095"
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Call</span>
            </a>

            {/* Get Started button */}
            <button
              onClick={() => handleNavigation('contact')}
              disabled={isLoading}
              className={`hidden md:flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              <Mail className="w-4 h-4" />
              <span>Get Started</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden relative p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={isLoading}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 border-t border-gray-200/50 mt-2 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  disabled={isLoading}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-medium text-left transition-all duration-300 ${isActive
                    ? 'text-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
                    } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
            <a
              href="tel:+923194699095"
              className="flex items-center space-x-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-gray-500" />
              <span>Call Us</span>
            </a>
            <button
              onClick={() => handleNavigation('contact')}
              disabled={isLoading}
              className={`w-full mt-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              <Mail className="w-5 h-5" />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500">
          <div className="h-full w-1/3 bg-white/50 animate-[shimmer_1.5s_infinite]"></div>
        </div>
      )}
    </header>
  );
};

export default Header;