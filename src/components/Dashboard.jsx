import React, { useEffect, useState } from 'react';
import { getStudents, getStaff } from '../api';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track any errors during the fetch

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsData = await getStudents();
                const staffData = await getStaff();
                setStudents(studentsData);
                setStaff(staffData);
                setLoading(false); // Data is loaded
            } catch (err) {
                setError("Failed to load data."); // Set error if something goes wrong
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ['Students', 'Staff'],
        datasets: [
            {
                label: 'Count',
                data: [students.length, staff.length],
                backgroundColor: ['#4E82E0', '#FF8C00'],
            },
        ],
    };

    // If the page is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there was an error loading the data
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Total Students</Typography>
                            <Typography variant="h6">{students.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Total Staff</Typography>
                            <Typography variant="h6">{staff.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Bar data={data} />
            <div style={{ marginTop: 20 }}>
                <Link to="/add-student">
                    <Button variant="contained" color="primary" style={{ marginRight: 10 }}>Add Student</Button>
                </Link>
                <Link to="/add-staff">
                    <Button variant="contained" color="secondary">Add Staff</Button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
