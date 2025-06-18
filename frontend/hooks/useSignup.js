// hooks/useSignup.js
import axiosInstance from '../utils/axios.js';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {

  const {setAuthUser} =useAuthContext(false);

  const signup = async (username, email, password) => {
    const success = handleInputErrors(username, email, password);
    if (!success) return { success: false, error: 'Missing fields' };

    try {
      const res = await axiosInstance.post("http://localhost:3000/api/auth/signup", {
        username:username,
        email:email,
        password:password
      });

      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      localStorage.setItem('jwt', JSON.stringify(data));
      setAuthUser(data);
      
      return { res : res.data,success: true };
    } catch (err) {
      console.log(`Error: ${err.message}`);
      return { success: false, error: err.message };
    }
  };

  return { signup };
};

function handleInputErrors(username, email, password) {
  if (!username || !email || !password) {
    console.warn("Please fill all the fields");
    return false;
  }
  return true;
}

export default useSignup;
