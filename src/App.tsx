import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import ExpoManagement from './components/admin/ExpoManagement';
import ApplicationManagement from './components/admin/ApplicationManagement';
import Analytics from './components/admin/Analytics';
import UserManagement from './components/admin/UserManagement';
import ExhibitorExpos from './components/exhibitor/ExhibitorExpos';
import MyApplications from './components/exhibitor/MyApplications';
import MyBooths from './components/exhibitor/MyBooths';
import AttendeeExpos from './components/attendee/AttendeeExpos';
import MyRegistrations from './components/attendee/MyRegistrations';
import Messages from './components/shared/Messages';
import ProfileEditForm from './components/shared/ProfileEditForm';

function AuthScreen() {
  const [formType, setFormType] = useState<'login' | 'register' | 'forgot'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {formType === 'login' && (
        <LoginForm
          onToggle={() => setFormType('register')}
          onForgot={() => setFormType('forgot')}
        />
      )}
      {formType === 'register' && (
        <RegisterForm onToggle={() => setFormType('login')} />
      )}
      {formType === 'forgot' && (
        <ForgotPasswordForm onBack={() => setFormType('login')} />
      )}
    </div>
  );
}

function Dashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('expos');
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const renderContent = () => {
    if (profile?.role === 'admin') {
      switch (activeTab) {
        case 'expos':
          return <ExpoManagement />;
        case 'applications':
          return <ApplicationManagement />;
        case 'analytics':
          return <Analytics />;
        case 'users':
          return <UserManagement />;
        case 'messages':
          return <Messages />;
        default:
          return <ExpoManagement />;
      }
    } else if (profile?.role === 'exhibitor') {
      switch (activeTab) {
        case 'expos':
          return <ExhibitorExpos />;
        case 'applications':
          return <MyApplications />;
        case 'booths':
          return <MyBooths />;
        case 'messages':
          return <Messages />;
        default:
          return <ExhibitorExpos />;
      }
    } else {
      switch (activeTab) {
        case 'expos':
          return <AttendeeExpos />;
        case 'registrations':
          return <MyRegistrations />;
        case 'messages':
          return <Messages />;
        default:
          return <AttendeeExpos />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onEditProfile={() => setShowProfileEdit(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>

      {showProfileEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ProfileEditForm onClose={() => setShowProfileEdit(false)} />
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EventSphere...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthScreen />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
