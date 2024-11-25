import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import AddStaff from './components/AddStaff';
import Sidebar from './components/Sidebar';
import Statistics from './components/Statistics';
import StudentDetail from './components/StudentDetail';
import StudentList from './components/StudentList';  // Import the StudentList component
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* AppBar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleSidebarToggle} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 2,
            transition: 'margin-left 0.3s ease',
            marginLeft: sidebarOpen ? '240px' : '0',
            minHeight: '100vh',
            width: sidebarOpen ? 'calc(100% - 240px)' : '100%', // Adjust width based on sidebar state
          }}
        >
          {/* Title Tile */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1976d2',
              color: '#fff',
              padding: '16px',
              marginBottom: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Sammy Student Management System
          </Box>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/student/:id" element={<StudentDetail />} />
            <Route path="/students" element={<StudentList />} /> {/* Added the route for StudentList */}
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
