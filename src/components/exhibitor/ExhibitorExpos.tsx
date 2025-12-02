import { useState, useEffect } from 'react';
import { supabase, Expo } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, MapPin, Send } from 'lucide-react';

export default function ExhibitorExpos() {
  const { user } = useAuth();
  const [expos, setExpos] = useState<Expo[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedExpo, setSelectedExpo] = useState<Expo | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    company_name: '',
    products_services: '',
    website: '',
    booth_preference: 'medium' as 'small' | 'medium' | 'large',
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const [exposData, appsData] = await Promise.all([
      supabase.from('expos').select('*').eq('status', 'published').order('start_date'),
      supabase
        .from('exhibitor_applications')
        .select('expo_id, status')
        .eq('exhibitor_id', user?.id),
    ]);

    if (exposData.data) setExpos(exposData.data);
    if (appsData.data) setApplications(appsData.data);
    setLoading(false);
  };

  const hasApplied = (expoId: string) => {
    return applications.some((app) => app.expo_id === expoId);
  };

  const handleApply = (expo: Expo) => {
    setSelectedExpo(expo);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpo || !user) return;

    const { error } = await supabase.from('exhibitor_applications').insert({
      expo_id: selectedExpo.id,
      exhibitor_id: user.id,
      company_name: formData.company_name,
      products_services: formData.products_services,
      website: formData.website || null,
      booth_preference: formData.booth_preference,
      status: 'pending',
    });

    if (!error) {
      setShowApplicationForm(false);
      setSelectedExpo(null);
      setFormData({
        company_name: '',
        products_services: '',
        website: '',
        booth_preference: 'medium',
      });
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (showApplicationForm && selectedExpo) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Apply for {selectedExpo.title}
        </h2>

        <form onSubmit={handleSubmitApplication} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Company Ltd."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Products & Services
            </label>
            <textarea
              value={formData.products_services}
              onChange={(e) => setFormData({ ...formData, products_services: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what you will showcase..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourcompany.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booth Preference
            </label>
            <select
              value={formData.booth_preference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  booth_preference: e.target.value as 'small' | 'medium' | 'large',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="small">Small Booth</option>
              <option value="medium">Medium Booth</option>
              <option value="large">Large Booth</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </button>
            <button
              type="button"
              onClick={() => {
                setShowApplicationForm(false);
                setSelectedExpo(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
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
            const applied = hasApplied(expo.id);
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

                  {applied ? (
                    <div className="bg-green-50 border border-green-200 rounded-md px-4 py-2 text-center">
                      <p className="text-sm text-green-700 font-medium">Application Submitted</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(expo)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
