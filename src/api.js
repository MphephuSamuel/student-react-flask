import axios from 'axios';

const API_URL = 'https://backend-k9ur.onrender.com/api';

// Fetch all students
export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};

// Fetch a student by ID
export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/students/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student by ID:", error);
        throw error; // Propagate error
    }
};

// Fetch all staff members
export const getStaff = async () => {
    try {
        const response = await axios.get(`${API_URL}/staff`);
        return response.data;
    } catch (error) {
        console.error("Error fetching staff:", error);
    }
};

// Add a new student
export const addStudent = async (studentData) => {
    try {
        const response = await axios.post(`${API_URL}/students`, studentData);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
    }
};

// Add a new staff member
export const addStaff = async (staffData) => {
    try {
        const response = await axios.post(`${API_URL}/staff`, staffData);
        return response.data;
    } catch (error) {
        console.error("Error adding staff:", error);
    }
};


// Delete a student by ID using axios
export const deleteStudentById = async (studentId) => {
    try {
        const response = await axios.delete(`${API_URL}/students/${studentId}`);
        console.log("Student deleted:", response.data);
        return response.data; // Return the response for further handling
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error; // Propagate error for handling in the component
    }
};

  