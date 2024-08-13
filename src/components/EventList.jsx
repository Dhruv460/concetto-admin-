import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function EventList() {
  const events = [
    {
      id: 1,
      name: 'Tech Talk',
      date: '2024-08-15',
      location: 'Auditorium',
    },
    {
      id: 2,
      name: 'Workshop',
      date: '2024-08-20',
      location: 'Lab 101',
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem key={event.id}>
            <ListItemText
              primary={event.name}
              secondary={`${event.date} - ${event.location}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" component={Link} to={`/edit/${event.id}`}>
                <Edit />
              </IconButton>
              <IconButton edge="end">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default EventList;
