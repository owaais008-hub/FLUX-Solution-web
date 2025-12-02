import { useState, useEffect } from 'react';
import { supabase, Expo, Booth, Session } from '../../lib/supabase';
import { ArrowLeft, Plus, Grid3x3, Calendar } from 'lucide-react';
import BoothManagement from './BoothManagement';
import SessionManagement from './SessionManagement';

interface ExpoDetailsProps {
  expo: Expo;
  onBack: () => void;
}

export default function ExpoDetails({ expo, onBack }: ExpoDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'booths' | 'sessions'>('overview');
  const [stats, setStats] = useState({
    booths: 0,
    sessions: 0,
    applications: 0,
    registrations: 0,
  });

  useEffect(() => {
    fetchStats();
  }, [expo.id]);

  const fetchStats = async () => {
    const [boothsData, sessionsData, applicationsData, registrationsData] = await Promise.all([
      supabase.from('booths').select('id', { count: 'exact' }).eq('expo_id', expo.id),
      supabase.from('sessions').select('id', { count: 'exact' }).eq('expo_id', expo.id),
      supabase.from('exhibitor_applications').select('id', { count: 'exact' }).eq('expo_id', expo.id),
      supabase.from('expo_registrations').select('id', { count: 'exact' }).eq('expo_id', expo.id),
    ]);

    setStats({
      booths: boothsData.count || 0,
      sessions: sessionsData.count || 0,
      applications: applicationsData.count || 0,
      registrations: registrationsData.count || 0,
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Expos
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{expo.title}</h1>
            <p className="text-gray-600">{expo.description}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              expo.status === 'published'
                ? 'bg-green-100 text-green-800'
                : expo.status === 'draft'
                ? 'bg-yellow-100 text-yellow-800'
                : expo.status === 'completed'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {expo.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Total Booths</p>
            <p className="text-2xl font-bold text-blue-900">{stats.booths}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Sessions</p>
            <p className="text-2xl font-bold text-green-900">{stats.sessions}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-medium">Applications</p>
            <p className="text-2xl font-bold text-orange-900">{stats.applications}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Registrations</p>
            <p className="text-2xl font-bold text-purple-900">{stats.registrations}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('booths')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'booths'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Grid3x3 className="w-4 h-4 inline mr-1" />
              Booths
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sessions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Sessions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Theme</h3>
                <p className="text-gray-900">{expo.theme}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Location</h3>
                <p className="text-gray-900">{expo.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Event Dates</h3>
                <p className="text-gray-900">
                  {new Date(expo.start_date).toLocaleDateString()} -{' '}
                  {new Date(expo.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'booths' && <BoothManagement expoId={expo.id} />}
          {activeTab === 'sessions' && <SessionManagement expoId={expo.id} />}
        </div>
      </div>
    </div>
  );
}
