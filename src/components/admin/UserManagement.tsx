import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Profile } from '../../lib/supabase';
import { Users, Edit } from 'lucide-react';

export default function UserManagement() {
  const { getAllUsers, updateUserRole } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<'admin' | 'exhibitor' | 'attendee'>('attendee');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await getAllUsers();
    if (error) {
      setError(error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleRoleChange = async (userId: string) => {
    const { error } = await updateUserRole(userId, newRole);
    if (error) {
      setError(error.message);
    } else {
      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
      setEditingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as 'admin' | 'exhibitor' | 'attendee')}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="attendee">Attendee</option>
                      <option value="exhibitor">Exhibitor</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.company_name || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUser === user.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingUser(user.id);
                        setNewRole(user.role);
                      }}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}