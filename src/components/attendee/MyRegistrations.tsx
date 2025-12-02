import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function MyRegistrations() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const fetchRegistrations = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('expo_registrations')
      .select(`
        *,
        expo:expos(title, description, location, start_date, end_date, theme, status)
      `)
      .eq('attendee_id', user.id)
      .order('registered_at', { ascending: false });

    if (data) setRegistrations(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Registrations</h2>

      {registrations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">You haven't registered for any expos yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{reg.expo?.title}</h3>
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{reg.expo?.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {reg.expo?.location}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(reg.expo?.start_date).toLocaleDateString()} -{' '}
                    {new Date(reg.expo?.end_date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Registered on</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(reg.registered_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      reg.expo?.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : reg.expo?.status === 'completed'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {reg.expo?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
