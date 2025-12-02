import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Calendar, User, Settings } from 'lucide-react';

export default function Header({ onEditProfile }: { onEditProfile: () => void }) {
  const { profile, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img 
          src="/FLUX-Solution-web/Screenshot%202025-10-22%20194707.png"
          alt="Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">EventSphere</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{profile?.full_name}</p>
                <p className="text-gray-500 capitalize">{profile?.role}</p>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Settings className="w-4 h-4 mr-1" />
              Edit Profile
            </button>

            <button
              onClick={() => signOut()}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}