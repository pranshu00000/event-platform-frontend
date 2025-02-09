import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AuthStyles.css';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await axios.post('https://event-platform-backend.onrender.com/api/auth/guest', {}, { withCredentials: true });
      navigate('/');
    } catch (err) {
      setError('Guest login failed');
    }
  };

  return (
    <div
  className="auth-container"
  style={{
    backgroundImage: `url('/background.jpg')`, // Replace with your image filename
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div className="auth-card">
    <h2>Login to Your Account</h2>

    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button type="submit" disabled={loading} className="auth-button">
        {loading ? <span className="loader"></span> : 'Sign In'}
      </button>
    </form>

    <div className="auth-alt-options">
      <button onClick={handleGuestLogin} className="guest-button">
        Continue as Guest
      </button>
      <div className="auth-switch">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </div>
  </div>
</div>
 );
}