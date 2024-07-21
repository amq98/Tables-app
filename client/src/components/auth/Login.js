import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/Auth.css';

const Login = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
        <div className="social-login">
          <button type="button">Log in with Google</button>
          <button type="button">Log in with Facebook</button>
        </div>
        <div className="extra-options">
          <Link to="/forgot-password">Forgot Password?</Link>
          <label>
            <input type="checkbox" /> Stay Signed In
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
