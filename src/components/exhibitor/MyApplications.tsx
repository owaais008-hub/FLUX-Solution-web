import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('exhibitor_applications')
      .select(`
        *,
        expo:expos(title, location, start_date, end_date),
        booth:booths(booth_number, size, price)
      `)
      .eq('exhibitor_id', user.id)
      .order('submitted_at', { ascending: false });

    if (data) setApplications(data);
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
      <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">You haven't submitted any applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{app.expo?.title}</h3>
                  <p className="text-sm text-gray-600">
                    Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {app.status === 'pending' && (
                    <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </span>
                  )}
                  {app.status === 'approved' && (
                    <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approved
                    </span>
                  )}
                  {app.status === 'rejected' && (
                    <span className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejected
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Company:</strong> {app.company_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Booth Preference:</strong> {app.booth_preference}
                  </p>
                  {app.website && (
                    <p className="text-sm text-gray-600">
                      <strong>Website:</strong>{' '}
                      <a
                        href={app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {app.website}
                      </a>
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {app.expo?.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Dates:</strong> {new Date(app.expo?.start_date).toLocaleDateString()} -{' '}
                    {new Date(app.expo?.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Products & Services:</p>
                <p className="text-sm text-gray-600">{app.products_services}</p>
              </div>

              {app.status === 'approved' && app.booth && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm font-medium text-green-900 mb-2">Assigned Booth</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700">
                        <strong>Booth:</strong> {app.booth.booth_number}
                      </p>
                      <p className="text-gray-700">
                        <strong>Size:</strong> {app.booth.size}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-green-700">${app.booth.price}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
