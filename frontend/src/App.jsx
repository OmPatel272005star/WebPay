import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/DashBoard';
import { useAuthContext } from '../context/AuthContext';
import SendMoney from '../components/SendMoney.jsx'
import HomePage from '../pages/HomePage.jsx'
import TransactionHistory from '../pages/TransactionHistory.jsx'
function App() {
  const {authUser} = useAuthContext();
  
  console.log(authUser);
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/signup" element={authUser ? <Navigate to={'/dashboard'}/> : <Signup />} />
          <Route path="/login" element={authUser ? <Navigate to={'/dashboard'}/> : <Login />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to={'/'} />} />
          <Route path="/transactionhistory" element={authUser ? <TransactionHistory /> : <Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}


export default App;
