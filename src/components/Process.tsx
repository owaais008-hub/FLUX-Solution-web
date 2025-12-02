import React from 'react';
import { Lightbulb, Palette, Code2, TestTube, Rocket, Users, CheckCircle } from 'lucide-react';

const Process: React.FC = () => {
  const processSteps = [
    {
      id: 1,
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and project requirements. We create a detailed project plan and timeline.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 2,
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Design & Prototyping",
      description: "Our designers create wireframes and prototypes to visualize the solution. We focus on user experience and create stunning visual designs.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 3,
      icon: <Code2 className="w-8 h-8 text-white" />,
      title: "Development",
      description: "Our developers bring the designs to life using modern technologies and best practices. We build scalable, secure, and high-performance solutions.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      icon: <TestTube className="w-8 h-8 text-white" />,
      title: "Testing & QA",
      description: "We thoroughly test the solution across different devices and browsers. Our QA team ensures everything works perfectly before launch.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: "Launch & Deployment",
      description: "We deploy your solution to production servers and ensure everything is running smoothly. We provide training and documentation.",
      gradient: "from-purple-500 to-fuchsia-500"
    },
    {
      id: 6,
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Support & Maintenance",
      description: "We provide ongoing support and maintenance to ensure your solution continues to perform optimally. We're always here to help.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Development Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a proven process to ensure the success of every project, from initial concept to final delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={step.id}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <div className="text-5xl font-bold text-gray-200">0{step.id}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector lines for desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              )}
            </div>
          ))}
        </div>

        {/* Process CTA */}
        <div className="mt-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your project requirements and create a customized development plan that fits your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Schedule a Consultation
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
              View Our Process in Detail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;