import axiosInstance from '../utils/axios.js';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const {setAuthUser} =useAuthContext(false);
  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    try {
      const res = await axiosInstance.post('http://localhost:3000/api/auth/login', {
        username:username,
        password : password,
      });

      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('jwt', JSON.stringify(data));
      setAuthUser(data);
      return { res : res.data , success: true };
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return { success: false, error: err.message };
    }
  };

  return { login };
};

function handleInputErrors(username, password) {
  if (!username || !password) {
    console.warn("Please fill all the fields");
    return false;
  }
  return true;
}

export default useLogin;
