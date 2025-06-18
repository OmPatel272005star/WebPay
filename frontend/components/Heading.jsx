import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X } from 'lucide-react';


function Heading({ label = "Welcome" }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-600 bg-clip-text text-transparent mb-2">
        {label}
      </h1>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
    </div>
  );
}

export default Heading;