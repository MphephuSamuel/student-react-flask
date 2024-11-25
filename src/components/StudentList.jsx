import React, { useEffect, useState } from 'react';
import { getStudents } from '../api'; // Assuming getStudents fetches the student list from the API
import { Card, CardContent, Typography, Grid, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsData = await getStudents(); // Fetching data
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {/* Full-width header */}
      <Typography variant="h4" gutterBottom align="center" sx={{ width: '100%', marginBottom: '24px' }}>
        Students List
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            {/* Link to the student details page */}
            <Link to={`/student/${student.id}`}>
              <Card sx={{
                maxWidth: 345,
                margin: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.2)',
                },
              }}>
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      alt={`${student.name} ${student.surname}`}
                      src={student.avatar_url || '/default-avatar.png'} // Use avatar_url from API
                      sx={{
                        width: 60,
                        height: 60,
                        marginBottom: '16px',
                      }}
                    />
                    <Typography variant="h6">{student.name} {student.surname}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {student.gender}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentList;
