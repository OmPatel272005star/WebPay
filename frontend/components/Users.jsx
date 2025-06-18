import React, { useState } from 'react';
import { Search, Send, User } from 'lucide-react';
import useUsers from '../hooks/useUsers';
import SendMoney from './SendMoney.jsx'
function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error } = useUsers();

  const filteredUsers = (users || []).filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedUser) {
    return <SendMoney user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="h-6 w-6 mr-2 text-blue-600" />
        Send Money To
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
        />
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {loading && <div>Loading users...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && filteredUsers.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-4 bg-white rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-gray-800 font-semibold">{user.username}</div>
            </div>
            <button
              onClick={() => setSelectedUser(user)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2 group"
            >
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              <span>Send</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
