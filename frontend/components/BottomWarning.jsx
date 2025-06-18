
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Search, Send, User, Eye, EyeOff, Bell, Settings, LogOut, TrendingUp, Wallet, ArrowUpRight, Check, X } from 'lucide-react';


function BottomWarning({label, buttonText, to}) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  )
}

export default BottomWarning;