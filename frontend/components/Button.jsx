import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X } from 'lucide-react';


function Button({ label, onClick, variant = 'primary', disabled = false, loading = false }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (!disabled && !loading) {
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
      onClick?.(e);
    }
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 
        ${variants[variant]}
        ${clicked ? 'scale-95' : 'scale-100'}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
        ${loading ? 'animate-pulse' : ''}
        focus:outline-none focus:ring-4 focus:ring-blue-300/50
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}

export default Button;