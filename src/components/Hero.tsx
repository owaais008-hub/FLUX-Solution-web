import { Search, Sparkles, TrendingUp } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  return (
    <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white -z-10"></div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm border border-gray-200">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Discover Amazing Campus Events</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Your College Events,
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            All in One Place
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join workshops, attend festivals, compete in hackathons, and never miss out on campus life
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search events, workshops, competitions..."
                onChange={(e) => onSearch(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-left max-w-3xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Active Events</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-3 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50K+</p>
              <p className="text-sm text-gray-600">Students Engaged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
