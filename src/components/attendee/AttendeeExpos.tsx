import { useState, useEffect } from 'react';
import { supabase, Expo } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, MapPin, Users, Eye } from 'lucide-react';
import ExpoDetailsView from './ExpoDetailsView';

export default function AttendeeExpos() {
  const { user } = useAuth();
  const [expos, setExpos] = useState<Expo[]>([]);
  const [registrations, setRegistrations] = useState<string[]>([]);
  const [selectedExpo, setSelectedExpo] = useState<Expo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const [exposData, regsData] = await Promise.all([
      supabase.from('expos').select('*').eq('status', 'published').order('start_date'),
      supabase.from('expo_registrations').select('expo_id').eq('attendee_id', user?.id),
    ]);

    if (exposData.data) setExpos(exposData.data);
    if (regsData.data) setRegistrations(regsData.data.map((r) => r.expo_id));
    setLoading(false);
  };

  const handleRegister = async (expoId: string) => {
    if (!user) return;

    const { error } = await supabase.from('expo_registrations').insert({
      expo_id: expoId,
      attendee_id: user.id,
      registration_type: 'general',
    });

    if (!error) {
      fetchData();
    }
  };

  const handleUnregister = async (expoId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('expo_registrations')
      .delete()
      .eq('expo_id', expoId)
      .eq('attendee_id', user.id);

    if (!error) {
      fetchData();
    }
  };

  if (selectedExpo) {
    return <ExpoDetailsView expo={selectedExpo} onBack={() => setSelectedExpo(null)} />;
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Browse Expos</h2>

      {expos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No expos available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expos.map((expo) => {
            const isRegistered = registrations.includes(expo.id);
            return (
              <div
                key={expo.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{expo.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{expo.description}</p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {expo.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(expo.start_date).toLocaleDateString()} -{' '}
                      {new Date(expo.end_date).toLocaleDateString()}
                    </div>
                    <p>
                      <strong>Theme:</strong> {expo.theme}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedExpo(expo)}
                      className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>

                    {isRegistered ? (
                      <button
                        onClick={() => handleUnregister(expo.id)}
                        className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Unregister
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(expo.id)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
