import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X } from 'lucide-react';

function Balance({ value }) {
  const [showBalance, setShowBalance] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleBalance = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowBalance(!showBalance);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium opacity-90">Your Balance</h3>
        <button 
          onClick={toggleBalance}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
      </div>
      
      <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {showBalance ? (
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">₹{value}</span>
            <TrendingUp className="h-5 w-5 text-green-300" />
          </div>
        ) : (
          <div className="text-3xl font-bold">₹••••••</div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-3">
        <div className="flex-1 bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
          <div className="text-xs opacity-80">This Month</div>
          <div className="font-semibold">+₹2,450</div>
        </div>
        <div className="flex-1 bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
          <div className="text-xs opacity-80">Spent</div>
          <div className="font-semibold">₹1,200</div>
        </div>
      </div>
    </div>
  );
}

export default Balance;