import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Add code here to validate the username and password
    // You can make an API call to a backend server to check if the credentials are correct
    // If the credentials are correct, redirect the user to the dashboard
    // If the credentials are incorrect, display an error message

    if (username === 'admin' && password === 'password') {
      // Redirect the user to the dashboard
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!validateForm()}>
          Log in
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;