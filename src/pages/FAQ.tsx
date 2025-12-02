import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What services do you offer?",
      answer: "We provide comprehensive software development services including web development, mobile app development, UI/UX design, WordPress solutions, graphic design, and problem-solving services for complex technical challenges.",
      category: "services"
    },
    {
      id: 2,
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and scope. Simple websites can be completed in 2-4 weeks, while complex applications may take 3-6 months. We provide detailed timelines during our initial consultation.",
      category: "timeline"
    },
    {
      id: 3,
      question: "What is your pricing structure?",
      answer: "Our pricing is customized based on project requirements. We offer hourly rates for ongoing work and fixed-price quotes for well-defined projects. Contact us for a detailed proposal based on your specific needs.",
      category: "pricing"
    },
    {
      id: 4,
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your software continues to perform optimally. This includes bug fixes, updates, security patches, and performance optimization.",
      category: "support"
    },
    {
      id: 5,
      question: "Which technologies do you specialize in?",
      answer: "We work with modern technologies including React, Vue.js, Node.js, Python, WordPress, Flutter, and various cloud platforms. Our team stays updated with the latest industry trends to provide cutting-edge solutions.",
      category: "technology"
    },
    {
      id: 6,
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Our QA process ensures every project meets the highest standards before delivery.",
      category: "quality"
    },
    {
      id: 7,
      question: "Can you work with our existing team?",
      answer: "Absolutely! We specialize in collaborative development and can integrate seamlessly with your existing team. We provide dedicated developers who can work as an extension of your in-house team.",
      category: "collaboration"
    },
    {
      id: 8,
      question: "What industries do you serve?",
      answer: "We serve clients across various industries including e-commerce, healthcare, finance, education, real estate, and technology startups. Our adaptable approach allows us to understand and address industry-specific requirements.",
      category: "industries"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'services', name: 'Services' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'support', name: 'Support' },
    { id: 'technology', name: 'Technology' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-64 md:py-80 relative overflow-hidden">
        <ParticleBackground 
          particleCount={40}
          particleColor="rgba(56, 189, 248, 0.2)"
          particleSize={2}
          speed={0.1}
          className="opacity-20"
        />
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/70"></div>
          <img 
            src="/FLUX-Solution-web/Screenshot%202025-10-22%20194707.png" 
            alt="FAQ" 
            className="w-full h-full object-cover opacity-20 animate-pulse-slow"
          />
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <HelpCircle className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">FAQ</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Find answers to common questions about our services, processes, and policies. Can't find what you're looking for? Chat with our AI assistant or contact us directly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                    <div className={`transform transition-transform duration-300 ${openQuestion === item.id ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openQuestion === item.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;