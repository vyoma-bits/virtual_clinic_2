import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';

const dummyUsers = [
  { id: '1', email: 'user1@example.com', password: 'password1' },
  { id: '0', email: 'user2@example.com', password: 'password2' },
  { id: '12', email: 'user3@example.com', password: 'password3' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user by email
    const user = dummyUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      // Redirect to Home page with userId
      navigate(`/home/${user.id}`);
    } else {
      // Show error message if login fails
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
};

export default LoginPage;
