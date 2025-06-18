import React from 'react';
import axiosInstance from '../utils/axios.js';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		try {
			await axiosInstance.post("http://localhost:3000/api/auth/logout");
			localStorage.removeItem("jwt");
			setAuthUser(null);
			return { success: true };
		} catch (err) {
			console.error(`Error: ${err.message}`);
			return { success: false, error: err.message };
		}
	};

	return { logout };
};

export default useLogout;
