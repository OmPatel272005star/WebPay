import React from 'react'
import Appbar from '../components/Appbar.jsx'
import Balance from '../components/Balance.jsx'
import Users from '../components/Users.jsx'
// Modern Dashboard Component
function DashBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Appbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Balance value="10,000" />
        </div>
        <Users />
      </div>
    </div>
  );
}

export default DashBoard