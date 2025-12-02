import { useState, useEffect } from 'react';
import { supabase, Expo } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Building2, Calendar as CalendarIcon, User, Clock, MapPin } from 'lucide-react';

interface ExpoDetailsViewProps {
  expo: Expo;
  onBack: () => void;
}

export default function ExpoDetailsView({ expo, onBack }: ExpoDetailsViewProps) {
  const { user } = useAuth();
  const [exhibitors, setExhibitors] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [registeredSessions, setRegisteredSessions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'exhibitors' | 'sessions'>('exhibitors');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [expo.id]);

  const fetchData = async () => {
    const [exhibitorsData, sessionsData, registrationsData] = await Promise.all([
      supabase
        .from('booths')
        .select(`
          *,
          exhibitor:profiles!exhibitor_id(full_name, company_name)
        `)
        .eq('expo_id', expo.id)
        .eq('status', 'occupied'),
      supabase.from('sessions').select('*').eq('expo_id', expo.id).order('start_time'),
      supabase.from('session_registrations').select('session_id').eq('attendee_id', user?.id),
    ]);

    if (exhibitorsData.data) setExhibitors(exhibitorsData.data);
    if (sessionsData.data) setSessions(sessionsData.data);
    if (registrationsData.data)
      setRegisteredSessions(registrationsData.data.map((r) => r.session_id));
  };

  const handleSessionRegister = async (sessionId: string) => {
    if (!user) return;

    const { error } = await supabase.from('session_registrations').insert({
      session_id: sessionId,
      attendee_id: user.id,
    });

    if (!error) {
      await supabase.from('booth_traffic').insert({
        booth_id: sessionId,
        attendee_id: user.id,
      });
      fetchData();
    }
  };

  const handleSessionUnregister = async (sessionId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('session_registrations')
      .delete()
      .eq('session_id', sessionId)
      .eq('attendee_id', user.id);

    if (!error) {
      fetchData();
    }
  };

  const filteredExhibitors = exhibitors.filter((exhibitor) =>
    exhibitor.exhibitor?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{expo.title}</h1>
        <p className="text-gray-600 mb-4">{expo.description}</p>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 mr-2 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Location</p>
              <p className="text-gray-600">{expo.location}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Dates</p>
              <p className="text-gray-600">
                {new Date(expo.start_date).toLocaleDateString()} -{' '}
                {new Date(expo.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Building2 className="w-5 h-5 mr-2 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Theme</p>
              <p className="text-gray-600">{expo.theme}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('exhibitors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'exhibitors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exhibitors ({exhibitors.length})
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sessions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sessions ({sessions.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'exhibitors' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search exhibitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredExhibitors.map((exhibitor) => (
                  <div key={exhibitor.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Building2 className="w-8 h-8 text-blue-600" />
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {exhibitor.booth_number}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {exhibitor.exhibitor?.company_name || 'Exhibitor'}
                    </h3>
                    <p className="text-sm text-gray-600">{exhibitor.exhibitor?.full_name}</p>
                    <p className="text-xs text-gray-500 mt-2 capitalize">
                      {exhibitor.size} booth
                    </p>
                  </div>
                ))}
              </div>

              {filteredExhibitors.length === 0 && (
                <p className="text-center text-gray-500 py-8">No exhibitors found.</p>
              )}
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              {sessions.map((session) => {
                const isRegistered = registeredSessions.includes(session.id);
                return (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(session.start_time).toLocaleString()} -{' '}
                            {new Date(session.end_time).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {session.location}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {session.speaker_name}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {isRegistered ? (
                          <button
                            onClick={() => handleSessionUnregister(session.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm whitespace-nowrap"
                          >
                            Unregister
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSessionRegister(session.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {sessions.length === 0 && (
                <p className="text-center text-gray-500 py-8">No sessions scheduled yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
