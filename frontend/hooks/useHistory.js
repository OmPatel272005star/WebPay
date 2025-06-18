import { useState, useEffect } from 'react';

const useHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/transaction/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if using session-based auth
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.message && data.history) {
        // Transform the backend data to match frontend format
        const transformedTransactions = data.history.map((transaction, index) => ({
          id: index + 1,
          sender: transaction.type === 'sent' ? transaction.from : transaction.to,
          receiver: transaction.type === 'sent' ? transaction.to : transaction.from,
          amount: transaction.amount,
          date: formatDateFromBackend(transaction.date),
          time: convertTo24Hour(transaction.time),
          status: 'completed',
          type: transaction.type // Keep original type for reference
        }));
        
        setTransactions(transformedTransactions);
        console.log(transactions);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching transaction history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date from "6/9/2025" to "2025-06-09"
  const formatDateFromBackend = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Helper function to convert "2:33:07 PM" to "14:33:07"
  const convertTo24Hour = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
    } else {
      hours = modifier === 'AM' ? hours.padStart(2, '0') : (parseInt(hours, 10) + 12).toString();
    }
    
    return `${hours}:${minutes}:${seconds}`;
  };

  // Refresh function to manually trigger data fetch
  const refreshHistory = () => {
    fetchTransactionHistory();
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return {
    transactions,
    loading,
    error,
    refreshHistory
  };
};

export default useHistory;