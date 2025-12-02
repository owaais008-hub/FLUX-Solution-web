import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import AnimatedCodeDisplay from '../components/AnimatedCodeDisplay';
import ParticleBackground from '../components/ParticleBackground';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add real-time validation as user types
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'subject':
        if (!value.trim()) {
          newErrors.subject = 'Subject is required';
        } else {
          delete newErrors.subject;
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.length < 10) {
          newErrors.message = 'Message should be at least 10 characters';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});
      
      try {
        // Send email using EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'flux.solution929@gmail.com'
        };
        
        // Get EmailJS credentials from environment variables
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        
        // Check if credentials are configured
        if (!serviceID || !templateID || !publicKey) {
          throw new Error('Email service not properly configured. Please contact the site administrator.');
        }
        
        // Send email via EmailJS
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        
        // Store in database (existing functionality)
        const { contactApi } = await import('../lib/services');
        const { error } = await contactApi.submitMessage(
          formData.name,
          formData.email,
          formData.subject,
          formData.message
        );
        
        if (error) throw error;
        
        // Success - show confirmation
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error: unknown) {
        console.error('Error submitting message:', error);
        setIsSubmitting(false);
        setErrors({ 
          message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field in real-time
    validateField(name, value);
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
            alt="Contact" 
            className="w-full h-full object-cover opacity-10 animate-pulse-slow"
          />
          <AnimatedCodeDisplay density="medium" speed="medium" colorScheme="rainbow" trailEffect glowEffect className="opacity-25" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-300">CONTACT US</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              Have a project in mind? At Flux Solutions, we're ready to help bring your ideas to life with our expert development team. Let's discuss how we can transform your vision into a reality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+923194699095"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a 
                href="mailto:flux.solution929@gmail.com"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                We're here to answer any questions you may have about our software development services. Reach out to us and we'll respond as soon as possible with how we can help your business grow.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Email</h3>
                    <a href="mailto:flux.solution929@gmail.com" className="text-gray-600 mb-1 hover:text-cyan-600 transition-colors block">flux.solution929@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Phone</h3>
                    <a href="tel:+923194699095" className="text-gray-600 mb-1 hover:text-cyan-600 transition-colors block">+92 319 4699095</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">Address</h3>
                    <p className="text-gray-600 mb-1">Karachi, Sindh</p>
                    <p className="text-gray-600">Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-500">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for your message. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:ring-4 transition-all duration-300 outline-none text-gray-900 font-medium backdrop-blur-sm bg-white/50 shadow-sm ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:ring-4 transition-all duration-300 outline-none text-gray-900 font-medium backdrop-blur-sm bg-white/50 shadow-sm ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border focus:ring-4 transition-all duration-300 outline-none text-gray-900 font-medium backdrop-blur-sm bg-white/50 shadow-sm ${
                        errors.subject 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-5 py-4 rounded-xl border focus:ring-4 transition-all duration-300 outline-none resize-none text-gray-900 font-medium backdrop-blur-sm bg-white/50 shadow-sm ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                    {errors.message && typeof errors.message === 'string' && errors.message.includes('Failed to send') && (
                      <p className="mt-2 text-red-600 text-sm font-medium">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-3 text-lg group backdrop-blur-sm hover:scale-105 shadow-lg ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Location</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our office in the heart of Karachi, Sindh
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/80 rounded-3xl p-1 shadow-xl backdrop-blur-sm border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl h-96 flex items-center justify-center border border-white/30 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.9539197571!2d67.02259535820315!3d24.860734299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                className="rounded-2xl border-0"
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Contact;