import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';





function Sidebar() {
  return (
    <div style={{ width: '200px', background: '#f0f0f0', padding: '20px' }}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem  component={Link} to="/create">
          <ListItemText primary="Create Event" />
        </ListItem>
        <ListItem  component={Link} to="/events">
          <ListItemText primary="Event List" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
