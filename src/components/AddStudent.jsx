import React, { useState } from 'react';
import { addStudent } from '../api';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddStudent = () => {
    // State for the student information fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [studentId, setStudentId] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // For displaying errors
    const navigate = useNavigate(); // Use useNavigate

    // Function to validate the South African ID
    const validateStudentId = (id) => {
        const idPattern = /^\d{13}$/; // Must be exactly 13 digits
        return idPattern.test(id); // Test against the pattern
    };

    const handleAddStudent = async () => {
        // Check if all fields are filled
        if (!name.trim() || !surname.trim() || !studentId.trim() || !gender.trim()) {
            alert('Please fill out all fields!');
            return;
        }

        // Validate the Student ID format
        if (!validateStudentId(studentId)) {
            setError('Please enter a valid South African ID number (13 digits).');
            return;
        }

        setError(''); // Clear error message
        setLoading(true);
        const studentData = {
            name,
            surname,
            id: studentId,
            gender,
        };
        const response = await addStudent(studentData);
        setLoading(false);

        if (response) {
            navigate('/'); // Use navigate to redirect
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add New Student</Typography>

            {/* Student Name */}
            <TextField
                label="Student Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
            />
            {/* Surname */}
            <TextField
                label="Surname"
                fullWidth
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                margin="normal"
            />
            {/* Student ID */}
            <TextField
                label="Student ID"
                fullWidth
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                margin="normal"
                error={!!error} // Display error state
                helperText={error} // Display error message if any
            />
            {/* Gender - Dropdown */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStudent}
                disabled={loading}
                sx={{ marginTop: '16px' }}
            >
                {loading ? 'Adding...' : 'Add Student'}
            </Button>
        </Container>
    );
};

export default AddStudent;
