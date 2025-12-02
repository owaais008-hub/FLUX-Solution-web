import { useState, useEffect } from 'react';
import { supabase, Session } from '../../lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Clock, MapPin, Download, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

interface SessionManagementProps {
  expoId: string;
}

export default function SessionManagement({ expoId }: SessionManagementProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editSession, setEditSession] = useState<Session | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker_name: '',
    location: '',
    start_time: '',
    end_time: '',
    capacity: '100',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSessions();
  }, [expoId]);

  useEffect(() => {
    let filtered = sessions;
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.speaker_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (locationFilter) {
      filtered = filtered.filter(session => session.location === locationFilter);
    }
    setFilteredSessions(filtered);
    setCurrentPage(1);
  }, [sessions, searchTerm, locationFilter]);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('expo_id', expoId)
      .order('start_time');

    if (data) {
      setSessions(data);
      setFilteredSessions(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sessionData = {
      title: formData.title,
      description: formData.description,
      speaker_name: formData.speaker_name,
      location: formData.location,
      start_time: formData.start_time,
      end_time: formData.end_time,
      capacity: parseInt(formData.capacity),
    };

    if (editSession) {
      await supabase.from('sessions').update(sessionData).eq('id', editSession.id);
    } else {
      await supabase.from('sessions').insert({
        ...sessionData,
        expo_id: expoId,
      });
    }

    setShowForm(false);
    setEditSession(null);
    setFormData({
      title: '',
      description: '',
      speaker_name: '',
      location: '',
      start_time: '',
      end_time: '',
      capacity: '100',
    });
    fetchSessions();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this session?')) {
      await supabase.from('sessions').delete().eq('id', id);
      fetchSessions();
    }
  };

  const handleEdit = (session: Session) => {
    setEditSession(session);
    setFormData({
      title: session.title,
      description: session.description,
      speaker_name: session.speaker_name,
      location: session.location,
      start_time: session.start_time,
      end_time: session.end_time,
      capacity: session.capacity.toString(),
    });
    setShowForm(true);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export functions
  const exportCSV = () => {
    const csvData = filteredSessions.map(session => ({
      Title: session.title,
      Speaker: session.speaker_name,
      Location: session.location,
      StartTime: session.start_time,
      EndTime: session.end_time,
      Capacity: session.capacity,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sessions_report.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sessions Report', 20, 20);
    let y = 40;
    filteredSessions.forEach(session => {
      doc.text(`${session.title} - ${session.speaker_name} - ${session.location}`, 20, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('sessions_report.pdf');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Event Sessions</h3>
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
            Add Session
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Keynote: Future of Technology"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Session description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
              <input
                type="text"
                value={formData.speaker_name}
                onChange={(e) => setFormData({ ...formData, speaker_name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Main Hall"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editSession ? 'Update' : 'Add'} Session
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditSession(null);
                setFormData({
                  title: '',
                  description: '',
                  speaker_name: '',
                  location: '',
                  start_time: '',
                  end_time: '',
                  capacity: '100',
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {paginatedSessions.map((session) => (
          <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{session.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{session.description}</p>
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
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Speaker:</strong> {session.speaker_name} | <strong>Capacity:</strong>{' '}
                  {session.capacity}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(session)}
                  className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && !showForm && (
        <p className="text-center text-gray-500 py-8">
          No sessions found.
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
