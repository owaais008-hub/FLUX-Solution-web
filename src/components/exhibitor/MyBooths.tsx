import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, MapPin, Calendar } from 'lucide-react';

export default function MyBooths() {
  const { user } = useAuth();
  const [booths, setBooths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooths();
  }, [user]);

  const fetchBooths = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('booths')
      .select(`
        *,
        expo:expos(title, location, start_date, end_date, theme)
      `)
      .eq('exhibitor_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setBooths(data);
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
      <h2 className="text-2xl font-bold text-gray-900">My Booths</h2>

      {booths.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            You don't have any assigned booths yet. Apply for expos to get booth spaces.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {booths.map((booth) => (
            <div
              key={booth.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{booth.expo?.title}</h3>
                <p className="text-blue-100 text-sm">{booth.expo?.theme}</p>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Booth {booth.booth_number}</p>
                    <p className="text-sm text-gray-600 capitalize">{booth.size} Size</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${booth.price}</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mt-1">
                      {booth.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {booth.expo?.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(booth.expo?.start_date).toLocaleDateString()} -{' '}
                    {new Date(booth.expo?.end_date).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Position: ({booth.position_x}, {booth.position_y})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
