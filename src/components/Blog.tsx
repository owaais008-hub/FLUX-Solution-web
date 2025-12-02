import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowRight, Search, Clock, BookOpen, TrendingUp } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development.",
      content: "Full content would go here...",
      author: "Alex Johnson",
      date: "2025-10-15",
      readTime: "8 min read",
      category: "Technology",
      tags: ["Web Development", "Trends", "JavaScript"],
      image: "gradient-1",
      featured: true
    },
    {
      id: 2,
      title: "UI/UX Design Principles That Boost Conversion Rates",
      excerpt: "Discover how thoughtful design decisions can significantly impact your website's performance and user engagement.",
      content: "Full content would go here...",
      author: "Sarah Chen",
      date: "2025-10-10",
      readTime: "6 min read",
      category: "Design",
      tags: ["UI/UX", "Conversion", "User Experience"],
      image: "gradient-2"
    },
    {
      id: 3,
      title: "Building Scalable Applications with Microservices Architecture",
      excerpt: "Learn how microservices can help your business scale efficiently while maintaining flexibility and performance.",
      content: "Full content would go here...",
      author: "Michael Rodriguez",
      date: "2025-10-05",
      readTime: "10 min read",
      category: "Technology",
      tags: ["Microservices", "Architecture", "Scalability"],
      image: "gradient-3"
    },
    {
      id: 4,
      title: "The Importance of Mobile-First Design in Modern Web Development",
      excerpt: "Why designing for mobile devices first leads to better user experiences across all platforms.",
      content: "Full content would go here...",
      author: "Emma Thompson",
      date: "2025-09-28",
      readTime: "7 min read",
      category: "Design",
      tags: ["Mobile", "Responsive", "Design"],
      image: "gradient-4"
    },
    {
      id: 5,
      title: "Optimizing Website Performance: A Developer's Guide",
      excerpt: "Practical techniques to improve your website's loading speed and overall performance metrics.",
      content: "Full content would go here...",
      author: "David Kim",
      date: "2025-09-20",
      readTime: "9 min read",
      category: "Performance",
      tags: ["Performance", "Optimization", "SEO"],
      image: "gradient-5"
    },
    {
      id: 6,
      title: "WordPress vs Custom Development: Which is Right for You?",
      excerpt: "A comprehensive comparison to help you decide between using WordPress or building a custom solution.",
      content: "Full content would go here...",
      author: "Lisa Park",
      date: "2025-09-15",
      readTime: "12 min read",
      category: "CMS",
      tags: ["WordPress", "Custom Development", "Comparison"],
      image: "gradient-6"
    }
  ];

  const categories = [
    'all',
    'Technology',
    'Design',
    'Performance',
    'CMS'
  ];

  const getGradientClass = (image: string) => {
    const gradients: { [key: string]: string } = {
      'gradient-1': 'from-blue-500 via-cyan-500 to-teal-500',
      'gradient-2': 'from-pink-500 via-rose-500 to-red-500',
      'gradient-3': 'from-violet-500 via-purple-500 to-fuchsia-500',
      'gradient-4': 'from-emerald-500 via-green-500 to-lime-500',
      'gradient-5': 'from-orange-500 via-amber-500 to-yellow-500',
      'gradient-6': 'from-sky-500 via-blue-500 to-indigo-500'
    };
    return gradients[image] || 'from-gray-500 to-gray-700';
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6 shadow-lg">
            <BookOpen className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm font-medium text-cyan-300">BLOG</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Stay updated with the latest trends, tips, and insights in web development, design, and digital innovation.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100/50 outline-none transition-all text-gray-900 font-medium backdrop-blur-sm bg-white/80 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className={`h-64 md:h-full bg-gradient-to-br ${getGradientClass(featuredPost.image)} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-cyan-600 px-3 py-1 rounded-full text-sm font-bold">
                        FEATURED
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex items-center mb-4">
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="mx-3 text-gray-400">•</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(featuredPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <button className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter(post => !post.featured)
            .map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-48 bg-gradient-to-br ${getGradientClass(post.image)} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <button className="text-cyan-600 hover:text-cyan-700">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <TrendingUp className="w-12 h-12 mx-auto mb-6 text-white/80" />
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter and never miss our latest articles, tips, and industry insights.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;