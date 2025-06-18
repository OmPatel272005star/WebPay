import React, { useState } from 'react';
import Heading from "../components/Heading";
import SubHeading from "../components/subHeading";
import InputBox from "../components/inputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import useSignup from "../hooks/useSignup";
import { useNavigate,Link } from 'react-router-dom';
function Signup() {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signup } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { username, email, password } = formData;
    const result = await signup(username, email, password);
    setIsLoading(false);
   
    if (!result.success) {
      setError(result.error || 'Signup failed');
    } else {
      setError(null);
      // Optional: Redirect user here
      console.log("Signup successful!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/50">
        <Heading label="Join PayTM" />
        <SubHeading label="Create your account to get started" />

        <InputBox
          label="Username"
          placeholder="John Doe"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />

        <InputBox
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputBox
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="mb-6">
          <Button
            label="Create Account"
            onClick={handleSignup}
            loading={isLoading}
            disabled={!formData.username || !formData.email || !formData.password}
          />
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to='/login' className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors" >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
