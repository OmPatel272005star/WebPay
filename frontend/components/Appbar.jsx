
import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X, History, LayoutDashboard } from 'lucide-react';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TransactionHistory from '../pages/TransactionHistory';
// Modern Appbar Component
function Appbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await logout();
    if (!result?.success) {
      setError(result?.error || 'Logout failed');
    }
  }
  const { authUser } = useAuthContext();
  return (
    <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PayTM
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button> */}

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <span className="text-gray-700 font-medium hidden sm:block">Hello, {authUser.username}</span>
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-105 transition-transform">
                  {authUser.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2">
                  <button onClick={() => navigate('/dashboard')} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2 transition-colors">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button onClick={() => navigate('/transactionhistory')} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2 transition-colors">
                    <History className="h-4 w-4" />
                    <span>History</span>
                  </button>

                  <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appbar;