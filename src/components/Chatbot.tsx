import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, X, MessageCircle, Wrench, Code2, Palette, Monitor, Globe, Image, Navigation, Home, Users, Briefcase, FolderKanban, HelpCircle, Mail, Phone, Info, Clock, DollarSign, Headphones, Zap, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  action?: {
    type: 'navigate' | 'suggestion';
    payload: string;
  };
}

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant from Flux Solutions. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    const userMessage = userInput;
    setUserInput('');

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      const newAiMessage: ChatMessage = {
        id: chatMessages.length + 2,
        text: aiResponse.response,
        isUser: false,
        timestamp: new Date(),
        action: aiResponse.action
      };
      setChatMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  const handleNavigation = (page: string) => {
    const event = new CustomEvent('navigateToPage', { detail: page });
    window.dispatchEvent(event);
    setIsChatOpen(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
  };

  const generateAIResponse = (userMessage: string): { response: string, action?: { type: 'navigate' | 'suggestion', payload: string } } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Navigation commands
    if (lowerMessage.includes('go to') || lowerMessage.includes('navigate to') || lowerMessage.includes('take me to')) {
      if (lowerMessage.includes('home')) {
        return {
          response: "Sure! I'll take you to the homepage.",
          action: { type: 'navigate', payload: 'home' }
        };
      } else if (lowerMessage.includes('about')) {
        return {
          response: "Taking you to our About Us page to learn more about Flux Solutions.",
          action: { type: 'navigate', payload: 'about' }
        };
      } else if (lowerMessage.includes('service')) {
        return {
          response: "I'll show you our services page with all the solutions we offer.",
          action: { type: 'navigate', payload: 'services' }
        };
      } else if (lowerMessage.includes('project')) {
        return {
          response: "Let me show you our portfolio of completed projects.",
          action: { type: 'navigate', payload: 'projects' }
        };
      } else if (lowerMessage.includes('faq') || lowerMessage.includes('question')) {
        return {
          response: "I'll take you to our FAQ section with answers to common questions.",
          action: { type: 'navigate', payload: 'faq' }
        };
      } else if (lowerMessage.includes('contact')) {
        return {
          response: "I'll direct you to our contact page where you can get in touch with us.",
          action: { type: 'navigate', payload: 'contact' }
        };
      }
    }
    
    // Direct page references
    if (lowerMessage.includes('home') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "Sure! I'll take you to the homepage.",
        action: { type: 'navigate', payload: 'home' }
      };
    } else if (lowerMessage.includes('about') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "Taking you to our About Us page to learn more about Flux Solutions.",
        action: { type: 'navigate', payload: 'about' }
      };
    } else if (lowerMessage.includes('service') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "I'll show you our services page with all the solutions we offer.",
        action: { type: 'navigate', payload: 'services' }
      };
    } else if (lowerMessage.includes('project') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "Let me show you our portfolio of completed projects.",
        action: { type: 'navigate', payload: 'projects' }
      };
    } else if (lowerMessage.includes('faq') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "I'll take you to our FAQ section with answers to common questions.",
        action: { type: 'navigate', payload: 'faq' }
      };
    } else if (lowerMessage.includes('contact') && (lowerMessage.includes('page') || lowerMessage.includes('show') || lowerMessage.includes('visit'))) {
      return {
        response: "I'll direct you to our contact page where you can get in touch with us.",
        action: { type: 'navigate', payload: 'contact' }
      };
    }
    
    // Service-related questions
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do you provide') || lowerMessage.includes('what do you do')) {
      return {
        response: "At Flux Solutions, we offer comprehensive software development services including:\n\n" +
               "• Web Development (React, Vue.js, Angular)\n" +
               "• Mobile App Development (Flutter, React Native)\n" +
               "• UI/UX Design\n" +
               "• Web Designing\n" +
               "• WordPress Solutions\n" +
               "• Graphic Designing\n" +
               "• Problem Solving Services\n\n" +
               "Would you like to see our services page for more details?",
        action: { type: 'suggestion', payload: "Show me your services" }
      };
    }
    
    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('budget') || lowerMessage.includes('how much')) {
      return {
        response: "Our pricing is customized based on your project requirements. We offer:\n\n" +
               "• Hourly rates starting at $50/hour for specialized expertise\n" +
               "• Fixed-price options for well-defined projects\n" +
               "• Monthly retainer packages for ongoing support\n\n" +
               "Would you like me to connect you with our sales team for a detailed quote?",
        action: { type: 'suggestion', payload: "Connect me with sales team" }
      };
    }
    
    // Contact questions
    if (lowerMessage.includes('contact') || lowerMessage.includes('talk') || lowerMessage.includes('speak') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call') || lowerMessage.includes('reach')) {
      return {
        response: "You can reach our team through:\n\n" +
               "📧 Email: flux.solution929@gmail.com\n" +
               "📱 Phone: +92 319 4699095\n" +
               "📍 Location: Karachi, Sindh, Pakistan\n\n" +
               "Or use the contact form on our website. Would you like me to take you to our contact page?",
        action: { type: 'suggestion', payload: "Take me to contact page" }
      };
    }
    
    // Project questions
    if (lowerMessage.includes('project') || lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('portfolio')) {
      return {
        response: "Project timelines vary based on complexity and scope:\n\n" +
               "• Simple websites: 2-4 weeks\n" +
               "• E-commerce platforms: 4-8 weeks\n" +
               "• Custom web applications: 2-6 months\n" +
               "• Mobile apps: 3-6 months\n\n" +
               "We provide detailed timelines during our initial consultation. Would you like to see our project portfolio?",
        action: { type: 'suggestion', payload: "Show me your projects" }
      };
    }
    
    // Support questions
    if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('help') || lowerMessage.includes('bug') || lowerMessage.includes('issue')) {
      return {
        response: "Yes, we offer comprehensive maintenance and support packages:\n\n" +
               "• Bug fixes and troubleshooting\n" +
               "• Performance optimization\n" +
               "• Security updates\n" +
               "• Feature enhancements\n" +
               "• 24/7 monitoring (premium plans)\n\n" +
               "Our support ensures your software continues to perform optimally. Would you like details about our support packages?",
        action: { type: 'suggestion', payload: "Tell me about support packages" }
      };
    }
    
    // Technology questions
    if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('framework') || lowerMessage.includes('language') || lowerMessage.includes('stack') || lowerMessage.includes('tools')) {
      return {
        response: "We work with modern technologies including:\n\n" +
               "• HTML5, CSS3, JavaScript, TypeScript\n" +
               "• MERN Stack (MongoDB, Express.js, React, Node.js)\n" +
               "• Figma for UI/UX Designing\n" +
               "• Flutter for cross-platform mobile apps\n" +
               "• Java for enterprise solutions\n" +
               "• WordPress for content management\n\n" +
               "Our team stays updated with the latest industry trends. Do you have a preferred technology stack?",
        action: { type: 'suggestion', payload: "Show me your services" }
      };
    }
    
    // Company information
    if (lowerMessage.includes('company') || lowerMessage.includes('flux') || lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('what is')) {
      return {
        response: "Flux Solutions is a software house based in Karachi, Pakistan, specializing in:\n\n" +
               "• Custom software development\n" +
               "• Web and mobile applications\n" +
               "• UI/UX design services\n" +
               "• WordPress solutions\n" +
               "• Graphic design\n" +
               "• Technical problem solving\n\n" +
               "We empower businesses through innovative technology solutions. Would you like to know more about any specific aspect of our work?",
        action: { type: 'suggestion', payload: "Tell me more about Flux Solutions" }
      };
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening') || lowerMessage.includes('greetings')) {
      return {
        response: "Hello! I'm your AI assistant from Flux Solutions. How can I assist you with our services today? You can ask about:\n\n" +
               "• Our services (web development, mobile apps, design)\n" +
               "• Pricing and project timelines\n" +
               "• Contact information\n" +
               "• Technologies we work with\n" +
               "• Company information\n\n" +
               "Or I can take you directly to any page on our website!",
        action: { type: 'suggestion', payload: "Show me your services" }
      };
    }
    
    // Gratitude
    if (lowerMessage.includes('thank')) {
      return {
        response: "You're welcome! Is there anything else I can help you with regarding our services at Flux Solutions?",
        action: { type: 'suggestion', payload: "Show me your projects" }
      };
    }
    
    // Goodbye
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you') || lowerMessage.includes('later')) {
      return {
        response: "Goodbye! Feel free to reach out if you have any more questions about Flux Solutions. Have a great day!"
      };
    }
    
    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('commands') || lowerMessage.includes('options')) {
      return {
        response: "I can help you with:\n\n" +
               "• Answering questions about our services\n" +
               "• Providing pricing information\n" +
               "• Sharing contact details\n" +
               "• Explaining our technologies\n" +
               "• Navigating to different pages\n" +
               "• Showing project timelines\n\n" +
               "Try asking questions like:\n" +
               "• 'What services do you offer?'\n" +
               "• 'Take me to the contact page'\n" +
               "• 'Show me your projects'\n" +
               "• 'How much does a website cost?'\n\n" +
               "What would you like to know?",
        action: { type: 'suggestion', payload: "What services do you offer?" }
      };
    }
    
    // Default response
    return {
      response: "I'm here to help with any questions about Flux Solutions. You can ask about:\n\n" +
             "• Our services (web development, mobile apps, design)\n" +
             "• Pricing and project timelines\n" +
             "• Contact information\n" +
             "• Technologies we work with\n" +
             "• Company information\n\n" +
             "For more specific assistance, I can connect you with a human representative. What would you like to know?",
      action: { type: 'suggestion', payload: "Show me your services" }
    };
  };

  // Quick action buttons
  const quickActions = [
    { label: "Services", icon: <Briefcase className="w-4 h-4" />, action: "services" },
    { label: "Projects", icon: <FolderKanban className="w-4 h-4" />, action: "projects" },
    { label: "Contact", icon: <Mail className="w-4 h-4" />, action: "contact" },
    { label: "Pricing", icon: <DollarSign className="w-4 h-4" />, action: "pricing" }
  ];

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
      >
        <div className="flex items-center">
          <Bot className="w-6 h-6" />
          <span className="ml-2 hidden group-hover:block transition-all duration-300 whitespace-nowrap mr-2">
            Chat with us
          </span>
        </div>
      </button>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-end sm:justify-end p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-900">Flux AI Assistant</h3>
                  <p className="text-xs text-gray-500">Online now</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <div className="flex items-center mb-1">
                      {message.isUser ? (
                        <User className="w-4 h-4 mr-2" />
                      ) : (
                        <Bot className="w-4 h-4 mr-2" />
                      )}
                      <span className="text-xs font-medium">
                        {message.isUser ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    
                    {/* Action button if available */}
                    {message.action && message.action.type === 'navigate' && (
                      <button
                        onClick={() => handleNavigation(message.action!.payload)}
                        className="mt-2 flex items-center text-xs font-medium text-cyan-600 hover:text-cyan-800 transition-colors"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Go to page
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(`Take me to ${action.label.toLowerCase()} page`)}
                    className="flex items-center text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-cyan-300 hover:text-cyan-600 transition-colors"
                  >
                    {action.icon}
                    <span className="ml-1">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-r-2xl hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Suggestions */}
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Try: "Show me your services" or "Take me to contact page"
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;