import React, { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import useTransaction from '../hooks/useTransaction.js';

function SendMoney({ user, onBack }) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { transaction } = useTransaction();

  const handleTransfer = async () => {
    setIsLoading(true);
    setError('');

    const result = await transaction(amount, user._id);

    if (result.success) {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onBack();
      }, 2000);
    } else {
      setIsLoading(false);
      setError(result.error || 'Transfer failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <button onClick={onBack} className="flex items-center text-blue-500 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Transfer Successful!</h2>
            <p className="text-gray-600 mt-2">₹{amount} sent to {user.username}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Send Money to {user.username}</h2>
              <p className="text-gray-500">User ID: {user._id}</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
              />
            </div>

            <button
              onClick={handleTransfer}
              disabled={!amount || isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              {isLoading ? 'Transferring...' : 'Initiate Transfer'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SendMoney;
