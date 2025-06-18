import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios.js';
import axios from 'axios';

const useUsers = () => {
    const [usernames, setUsernames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axiosInstance.get('http://localhost:3000/api/user/details');
                setUsernames(res.data);
            } catch (err) {
                console.error(`Error fetching user details: ${err.message}`);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, []);

    console.log(usernames, loading, error);
    return { users: usernames, loading, error }; // Changed to return 'users'
};

export default useUsers;