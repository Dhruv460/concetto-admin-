import React from 'react';
import { Typography } from '@mui/material';

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the admin panel. Use the sidebar to manage events.
      </Typography>
    </div>
  );
}

export default Dashboard;
