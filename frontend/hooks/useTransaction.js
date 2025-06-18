import axiosInstance from '../utils/axios.js';

const useTransaction = () => {
  const handleInputError = (amount, to) => {
    if (amount <= 0 || !amount || !to) {
      console.warn("Enter valid Input");
      return false;
    }
    return true;
  };

  const transaction = async (amount, to) => {
    const valid = handleInputError(amount, to);
   
    if (!valid) return { success: false, error: 'Missing or invalid fields' };

    try {
      const res = await axiosInstance.post('http://localhost:3000/api/transaction/transfer', 
        {amount:amount,to:to},
        { withCredentials: true } 
      );

      const data = res.data;
      if (data.error) throw new Error(data.error);
      return { success: true, res: data };
    } catch (err) {
      console.error(`Error in transaction: ${err.message}`);
      return { success: false, error: err.message };
    }
  };

  return { transaction };
};

export default useTransaction;
