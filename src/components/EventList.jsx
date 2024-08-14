import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/admin/getEvents');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

const handleDeleteConfirm = async () => {
  try {
    await axios.delete(`/api/admin/deleteEvent`, {
      data: { eventName: selectedEvent.eventName }
    });
    setEvents(events.filter((event) => event._id !== selectedEvent._id));
  } catch (error) {
    console.error('Error deleting event:', error);
  }
  setOpen(false);
};


  const handleDeleteCancel = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="div" gutterBottom>
                    {event.eventName}
                  </Typography>
                  <Box>
                    <IconButton
                      component={Link}
                      to={`/events/edit/${event._id}`}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(event)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                {event.type && (
                  <Typography color="textSecondary" gutterBottom>
                    {event.type}
                  </Typography>
                )}
                {event.description && (
                  <Typography variant="body2" component="p">
                    <strong>Description:</strong> {event.description}
                  </Typography>
                )}
              {event.rounds && Array.isArray(event.rounds) && event.rounds.length > 0 && (
  <Typography variant="body2" component="p">
    <strong>Rounds:</strong> {event.rounds.join(', ')}
  </Typography>
)}

                {event.guidelines && (
                  <Typography variant="body2" component="p">
                    <strong>Guidelines:</strong> {event.guidelines}
                  </Typography>
                )}
                {event.contact && (
                  <>
                    {event.contact.name && (
                      <Typography variant="body2" component="p">
                        <strong>Contact Name:</strong> {event.contact.name}
                      </Typography>
                    )}
                    {event.contact.contact && (
                      <Typography variant="body2" component="p">
                        <strong>Contact Info:</strong> {event.contact.contact}
                      </Typography>
                    )}
                  </>
                )}
                {event.maxTeamSize != null && (
                  <Typography variant="body2" component="p">
                    <strong>Max Team Size:</strong> {event.maxTeamSize}
                  </Typography>
                )}
                {event.minTeamSize != null && (
                  <Typography variant="body2" component="p">
                    <strong>Min Team Size:</strong> {event.minTeamSize}
                  </Typography>
                )}

 {event.rounds != null && (
                  <Typography variant="body2" component="p">
                    <strong> No. of rounds:</strong> {event.rounds}
                  </Typography>
                )}

                {event.eventStartTime && (
                  <Typography variant="body2" component="p">
                    <strong>Event Start Time:</strong> {event.eventStartTime}
                  </Typography>
                )}
                {event.eventEndTime && (
                  <Typography variant="body2" component="p">
                    <strong>Event End Time:</strong> {event.eventEndTime}
                  </Typography>
                )}
                {event.venue && (
                  <Typography variant="body2" component="p">
                    <strong>Venue:</strong> {event.venue}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the event {selectedEvent?.eventName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventList;
