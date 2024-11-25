import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, deleteStudentById } from '../api'; // Import delete function
import { Typography, Box, Container, CircularProgress, Grid, Paper, Button, Snackbar } from '@mui/material';

const StudentDetail = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch student data by ID
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentData = await getStudentById(id); // Fetch student details using the ID
        setStudent(studentData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load student details.');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]); // Dependency on student ID, refetch when the ID changes

  // Handle deleting the student
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await deleteStudentById(id);
        setSnackbarMessage('Student deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        navigate('/students'); // Redirect to the students list
      } catch (err) {
        setSnackbarMessage('Failed to delete student.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ); // Show loading spinner while fetching data
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    ); // Show error message if fetching fails
  }

  return (
    <Container>
      {student && (
        <Box sx={{ padding: 4, marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)} // Go back to the previous page
            sx={{ marginBottom: 2 }}
          >
            Back
          </Button>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
              {student.name} {student.surname}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="textSecondary">
                  <strong>Student ID:</strong> {student.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="textSecondary">
                  <strong>Gender:</strong> {student.gender}
                </Typography>
              </Grid>
            </Grid>
            {/* Delete Button */}
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete} // Trigger delete on click
              >
                Delete Student
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Custom Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Box
          sx={{
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
            color: 'white',
            padding: 2,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {snackbarMessage}
          </Typography>
          <Button
            color="inherit"
            size="small"
            onClick={() => setOpenSnackbar(false)}
          >
            Close
          </Button>
        </Box>
      </Snackbar>
    </Container>
  );
};

export default StudentDetail;
