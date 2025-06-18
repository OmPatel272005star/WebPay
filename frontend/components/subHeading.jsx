import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X } from 'lucide-react';


// Modern SubHeading Component
function SubHeading({ label }) {
  return (
    <p className="text-gray-600 text-center mb-6 leading-relaxed">
      {label}
    </p>
  );
}

export default SubHeading