import React from 'react';
import { ArrowRight, Zap, Phone, Mail } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-500 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join hundreds of satisfied clients who have revolutionized their operations with our software solutions. Let's discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>Schedule a Call</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-white">5+ years of industry experience</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-white">50+ successful projects delivered</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-white">98% client satisfaction rate</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-white">24/7 dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;