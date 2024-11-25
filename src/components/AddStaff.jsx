import React, { useState } from 'react';
import { addStaff } from '../api';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
    // State for staff information fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [title, setTitle] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use useNavigate

    const handleAddStaff = async () => {
        // Check if all fields are filled
        if (name.trim() && surname.trim() && title.trim() && gender.trim()) {
            setLoading(true);
            const staffData = {
                name,
                surname,
                title,
                gender,
            };
            const response = await addStaff(staffData); // Pass the full staff data
            setLoading(false);

            if (response) {
                navigate('/'); // Redirect after successful addition
            }
        } else {
            alert('Please fill out all fields!');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add New Staff</Typography>

            {/* Staff Name */}
            <TextField
                label="Staff Name"
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
            
            {/* Title - Select dropdown */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Title</InputLabel>
                <Select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                    <MenuItem value="Prof">Prof</MenuItem>
                    {/* Add more titles as needed */}
                </Select>
            </FormControl>
            
            {/* Gender - Select dropdown */}
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
                    {/* Add more gender options as needed */}
                </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleAddStaff}
                disabled={loading}
                sx={{ marginTop: '16px' }}
            >
                {loading ? 'Adding...' : 'Add Staff'}
            </Button>
        </Container>
    );
};

export default AddStaff;
