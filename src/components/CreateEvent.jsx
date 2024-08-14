import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function CreateEvent() {
  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    rounds: '',
    guidelines: '',
    contact: {
      name: '',
      contact: ''
    },
    maxTeamSize: '',
    minTeamSize: '',
    eventStartTime: '',
    eventEndTime: '',
    venue: ''
  });

  const [errors, setErrors] = useState({
    rounds: '',
    eventStartTime: '',
    eventEndTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setEventData(prevState => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [field]: value
        }
      }));
    } else {
      setEventData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; // Format: YYYY-MM-DDTHH:MM
    return regex.test(dateString) && !isNaN(new Date(dateString).getTime());
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { ...errors };


    if (!validateDate(eventData.eventStartTime)) {
      newErrors.eventStartTime = 'Invalid start time format. Please use the format YYYY-MM-DDTHH:MM.';
      valid = false;
    } else if (new Date(eventData.eventStartTime) >= new Date(eventData.eventEndTime)) {
      newErrors.eventEndTime = 'Event end time must be after the start time.';
      valid = false;
    } else {
      newErrors.eventStartTime = '';
      newErrors.eventEndTime = '';
    }


    if (isNaN(eventData.rounds) || eventData.rounds <= 0) {
      newErrors.rounds = 'Rounds must be a positive number.';
      valid = false;
    } else {
      newErrors.rounds = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post('/api/admin/addEvent', eventData, {
        withCredentials: true
      });
      console.log(response.data);
      alert('Event created successfully');

     
      setEventData({
        eventName: '',
        description: '',
        rounds: '',
        guidelines: '',
        contact: {
          name: '',
          contact: ''
        },
        maxTeamSize: '',
        minTeamSize: '',
        eventStartTime: '',
        eventEndTime: '',
        venue: ''
      });
      setErrors({
        rounds: '',
        eventStartTime: '',
        eventEndTime: ''
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="eventName"
          value={eventData.eventName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Rounds"
          name="rounds"
          type="number"
          value={eventData.rounds}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.rounds}
          helperText={errors.rounds}
        />
        <TextField
          label="Guidelines"
          name="guidelines"
          value={eventData.guidelines}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact Name"
          name="contact.name"
          value={eventData.contact.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact Info"
          name="contact.contact"
          value={eventData.contact.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Max Team Size"
          name="maxTeamSize"
          type="number"
          value={eventData.maxTeamSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Team Size"
          name="minTeamSize"
          type="number"
          value={eventData.minTeamSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Event Start Time"
          name="eventStartTime"
          type="datetime-local"
          value={eventData.eventStartTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
          error={!!errors.eventStartTime}
          helperText={errors.eventStartTime}
        />
        <TextField
          label="Event End Time"
          name="eventEndTime"
          type="datetime-local"
          value={eventData.eventEndTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
          error={!!errors.eventEndTime}
          helperText={errors.eventEndTime}
        />
        <TextField
          label="Venue"
          name="venue"
          value={eventData.venue}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateEvent;
