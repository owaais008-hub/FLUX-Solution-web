import { useState, useEffect } from 'react';
import { supabase, Expo } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, CreditCard as Edit, Trash2, Eye, Calendar, Download, Search, Filter } from 'lucide-react';
import ExpoForm from './ExpoForm';
import ExpoDetails from './ExpoDetails';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export default function ExpoManagement() {
  const { profile } = useAuth();
  const [expos, setExpos] = useState<Expo[]>([]);
  const [filteredExpos, setFilteredExpos] = useState<Expo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedExpo, setSelectedExpo] = useState<Expo | null>(null);
  const [viewExpo, setViewExpo] = useState<Expo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchExpos();
  }, []);

  useEffect(() => {
    let filtered = expos;
    if (searchTerm) {
      filtered = filtered.filter(expo =>
        expo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expo.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expo.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(expo => expo.status === statusFilter);
    }
    setFilteredExpos(filtered);
    setCurrentPage(1);
  }, [expos, searchTerm, statusFilter]);

  const fetchExpos = async () => {
    const { data, error } = await supabase
      .from('expos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExpos(data);
      setFilteredExpos(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expo?')) return;

    const { error } = await supabase.from('expos').delete().eq('id', id);

    if (!error) {
      fetchExpos();
    }
  };

  const handleEdit = (expo: Expo) => {
    setSelectedExpo(expo);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedExpo(null);
    fetchExpos();
  };

  // Pagination
  const totalPages = Math.ceil(filteredExpos.length / itemsPerPage);
  const paginatedExpos = filteredExpos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export functions
  const exportCSV = () => {
    const csvData = filteredExpos.map(expo => ({
      Title: expo.title,
      Description: expo.description,
      Theme: expo.theme,
      Location: expo.location,
      StartDate: expo.start_date,
      EndDate: expo.end_date,
      Status: expo.status,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'expos_report.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Expos Report', 20, 20);
    let y = 40;
    filteredExpos.forEach(expo => {
      doc.text(`${expo.title} - ${expo.location} - ${expo.status}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('expos_report.pdf');
  };

  if (viewExpo) {
    return <ExpoDetails expo={viewExpo} onBack={() => setViewExpo(null)} />;
  }

  if (showForm) {
    return <ExpoForm expo={selectedExpo} onClose={handleFormClose} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Expo Management</h2>
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
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Expo
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expos..."
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : expos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No expos created yet. Create your first expo to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedExpos.map((expo) => (
            <div key={expo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{expo.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
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

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{expo.description}</p>

                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <p>
                    <strong>Location:</strong> {expo.location}
                  </p>
                  <p>
                    <strong>Dates:</strong> {new Date(expo.start_date).toLocaleDateString()} -{' '}
                    {new Date(expo.end_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Theme:</strong> {expo.theme}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewExpo(expo)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(expo)}
                    className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(expo.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
