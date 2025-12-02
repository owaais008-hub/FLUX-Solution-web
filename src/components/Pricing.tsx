import React, { useState } from 'react';
import { Check, X, Zap, Star, Award, Crown, Rocket } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  featured?: boolean;
  icon: React.ReactNode;
}

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? '$999' : '$9,999',
      period: billingCycle === 'monthly' ? '/project' : '/year',
      description: 'Perfect for small businesses and startups',
      features: [
        'Basic Website Design (Up to 5 pages)',
        'Responsive Design',
        'Contact Form Integration',
        'SEO Basic Setup',
        '1 Month Free Support',
        'Basic Analytics Integration'
      ],
      notIncluded: [
        'E-commerce Functionality',
        'Custom Database Integration',
        'Advanced Animations'
      ],
      icon: <Star className="w-8 h-8 text-blue-500" />
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? '$2,499' : '$24,999',
      period: billingCycle === 'monthly' ? '/project' : '/year',
      description: 'Ideal for growing businesses',
      features: [
        'Custom Website Development',
        'Advanced UI/UX Design',
        'CMS Integration (WordPress)',
        'E-commerce Functionality',
        'Payment Gateway Integration',
        '3 Months Support',
        'Advanced SEO Optimization',
        'Performance Optimization',
        'Social Media Integration'
      ],
      notIncluded: [
        'Mobile App Development',
        'Advanced AI Integration'
      ],
      featured: true,
      icon: <Award className="w-8 h-8 text-cyan-500" />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? '$4,999' : '$49,999',
      period: billingCycle === 'monthly' ? '/project' : '/year',
      description: 'For large organizations with complex needs',
      features: [
        'Full-Stack Web Application',
        'Custom Database Design',
        'Mobile App Development',
        'API Development & Integration',
        'Advanced Security Implementation',
        'Cloud Infrastructure Setup',
        '6 Months Premium Support',
        'Advanced Analytics & Reporting',
        'AI/Machine Learning Integration',
        'Dedicated Project Manager',
        'Monthly Performance Reviews'
      ],
      icon: <Crown className="w-8 h-8 text-purple-500" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-300">PRICING PLANS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transparent <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the perfect plan for your business needs. All plans include our commitment to quality and customer satisfaction.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative rounded-full w-14 h-7 bg-gradient-to-r from-cyan-500 to-blue-500 transition-colors"
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                billingCycle === 'monthly' ? 'left-1' : 'left-8'
              }`}></div>
            </button>
            <span className={`ml-4 font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-8 shadow-xl border transition-all duration-300 hover:scale-105 ${
                plan.featured 
                  ? 'bg-gradient-to-br from-white to-gray-50 border-cyan-300 shadow-2xl ring-2 ring-cyan-500/20' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center">
                    <Rocket className="w-4 h-4 mr-2" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    plan.featured 
                      ? 'bg-gradient-to-br from-cyan-100 to-blue-100' 
                      : 'bg-gray-100'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                
                {plan.notIncluded && (
                  <>
                    {plan.notIncluded.map((feature, index) => (
                      <li key={index} className="flex items-start opacity-60">
                        <X className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-500 line-through">{feature}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              
              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                  plan.featured
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.featured ? (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started
                  </>
                ) : (
                  'Learn More'
                )}
              </button>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">What's included in ongoing support?</h4>
              <p className="text-gray-600">
                Our support includes bug fixes, minor updates, and technical assistance. 
                The duration depends on your chosen plan.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">Can I upgrade my plan later?</h4>
              <p className="text-gray-600">
                Yes, you can upgrade to a higher plan at any time. 
                We'll prorate the difference based on your current billing cycle.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">Do you offer custom solutions?</h4>
              <p className="text-gray-600">
                Absolutely! Our Enterprise plan is designed for custom solutions. 
                We can also create a tailored package for unique requirements.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">What's your refund policy?</h4>
              <p className="text-gray-600">
                We offer a 30-day satisfaction guarantee. 
                If you're not happy with our service, we'll work to resolve issues or provide a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;