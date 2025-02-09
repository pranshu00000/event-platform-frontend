import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export default function CreateEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('dateTime', data.dateTime);
      formData.append('category', data.category);
      formData.append('location', data.location);
      formData.append('maxAttendees', data.maxAttendees);

      await axios.post('https://event-platform-backend.onrender.com/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            {...register('name', { required: true })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">Required</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            {...register('description')}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              {...register('dateTime', { required: true })}
              className={errors.dateTime ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select {...register('category')} defaultValue="Workshop">
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Social">Social</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input {...register('location')} />
          </div>

          <div className="form-group">
            <label>Max Attendees</label>
            <input
              type="number"
              {...register('maxAttendees')}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            className={errors.image ? 'error' : ''}
          />
          {errors.image && <span className="error-message">Required</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}