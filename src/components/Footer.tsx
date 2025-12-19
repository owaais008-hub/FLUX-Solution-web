import React from 'react';
import { Code2, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Wrench } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 pt-20 pb-10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(56, 189, 248, 0.1) 2px, rgba(56, 189, 248, 0.1) 4px)`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => {
              const event = new CustomEvent('navigateToPage', { detail: 'home' });
              window.dispatchEvent(event);
            }}>
              <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <img
                  src={logo}
                  alt="Company Logo"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/50 shadow-xl relative z-10 backdrop-blur-sm"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Flux</h2>
                <p className="text-xs text-gray-400 tracking-wider group-hover:text-cyan-300 transition-colors duration-300">INNOVATION CONNECTS</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Building cutting-edge software solutions that empower businesses and ideas with unprecedented innovation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/flux-solutions-79505838a/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-cyan-500/30 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/flux_solution/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-cyan-500/30 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-cyan-500/30 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'home' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'about' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'projects' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>UI/UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Web Designing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>WordPress
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Graphic Designing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'services' });
                    window.dispatchEvent(event);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>Problem Solver
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4 group">
                <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Location</h4>
                  <span className="text-gray-400">Karachi, Sindh, Pakistan</span>
                </div>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Phone</h4>
                  <a href="tel:+923194699095" className="text-gray-400 hover:text-cyan-400 transition-colors">+92 319 4699095</a>
                </div>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Email</h4>
                  <a href="mailto:flux.solution929@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">flux.solution929@gmail.com</a>
                </div>
              </li>
              <li className="mt-6">
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                    window.dispatchEvent(event);
                  }}
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <span className="font-medium">Send us a message</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; 2025 Flux Innovation Connects. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors hover:underline">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors hover:underline">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors hover:underline">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">Stay connected:</span>
              <div className="flex space-x-3">
                <a href="https://www.linkedin.com/in/flux-solutions-79505838a/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/flux_solution/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;