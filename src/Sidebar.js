// Sidebar.js
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Sidebar = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Connect with People
      </Typography>
      {/* Sample connection list */}
      <Typography variant="body2">John Doe</Typography>
      <Typography variant="body2">Jane Smith</Typography>
      <Typography variant="body2">Alice Johnson</Typography>
      {/* Add more connections as needed */}
    </Paper>
  );
};

export default Sidebar;
