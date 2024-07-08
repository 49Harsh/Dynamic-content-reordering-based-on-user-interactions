import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (token, username) => {
    setToken(token);
    setUsername(username);
    setIsAdmin(true);
  };

  const handleSignupSuccess = () => {
    setIsLogin(true);
    alert('Signup successful! Please log in.');
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div>
        {isLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Signup onSignupSuccess={handleSignupSuccess} />
        )}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </div>
    );
  }

  return (
    <AdminDashboard token={token} username={username} onLogout={handleLogout} />
  );
}

export default App;