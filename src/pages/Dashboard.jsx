import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './styles.css';
import { Link } from 'react-router-dom';
import { SyncLoader
} from 'react-spinners';


export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const { user, logout } = useAuth(); // Get user and logout from auth context

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/events', {
          params: { category: selectedCategory, upcoming: showUpcoming }
        });
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory, showUpcoming]);

  const handleJoinEvent = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/join`, {}, { 
        withCredentials: true 
      });
      setEvents(events.map(event => 
        event._id === eventId ? 
        { ...event, attendees: [...event.attendees, user._id] } : 
        event
      ));
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  return (
    <div className="container">
      <div className='navbar' >
        <Link className='navbar-btn' to={'/login'}>login</Link>
        <Link className='navbar-btn' to={'/register'}>register</Link>
      </div>
      <h1 className='header'>{showUpcoming ? 'Upcoming Events' : 'Past Events'}</h1>
      
      {/* Show logout button only if user exists */}
      {user && (
        <button 
          onClick={logout} 
          className="logout-button"
        >
          Logout
        </button>
      )}

      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Social">Social</option>
        </select>

        <select
          value={showUpcoming}
          onChange={(e) => setShowUpcoming(e.target.value === 'true')}
        >
          <option value={true}>Upcoming</option>
          <option value={false}>Past</option>
        </select>
      </div>

      {loading ? (
    <div className="loading">
      <SyncLoader
 color="#007bff" size={20} />
      </div>
  ) : events.length === 0 ? (  // Check if events array is empty
    <div className="no-events">
      {showUpcoming ? 'No upcoming events' : 'No past events'} found{selectedCategory && ` in ${selectedCategory}`}
    </div>
  ) : (
    <div className="events-grid">
      {events.map(event => (
        <EventCard
          key={event._id}
          event={event}
          onJoin={handleJoinEvent}
        />
      ))}
    </div>
  )}
</div>
  );
}