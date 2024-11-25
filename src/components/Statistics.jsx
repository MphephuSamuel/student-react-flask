import React, { useEffect, useState, useMemo } from 'react';
import { getStudents } from '../api';
import { Card, CardContent, Typography, Container, Grid, CircularProgress } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Register the chart.js components
ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

const calculateAgeFromID = (id) => {
    const year = parseInt(id.substring(0, 2), 10);
    const month = parseInt(id.substring(2, 4), 10);
    const day = parseInt(id.substring(4, 6), 10);
    const currentYear = new Date().getFullYear();
    const fullYear = year + (year < 22 ? 2000 : 1900);
    const birthDate = new Date(fullYear, month - 1, day);
    const age = currentYear - birthDate.getFullYear();
    const m = new Date(currentYear, new Date().getMonth(), new Date().getDate());
    if (m < birthDate.setFullYear(m.getFullYear())) age--;
    return age;
};

const Statistics = () => {
    const [students, setStudents] = useState([]);
    const [ageDistribution, setAgeDistribution] = useState([]);
    const [genderDistribution, setGenderDistribution] = useState({ Male: 0, Female: 0, Other: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data); // Set student data
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            // Age distribution
            const ageRanges = {
                '0-9': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0,
                '50-59': 0, '60-69': 0, '70-79': 0, '80-89': 0, '90-99': 0, '100-109': 0,
            };

            // Gender distribution
            const genderCounts = { Male: 0, Female: 0, Other: 0 };

            students.forEach((student) => {
                const age = calculateAgeFromID(student.id);
                const gender = student.gender; // Assume gender is part of the student data
                
                // Count age ranges
                if (age < 10) ageRanges['0-9']++;
                else if (age < 20) ageRanges['10-19']++;
                else if (age < 30) ageRanges['20-29']++;
                else if (age < 40) ageRanges['30-39']++;
                else if (age < 50) ageRanges['40-49']++;
                else if (age < 60) ageRanges['50-59']++;
                else if (age < 70) ageRanges['60-69']++;
                else if (age < 80) ageRanges['70-79']++;
                else if (age < 90) ageRanges['80-89']++;
                else if (age < 100) ageRanges['90-99']++;
                else if (age <= 109) ageRanges['100-109']++;

                // Count genders
                if (genderCounts[gender] !== undefined) {
                    genderCounts[gender]++;
                }
            });

            setAgeDistribution(Object.values(ageRanges)); // Set the age distribution
            setGenderDistribution(genderCounts); // Set the gender distribution
            setLoading(false); // Set loading to false after processing
        }
    }, [students]);

    // Memoize chart data
    const barChartData = useMemo(() => {
        const maxIndex = ageDistribution.indexOf(Math.max(...ageDistribution));
        const colors = ageDistribution.map((_, index) =>
            index === maxIndex ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)'
        );
        const borderColors = ageDistribution.map((_, index) =>
            index === maxIndex ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'
        );

        return {
            labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99', '100-109'],
            datasets: [
                {
                    label: 'Number of Students',
                    data: ageDistribution,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }, [ageDistribution]);

    const pieChartData = useMemo(() => {
        return {
            labels: ['Male', 'Female', 'Other'],
            datasets: [
                {
                    data: Object.values(genderDistribution),
                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1,
                },
            ],
        };
    }, [genderDistribution]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Statistics</Typography>
            {loading ? (
                <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent style={{ height: '400px' }}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Students Age Distribution
                                </Typography>
                                <Bar data={barChartData} options={chartOptions} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent style={{ height: '400px' }}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Gender Distribution
                                </Typography>
                                <Pie data={pieChartData} options={chartOptions} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Statistics;
