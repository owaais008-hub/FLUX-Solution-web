import { useState, useEffect } from 'react';
import { supabase, Booth } from '../../lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Download, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

interface BoothManagementProps {
  expoId: string;
}

export default function BoothManagement({ expoId }: BoothManagementProps) {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [filteredBooths, setFilteredBooths] = useState<Booth[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editBooth, setEditBooth] = useState<Booth | null>(null);
  const [formData, setFormData] = useState({
    booth_number: '',
    size: 'medium' as 'small' | 'medium' | 'large',
    price: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBooths();
  }, [expoId]);

  useEffect(() => {
    let filtered = booths;
    if (searchTerm) {
      filtered = filtered.filter(booth =>
        booth.booth_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sizeFilter) {
      filtered = filtered.filter(booth => booth.size === sizeFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(booth => booth.status === statusFilter);
    }
    setFilteredBooths(filtered);
    setCurrentPage(1);
  }, [booths, searchTerm, sizeFilter, statusFilter]);

  const fetchBooths = async () => {
    const { data } = await supabase
      .from('booths')
      .select('*')
      .eq('expo_id', expoId)
      .order('booth_number');

    if (data) {
      setBooths(data);
      setFilteredBooths(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editBooth) {
      await supabase
        .from('booths')
        .update({
          booth_number: formData.booth_number,
          size: formData.size,
          price: parseFloat(formData.price),
        })
        .eq('id', editBooth.id);
    } else {
      await supabase.from('booths').insert({
        expo_id: expoId,
        booth_number: formData.booth_number,
        size: formData.size,
        price: parseFloat(formData.price),
        status: 'available',
      });
    }

    setShowForm(false);
    setEditBooth(null);
    setFormData({ booth_number: '', size: 'medium', price: '' });
    fetchBooths();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this booth?')) {
      await supabase.from('booths').delete().eq('id', id);
      fetchBooths();
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredBooths.length / itemsPerPage);
  const paginatedBooths = filteredBooths.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export functions
  const exportCSV = () => {
    const csvData = filteredBooths.map(booth => ({
      BoothNumber: booth.booth_number,
      Size: booth.size,
      Price: booth.price,
      Status: booth.status,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'booths_report.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Booths Report', 20, 20);
    let y = 40;
    filteredBooths.forEach(booth => {
      doc.text(`${booth.booth_number} - ${booth.size} - $${booth.price} - ${booth.status}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('booths_report.pdf');
  };

  const handleEdit = (booth: Booth) => {
    setEditBooth(booth);
    setFormData({
      booth_number: booth.booth_number,
      size: booth.size,
      price: booth.price.toString(),
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Booth Spaces</h3>
        <div className="flex space-x-2">
          <button
            onClick={exportCSV}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Export PDF
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Booth
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search booth number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booth Number
              </label>
              <input
                type="text"
                value={formData.booth_number}
                onChange={(e) => setFormData({ ...formData, booth_number: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="A101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value as 'small' | 'medium' | 'large' })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1000"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editBooth ? 'Update' : 'Add'} Booth
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditBooth(null);
                setFormData({ booth_number: '', size: 'medium', price: '' });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBooths.map((booth) => (
          <div key={booth.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{booth.booth_number}</h4>
                <p className="text-sm text-gray-600 capitalize">{booth.size}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  booth.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : booth.status === 'reserved'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {booth.status}
              </span>
            </div>
            <p className="text-lg font-bold text-blue-600 mb-3">${booth.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(booth)}
                className="flex items-center justify-center px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
              >
                <Edit className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(booth.id)}
                className="flex items-center justify-center px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooths.length === 0 && !showForm && (
        <p className="text-center text-gray-500 py-8">
          No booths found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 mx-1 rounded-md text-sm ${
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
            className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
