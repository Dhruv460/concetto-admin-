import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    rounds: '',
    guidelines: '',
    contact: { name: '', contact: '' },
    maxTeamSize: '',
    minTeamSize: '',
    eventStartTime: '',
    eventEndTime: '',
    venue: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/admin/getEvent/${eventId}`);
        setEventData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/updateEvent/${eventId}`, eventData);
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event Name"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={eventData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Rounds"
            name="rounds"
            value={eventData.rounds}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Guidelines"
            name="guidelines"
            value={eventData.guidelines}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contact Name"
            name="contact.name"
            value={eventData.contact.name}
            onChange={(e) =>
              setEventData((prevData) => ({
                ...prevData,
                contact: { ...prevData.contact, name: e.target.value },
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contact Info"
            name="contact.contact"
            value={eventData.contact.contact}
            onChange={(e) =>
              setEventData((prevData) => ({
                ...prevData,
                contact: { ...prevData.contact, contact: e.target.value },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Max Team Size"
            name="maxTeamSize"
            type="number"
            value={eventData.maxTeamSize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Min Team Size"
            name="minTeamSize"
            type="number"
            value={eventData.minTeamSize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event Start Time"
            name="eventStartTime"
            type="datetime-local"
            value={eventData.eventStartTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event End Time"
            name="eventEndTime"
            type="datetime-local"
            value={eventData.eventEndTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Event
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditEvent;
