import React, { useState, useEffect } from 'react';
import { Quote, Star, User, Building, Calendar } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechInnovate Inc.",
      role: "CTO",
      content: "Flux Solutions transformed our digital presence with their exceptional web development skills. The team delivered beyond our expectations and on time. Their attention to detail and innovative approach made all the difference.",
      rating: 5,
      date: "2025-09-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Enterprises",
      role: "Marketing Director",
      content: "Working with Flux was a game-changer for our business. Their UI/UX design expertise helped us increase user engagement by 50%. They truly understand how to create intuitive and beautiful digital experiences.",
      rating: 5,
      date: "2025-08-22"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      company: "StartUp Ventures",
      role: "Founder",
      content: "As a startup, we needed a cost-effective yet professional solution. Flux delivered a stunning website that helped us secure our Series A funding. Their problem-solving skills and technical expertise are unmatched.",
      rating: 5,
      date: "2025-07-30"
    },
    {
      id: 4,
      name: "David Thompson",
      company: "Enterprise Solutions",
      role: "Product Manager",
      content: "The WordPress customization and ongoing support provided by Flux has been invaluable. They're responsive, knowledgeable, and always willing to go the extra mile to ensure our satisfaction.",
      rating: 4,
      date: "2025-06-18"
    },
    {
      id: 5,
      name: "Lisa Park",
      company: "Creative Agency",
      role: "Creative Director",
      content: "Flux's graphic design team helped us refresh our brand identity. The results were stunning and perfectly captured our vision. Their creativity and professionalism made the entire process smooth and enjoyable.",
      rating: 5,
      date: "2025-05-10"
    },
    {
      id: 6,
      name: "Robert Kim",
      company: "MobileFirst Co.",
      role: "CEO",
      content: "Our mobile app development project was complex, but Flux handled it with ease. The final product exceeded our expectations in terms of functionality, design, and performance. Highly recommended!",
      rating: 5,
      date: "2025-04-05"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100/50 backdrop-blur-sm mb-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-3xl"></div>
          
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-cyan-100">
            <Quote className="w-16 h-16" />
          </div>
          
          {/* Testimonial Content */}
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start mb-8">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[currentIndex]?.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {renderStars(testimonials[currentIndex]?.rating || 0)}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6 leading-relaxed">
                  "{testimonials[currentIndex]?.content}"
                </blockquote>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonials[currentIndex]?.name}
                    </h3>
                    <p className="text-gray-600">
                      {testimonials[currentIndex]?.role}, {testimonials[currentIndex]?.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(testimonials[currentIndex]?.date || '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrevious}
              className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-cyan-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Testimonial Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100/50">
            <div className="text-3xl font-bold text-cyan-600 mb-2">150+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100/50">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100/50">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100/50">
            <div className="text-3xl font-bold text-pink-600 mb-2">5★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;