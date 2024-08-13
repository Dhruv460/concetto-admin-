import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios'
function CreateEvent() {
  const [eventData, setEventData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: '',

  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventData); 
    try {
        const response = await axios.post('/api/admin/addEvent', eventData, {
            withCredentials: true
        });
        console.log(response.data);
        alert('Event created successfully');
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
          value={eventData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          value={eventData.time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        />
         
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateEvent;
