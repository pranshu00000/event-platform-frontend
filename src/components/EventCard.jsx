import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles.css';

export default function EventCard({ event, onJoin }) {
  const { user } = useAuth();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await onJoin(event._id);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="event-card">
      <img 
        src={event.image?.url || '/placeholder-event.jpg'} 
        alt={event.name}
        className="event-image"
      />
      <h3>{event.name}</h3>
      <div className="category">{event.category}</div>
      <p>{event.description}</p>
      <div className="details">
        <div>📅 {new Date(event.dateTime).toLocaleDateString()}</div>
        <div>👥 {event.attendees.length} attendees</div>
      </div>
      {user && (
        <button
          onClick={handleJoin}
          disabled={
            isJoining || 
            event.attendees.includes(user._id) ||
            (event.maxAttendees && event.attendees.length >= event.maxAttendees)
          }
        >
          {event.attendees.includes(user._id) ? 'Joined' : 'Join Event'}
        </button>
      )}
    </div>
  );
}