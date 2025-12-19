import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import FallingCodeAnimation from '../components/FallingCodeAnimation';
import ParticleBackground from '../components/ParticleBackground';



const NotFound: React.FC = () => {
  const handleGoHome = () => {
    // Dispatch a custom event to navigate to the home page
    const event = new CustomEvent('navigateToPage', { detail: 'home' });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-40 md:py-56 relative overflow-hidden">
        <ParticleBackground
          particleCount={50}
          particleColor="rgba(56, 189, 248, 0.3)"
          particleSize={3}
          speed={0.2}
          className="opacity-30"
        />

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/70"></div>
          <img
            src={heroBg}
            alt="404 Background"
            className="w-full h-full object-cover opacity-20 animate-pulse-slow"
          />
          <FallingCodeAnimation />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8 shadow-lg">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-300">ERROR 404</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">404</span>
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Page <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Not Found</span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={handleGoHome}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-3 text-lg backdrop-blur-sm hover:scale-105 shadow-lg"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </button>

              <button
                onClick={() => window.history.back()}
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-3 text-lg hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;