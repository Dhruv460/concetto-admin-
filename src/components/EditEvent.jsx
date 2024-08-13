import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function EditEvent() {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  useEffect(() => {
   
    const fetchEventData = async () => {
      const fetchedData = {
        name: 'Sample Event',
        date: '2024-08-20',
        time: '14:00',
        location: 'Auditorium',
        description: 'This is a sample event description.',
      };
      setEventData(fetchedData);
    };
    fetchEventData();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:', formData);
      console.log(response.data); 
      alert('logged in succesfully');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Event
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
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditEvent;
