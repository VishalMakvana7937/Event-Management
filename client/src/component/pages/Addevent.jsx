import React, { useState } from 'react';
import Sidenav from './Sidenav';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material'; // Use Grid for layout control
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('maxAttendees', maxAttendees);
    formData.append('image', image); // Assuming `image` is the file object
  
    try {
      const response = await axios.post('http://localhost:5000/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        setMessage('Event added successfully');
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setMaxAttendees('');
        setImage(null);
        navigate('/viewevent');
      } else {
        setMessage('Failed to add event');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the event.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidenav />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          + Add Event
        </Typography>

        {/* Event Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Event Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Attendees"
              type="number"
              variant="outlined"
              fullWidth
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button
                variant="outlined"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </Button>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Add Event
            </Button>
          </Grid>

          {/* Message Handling */}
          {message && (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color={message.includes('success') ? 'success.main' : 'error.main'}
              >
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default AddEvent;
