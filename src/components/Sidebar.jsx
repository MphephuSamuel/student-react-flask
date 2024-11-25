import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'persistent'} // Use temporary drawer on small screens
      ModalProps={{
        keepMounted: true, // Better performance on mobile devices
      }}
    >
      <List>
        <ListItem component={Link} to="/" onClick={onClose}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/add-student" onClick={onClose}>
          <ListItemText primary="Add Student" />
        </ListItem>
        <ListItem component={Link} to="/add-staff" onClick={onClose}>
          <ListItemText primary="Add Staff" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/students" onClick={onClose}>
          <ListItemText primary="Student List" /> {/* Added "Student List" option */}
        </ListItem>
        <ListItem component={Link} to="/statistics" onClick={onClose}>
          <ListItemText primary="Statistics" />
        </ListItem>
        {/* Add more list items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
