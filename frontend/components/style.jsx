import React from 'react';

export const Container = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    {children}
  </div>
);

export const MainContent = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {children}
  </div>
);

export const LoadingState = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex items-center space-x-3">
      <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
      <span className="text-lg text-gray-600">Loading transaction history...</span>
    </div>
  </div>
);

export const ErrorState = ({ error, onRetry }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Transactions</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Retry</span>
      </button>
    </div>
  </div>
);

export const SectionCard = ({ children }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
    {children}
  </div>
);

export const TableContainer = ({ children }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
    {children}
  </div>
);