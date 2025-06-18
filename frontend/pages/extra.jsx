import React, { useState, useEffect } from 'react';
import Appbar from '../components/Appbar.jsx';
import {
    Filter,
    Calendar,
    Download,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Send,
    User,
    Clock,
    Search,
    RefreshCw,
    AlertCircle
} from 'lucide-react';
import useHistory from '../hooks/useHistory.js';

function extra () {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
              <Appbar/>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className='mb-8 flex items-center justify-between'>
                    <div >
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Transaction History</h1>
                        <p className="text-gray-600">View and manage your payment transactions</p>
                    </div>
                </div>
              </div>
        </div>
    )
}