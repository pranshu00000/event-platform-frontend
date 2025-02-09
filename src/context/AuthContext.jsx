import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('https://event-platform-backend.onrender.com/api/auth/check', { withCredentials: true });
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await axios.post('https://event-platform-backend.onrender.com/api/auth/login', credentials, { withCredentials: true });
    setUser(data);
  };

  const register = async (userData) => {
    const { data } = await axios.post('https://event-platform-backend.onrender.com/api/auth/register', userData, { withCredentials: true });
    setUser(data);
  };

  const guestLogin = async () => {
    const { data } = await axios.post('https://event-platform-backend.onrender.com/api/auth/guest', {}, { withCredentials: true });
    setUser(data);
  };

 
const logout = async () => {
  try {
    await axios.post('https://event-platform-backend.onrender.com/api/auth/logout', {}, { 
      withCredentials: true 
    });
    setUser(null); // Clear user state
    // Optional: redirect to login page
    navigate('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
  return (
    <AuthContext.Provider value={{ user, loading,logout ,login,guestLogin,register}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);