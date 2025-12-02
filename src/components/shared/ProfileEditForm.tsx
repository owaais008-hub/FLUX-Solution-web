import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Profile } from '../../lib/supabase';
import { User } from 'lucide-react';

export default function ProfileEditForm({ onClose }: { onClose?: () => void }) {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        phone: profile.phone || '',
        avatar_url: profile.avatar_url || '',
        company_name: profile.company_name || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { error } = await updateProfile(formData);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Profile updated successfully!');
      if (onClose) setTimeout(onClose, 2000);
    }
    setLoading(false);
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!profile) return null;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.full_name || ''}
            onChange={(e) => handleChange('full_name', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            type="url"
            value={formData.avatar_url || ''}
            onChange={(e) => handleChange('avatar_url', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {profile.role === 'exhibitor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company_name || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Company"
            />
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}