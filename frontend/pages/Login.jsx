import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/subHeading';
import InputBox from '../components/inputBox';
import Button from '../components/Button';
import useLogin from '../hooks/useLogin';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(username, password);
    console.log(result);
    setIsLoading(false);

    if (!result?.success) {
      setError(result?.error || 'Login failed');
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/50">
        <Heading label="Welcome Back" />
        <SubHeading label="Enter your credentials to access your account" />

        <InputBox
          label="Username"
          type="text"
          placeholder="harkirat123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputBox
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="mb-6">
          <Button
            label="Sign In"
            onClick={handleLogin}
            loading={isLoading}
            disabled={!username || !password}
          />
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link  to='/signup' className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
