import { useState, useEffect } from 'react';
import { supabase, ExhibitorApplication, Booth, Expo } from '../../lib/supabase';
import { Check, X, Building2, Download, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export default function ApplicationManagement() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.exhibitor?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.expo?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('exhibitor_applications')
      .select(`
        *,
        expo:expos(title),
        exhibitor:profiles!exhibitor_id(full_name, email, company_name)
      `)
      .order('submitted_at', { ascending: false });

    if (!error && data) {
      setApplications(data);
      setFilteredApplications(data);
    }
    setLoading(false);
  };

  const fetchAvailableBooths = async (expoId: string, size: string) => {
    const { data } = await supabase
      .from('booths')
      .select('*')
      .eq('expo_id', expoId)
      .eq('size', size)
      .eq('status', 'available');

    if (data) setBooths(data);
  };

  const handleApprove = async (app: any, boothId: string) => {
    const { error } = await supabase
      .from('exhibitor_applications')
      .update({
        status: 'approved',
        assigned_booth_id: boothId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', app.id);

    if (!error) {
      await supabase
        .from('booths')
        .update({
          status: 'occupied',
          exhibitor_id: app.exhibitor_id,
        })
        .eq('id', boothId);

      fetchApplications();
      setSelectedApp(null);
    }
  };

  const handleReject = async (appId: string) => {
    if (!confirm('Are you sure you want to reject this application?')) return;

    const { error } = await supabase
      .from('exhibitor_applications')
      .update({
        status: 'rejected',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', appId);

    if (!error) {
      fetchApplications();
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export functions
  const exportCSV = () => {
    const csvData = filteredApplications.map(app => ({
      Company: app.company_name,
      Contact: app.exhibitor?.full_name,
      Email: app.exhibitor?.email,
      Expo: app.expo?.title,
      Status: app.status,
      Submitted: new Date(app.submitted_at).toLocaleDateString(),
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'applications_report.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Applications Report', 20, 20);
    let y = 40;
    filteredApplications.forEach(app => {
      doc.text(`${app.company_name} - ${app.exhibitor?.full_name} - ${app.status}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('applications_report.pdf');
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Exhibitor Applications</h2>
        <div className="flex space-x-2">
          <button
            onClick={exportCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No applications found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{app.company_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Expo: {app.expo?.title} | Submitted:{' '}
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    app.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : app.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Contact:</strong> {app.exhibitor?.full_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {app.exhibitor?.email}
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
                    <strong>Booth Preference:</strong> {app.booth_preference}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Products & Services:</p>
                <p className="text-sm text-gray-600">{app.products_services}</p>
              </div>

              {app.status === 'pending' && (
                <div className="space-y-3">
                  {selectedApp === app.id ? (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Select a booth:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                        {booths.map((booth) => (
                          <button
                            key={booth.id}
                            onClick={() => handleApprove(app, booth.id)}
                            className="p-3 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                          >
                            <p className="font-semibold text-gray-900">{booth.booth_number}</p>
                            <p className="text-sm text-gray-600">${booth.price}</p>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedApp(null)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedApp(app.id);
                          fetchAvailableBooths(app.expo_id, app.booth_preference);
                        }}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 mx-1 rounded-md ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
