import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How long does it take to complete a website project?",
      answer: "The timeline varies based on project complexity. A basic website typically takes 2-4 weeks, while more complex projects can take 2-6 months. We provide a detailed timeline during our initial consultation.",
      category: "general"
    },
    {
      id: 2,
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, we offer various maintenance packages. Our Basic plan includes 1 month of support, Professional plan includes 3 months, and Enterprise plan includes 6 months of premium support with regular updates and monitoring.",
      category: "services"
    },
    {
      id: 3,
      question: "What platforms do you develop for?",
      answer: "We specialize in web development using modern frameworks like React, Vue.js, and Angular. For mobile apps, we work with both native (iOS Swift, Android Kotlin) and cross-platform solutions (React Native, Flutter). We also work with WordPress, Shopify, and custom CMS solutions.",
      category: "technical"
    },
    {
      id: 4,
      question: "How do you ensure the security of my project?",
      answer: "Security is a top priority. We implement industry-standard practices including SSL certificates, secure authentication, regular security audits, data encryption, and compliance with GDPR and other relevant regulations. We also provide ongoing security updates.",
      category: "security"
    },
    {
      id: 5,
      question: "Can you help with SEO optimization?",
      answer: "Absolutely! We build SEO-friendly websites from the ground up and offer comprehensive SEO services including keyword research, on-page optimization, content strategy, and performance optimization to improve your search engine rankings.",
      category: "marketing"
    },
    {
      id: 6,
      question: "What is your development process?",
      answer: "Our process includes discovery and planning, design and prototyping, development and testing, deployment, and ongoing support. We maintain transparent communication throughout with regular updates and milestone reviews.",
      category: "general"
    },
    {
      id: 7,
      question: "Do you provide content creation services?",
      answer: "Yes, we offer content creation as part of our service package. This includes copywriting, blog content, product descriptions, and multimedia content creation. We work with professional writers and designers to ensure high-quality results.",
      category: "services"
    },
    {
      id: 8,
      question: "How do we handle project revisions?",
      answer: "We include a specific number of revision rounds in each package. Basic plans include 1-2 rounds of revisions, Professional plans include 3-4 rounds, and Enterprise plans include unlimited revisions during the development phase. Major changes after approval may incur additional costs.",
      category: "general"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqData.length },
    { id: 'general', name: 'General', count: faqData.filter(item => item.category === 'general').length },
    { id: 'services', name: 'Services', count: faqData.filter(item => item.category === 'services').length },
    { id: 'technical', name: 'Technical', count: faqData.filter(item => item.category === 'technical').length },
    { id: 'security', name: 'Security', count: faqData.filter(item => item.category === 'security').length },
    { id: 'marketing', name: 'Marketing', count: faqData.filter(item => item.category === 'marketing').length }
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
            <HelpCircle className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm font-medium text-cyan-300">FAQ</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our services, processes, and policies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} <span className="text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((item) => (
              <div 
                key={item.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">{item.question}</h3>
                  {openId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  )}
                </button>
                
                {openId === item.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Can't find the answer you're looking for? We're here to help with any additional questions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:flux.solution929@gmail.com"
              className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a 
              href="tel:+923194699095"
              className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <button 
              onClick={() => {
                const event = new CustomEvent('navigateToPage', { detail: 'contact' });
                window.dispatchEvent(event);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;