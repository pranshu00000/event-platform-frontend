import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import   CreateEvent  from './pages/CreateEvent';
import  Dashboard  from './pages/Dashboard';
import  EventDetail  from './pages/EventDetail';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginPage mode="login" />} />
          <Route path="/register" element={<RegisterPage mode="register" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;