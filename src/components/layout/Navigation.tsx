import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Users, Building2, MessageSquare, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { profile } = useAuth();

  const adminTabs = [
    { id: 'expos', label: 'Expos', icon: Calendar },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const exhibitorTabs = [
    { id: 'expos', label: 'Browse Expos', icon: Calendar },
    { id: 'applications', label: 'My Applications', icon: Building2 },
    { id: 'booths', label: 'My Booths', icon: Building2 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const attendeeTabs = [
    { id: 'expos', label: 'Browse Expos', icon: Calendar },
    { id: 'registrations', label: 'My Registrations', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const tabs = profile?.role === 'admin'
    ? adminTabs
    : profile?.role === 'exhibitor'
    ? exhibitorTabs
    : attendeeTabs;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
