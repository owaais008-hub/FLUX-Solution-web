import React from 'react';
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, Award, Code2, Palette, Smartphone, Globe } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  experience: string;
  avatar?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Chief Technology Officer",
      bio: "Alex leads our technical vision with over 12 years of experience in software architecture and full-stack development. He specializes in creating scalable solutions that drive business growth.",
      expertise: ["React", "Node.js", "Cloud Architecture", "DevOps"],
      experience: "12+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Lead UI/UX Designer",
      bio: "Sarah transforms complex problems into intuitive digital experiences. With a background in cognitive psychology, she ensures our designs are not just beautiful but also highly functional.",
      expertise: ["Figma", "User Research", "Prototyping", "Design Systems"],
      experience: "8+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Senior Full-Stack Developer",
      bio: "Michael bridges the gap between design and development with his dual expertise. He's passionate about creating seamless user experiences through clean, efficient code.",
      expertise: ["React", "Python", "AWS", "Microservices"],
      experience: "10+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Mobile App Specialist",
      bio: "Emma leads our mobile development initiatives with expertise in both native and cross-platform solutions. She ensures our mobile applications deliver exceptional performance.",
      expertise: ["React Native", "Swift", "Kotlin", "Flutter"],
      experience: "7+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 5,
      name: "David Kim",
      role: "WordPress & CMS Expert",
      bio: "David specializes in content management systems and e-commerce solutions. His expertise helps businesses establish strong digital presences with powerful, customizable platforms.",
      expertise: ["WordPress", "Shopify", "PHP", "SEO"],
      experience: "9+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 6,
      name: "Lisa Park",
      role: "Graphic Design Lead",
      bio: "Lisa brings creativity and strategy to our visual identity projects. Her work has helped numerous brands establish memorable and impactful visual presences in competitive markets.",
      expertise: ["Adobe Creative Suite", "Branding", "Illustration", "Motion Design"],
      experience: "11+ years",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const expertiseIcons: { [key: string]: React.ReactNode } = {
    "CTO": <Code2 className="w-6 h-6 text-cyan-500" />,
    "UI/UX Designer": <Palette className="w-6 h-6 text-pink-500" />,
    "Full-Stack Developer": <Globe className="w-6 h-6 text-blue-500" />,
    "Mobile App Specialist": <Smartphone className="w-6 h-6 text-green-500" />,
    "WordPress & CMS Expert": <Globe className="w-6 h-6 text-purple-500" />,
    "Graphic Design Lead": <Palette className="w-6 h-6 text-orange-500" />
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
            <Award className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm font-medium text-cyan-300">OUR TEAM</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Experts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our talented team of professionals brings together diverse skills and experiences to deliver exceptional results for every project.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto relative z-10">
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-cyan-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">{member.experience} experience</p>
              </div>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {member.bio}
              </p>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                {member.socialLinks.linkedin && (
                  <a 
                    href={member.socialLinks.linkedin} 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-cyan-500 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a 
                    href={member.socialLinks.twitter} 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-cyan-500 hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a 
                    href={member.socialLinks.github} 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-cyan-500 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 text-center border border-cyan-100/50">
            <div className="text-3xl font-bold text-cyan-600 mb-2">15+</div>
            <div className="text-gray-700 font-medium">Team Members</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center border border-pink-100/50">
            <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
            <div className="text-gray-700 font-medium">Projects Completed</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100/50">
            <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-700 font-medium">Years Average Experience</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100/50">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">Client Satisfaction</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Work With Our Experts?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your project and how our team can help bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Call
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;