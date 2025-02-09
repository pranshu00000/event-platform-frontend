import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(data);
      } catch (error) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      await axios.post(`http://localhost:5000/api/events/${id}/join`);
      const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.error('Join failed:', error);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={event.image?.url}
          alt={event.name}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {event.category}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {new Date(event.dateTime).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">{event.location || 'Online'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Attendees</h3>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {event.attendees.slice(0, 5).map(attendee => (
                    <div 
                      key={attendee._id}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      {attendee.username[0]}
                    </div>
                  ))}
                </div>
                <span className="text-gray-600">
                  {event.attendees.length} / {event.maxAttendees || '∞'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleJoin}
            disabled={joining || event.attendees.some(a => a._id === user?._id)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {joining ? 'Processing...' : 
             event.attendees.some(a => a._id === user?._id) ? 'Joined' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
}