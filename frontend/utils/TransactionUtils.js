// Utility functions used across components
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (time) => {
  return new Date('1970-01-01T' + time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const exportTransactions = (filteredTransactions) => {
  // Create CSV content
  const headers = ['Sender', 'Receiver', 'Amount', 'Date', 'Time'];
  const csvContent = [
    headers.join(','),
    ...filteredTransactions.map(t => [
      t.sender,
      t.receiver,
      t.amount,
      t.date,
      t.time
    ].join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};1