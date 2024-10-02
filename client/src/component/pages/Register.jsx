import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Initialize the navigation function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (register.password !== register.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: register.username,
        email: register.email,
        password: register.password,
        confirmPassword: register.confirmPassword,
      });

      console.log('Registration successful:', response.data);

      // Clear form fields
      setRegister({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Navigate to the login page
      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 8 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={register.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={register.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={register.password}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={register.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Box display="flex" justifyContent="center">
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
