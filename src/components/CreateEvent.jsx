import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    minSize:'',
    maxSize:'',
    
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(eventData);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="name"
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
         <TextField
          label="max size "
          type='number'
          name="name"
          value={eventData.maxSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="min size"
          name="name"
          type ='number'
          value={eventData.minSize}
          onChange={handleChange}
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
