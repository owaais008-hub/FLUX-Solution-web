import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { TrendingUp, Users, Building2, Calendar, BarChart3, Download, Search, Filter } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Analytics() {
  const [stats, setStats] = useState({
    totalExpos: 0,
    totalBooths: 0,
    totalAttendees: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [expoStats, setExpoStats] = useState<any[]>([]);
  const [filteredExpoStats, setFilteredExpoStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Chart data states
  const [attendeeEngagementData, setAttendeeEngagementData] = useState<any>({});
  const [boothTrafficData, setBoothTrafficData] = useState<any>({});
  const [sessionPopularityData, setSessionPopularityData] = useState<any>({});

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    const [expos, booths, profiles, applications] = await Promise.all([
      supabase.from('expos').select('id, title, status', { count: 'exact' }),
      supabase.from('booths').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'attendee'),
      supabase.from('exhibitor_applications').select('id, status', { count: 'exact' }),
    ]);

    setStats({
      totalExpos: expos.count || 0,
      totalBooths: booths.count || 0,
      totalAttendees: profiles.count || 0,
      totalApplications: applications.count || 0,
      pendingApplications:
        applications.data?.filter((a) => a.status === 'pending').length || 0,
    });

    if (expos.data) {
      const expoDetails = await Promise.all(
        expos.data.map(async (expo) => {
          const [registrations, sessions, boothsData, applicationsData] = await Promise.all([
            supabase
              .from('expo_registrations')
              .select('id', { count: 'exact' })
              .eq('expo_id', expo.id),
            supabase
              .from('sessions')
              .select('id', { count: 'exact' })
              .eq('expo_id', expo.id),
            supabase
              .from('booths')
              .select('id, status', { count: 'exact' })
              .eq('expo_id', expo.id),
            supabase
              .from('exhibitor_applications')
              .select('id, status', { count: 'exact' })
              .eq('expo_id', expo.id),
          ]);

          return {
            title: expo.title,
            status: expo.status,
            registrations: registrations.count || 0,
            sessions: sessions.count || 0,
            booths: boothsData.count || 0,
            occupiedBooths:
              boothsData.data?.filter((b) => b.status === 'occupied').length || 0,
            applications: applicationsData.count || 0,
          };
        })
      );

      setExpoStats(expoDetails);
      setFilteredExpoStats(expoDetails);

      // Prepare chart data
      const labels = expoDetails.map(e => e.title);
      setAttendeeEngagementData({
        labels,
        datasets: [{
          label: 'Registrations',
          data: expoDetails.map(e => e.registrations),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
      });

      setBoothTrafficData({
        labels,
        datasets: [{
          label: 'Occupied Booths',
          data: expoDetails.map(e => e.occupiedBooths),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }],
      });

      setSessionPopularityData({
        labels,
        datasets: [{
          label: 'Sessions',
          data: expoDetails.map(e => e.sessions),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }],
      });
    }

    setLoading(false);
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = expoStats;
    if (searchTerm) {
      filtered = filtered.filter(expo =>
        expo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(expo => expo.status === statusFilter);
    }
    setFilteredExpoStats(filtered);
    setCurrentPage(1);
  }, [expoStats, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredExpoStats.length / itemsPerPage);
  const paginatedExpoStats = filteredExpoStats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export functions
  const exportCSV = () => {
    const csv = Papa.unparse(filteredExpoStats);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'analytics_report.csv';
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Analytics Report', 20, 20);
    let y = 40;
    filteredExpoStats.forEach(expo => {
      doc.text(`${expo.title}: Registrations: ${expo.registrations}, Sessions: ${expo.sessions}, Occupied Booths: ${expo.occupiedBooths}`, 20, y);
      y += 10;
    });
    doc.save('analytics_report.pdf');
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
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalExpos}</p>
          <p className="text-blue-100 text-sm">Total Expos</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalBooths}</p>
          <p className="text-green-100 text-sm">Total Booths</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalAttendees}</p>
          <p className="text-orange-100 text-sm">Total Attendees</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white text-purple-600 px-2 py-1 rounded-full font-semibold">
              {stats.pendingApplications} pending
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.totalApplications}</p>
          <p className="text-purple-100 text-sm">Applications</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Engagement</h3>
          <Line data={attendeeEngagementData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booth Traffic</h3>
          <Bar data={boothTrafficData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Popularity</h3>
          <Pie data={sessionPopularityData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Expo Performance</h3>
          <div className="flex space-x-4">
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
        </div>
        <div className="space-y-4">
          {paginatedExpoStats.map((expo, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-900 mb-3">{expo.title}</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-600 font-medium">Registrations</p>
                  <p className="text-2xl font-bold text-blue-900">{expo.registrations}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-600 font-medium">Sessions</p>
                  <p className="text-2xl font-bold text-green-900">{expo.sessions}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-sm text-orange-600 font-medium">Booths</p>
                  <p className="text-2xl font-bold text-orange-900">{expo.booths}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm text-purple-600 font-medium">Occupied</p>
                  <p className="text-2xl font-bold text-purple-900">{expo.occupiedBooths}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 font-medium">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{expo.applications}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredExpoStats.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No expo data available yet. Create expos to see analytics.
            </p>
          )}
        </div>

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
    </div>
  );
}
