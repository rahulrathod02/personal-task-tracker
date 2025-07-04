// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setLoggedInUser(username);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedInUser(null);
  };

  return (
    <div className="app">
      {loggedInUser ? (
        <Dashboard username={loggedInUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;