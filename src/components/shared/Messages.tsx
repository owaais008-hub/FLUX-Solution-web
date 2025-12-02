import { useState, useEffect } from 'react';
import { supabase, Message } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Send, Mail, MailOpen, Plus } from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [composeData, setComposeData] = useState({
    recipient_id: '',
    subject: '',
    content: '',
  });

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(full_name, company_name),
        recipient:profiles!recipient_id(full_name, company_name)
      `)
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (data) setMessages(data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, company_name, role')
      .neq('id', user?.id);

    if (data) setUsers(data);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      recipient_id: composeData.recipient_id,
      subject: composeData.subject,
      content: composeData.content,
      is_read: false,
    });

    if (!error) {
      setShowCompose(false);
      setComposeData({ recipient_id: '', subject: '', content: '' });
      fetchMessages();
    }
  };

  const markAsRead = async (messageId: string) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', messageId);
    fetchMessages();
  };

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
    if (!message.is_read && message.recipient_id === user?.id) {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (showCompose) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Compose Message</h2>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <select
              value={composeData.recipient_id}
              onChange={(e) => setComposeData({ ...composeData, recipient_id: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select recipient</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.full_name} {u.company_name ? `(${u.company_name})` : ''} - {u.role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={composeData.subject}
              onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Message subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={composeData.content}
              onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your message..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </button>
            <button
              type="button"
              onClick={() => setShowCompose(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (selectedMessage) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedMessage(null)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Messages
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>
                  <strong>From:</strong>{' '}
                  {selectedMessage.sender?.full_name ||
                    selectedMessage.sender?.company_name ||
                    'Unknown'}
                </p>
                <p>
                  <strong>To:</strong>{' '}
                  {selectedMessage.recipient?.full_name ||
                    selectedMessage.recipient?.company_name ||
                    'Unknown'}
                </p>
              </div>
              <p>{new Date(selectedMessage.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {messages.map((message) => {
            const isRecipient = message.recipient_id === user?.id;
            const isUnread = isRecipient && !message.is_read;

            return (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isUnread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {isUnread ? (
                        <Mail className="w-5 h-5 text-blue-600" />
                      ) : (
                        <MailOpen className="w-5 h-5 text-gray-400" />
                      )}
                      <p className={`font-semibold ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      {isRecipient ? 'From' : 'To'}:{' '}
                      {isRecipient
                        ? message.sender?.full_name || message.sender?.company_name || 'Unknown'
                        : message.recipient?.full_name ||
                          message.recipient?.company_name ||
                          'Unknown'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
