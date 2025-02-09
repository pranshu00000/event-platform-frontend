import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthStyles.css';

export default function RegisterPage() {
  const { register: signUp } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await signUp(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
>      <div className="auth-card">
        <h2>Create New Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

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
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-alt-options">
          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}