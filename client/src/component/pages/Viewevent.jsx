import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import Sidenav from './Sidenav';

export const Viewevent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events
      } catch (error) {
        console.error('Error fetching events:', error);
        setMessage('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  // Unified filter method
  const filterEvents = () => {
    const filtered = events.filter(event => {
      const matchesDate = date ? new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
      const matchesLocation = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesEventType = eventType ? event.type.toLowerCase() === eventType.toLowerCase() : true;

      return matchesDate && matchesLocation && matchesEventType;
    });

    setFilteredEvents(filtered);
  };

  // Handle input changes and filter events
  const handleDateChange = (e) => {
    setDate(e.target.value);
    filterEvents();
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    filterEvents();
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    filterEvents();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          View Events
        </Typography>

        {message && (
          <Typography variant="body1" color="error.main" gutterBottom>
            {message}
          </Typography>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={handleDateChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Location"
            value={location}
            onChange={handleLocationChange}
            sx={{ mr: 2 }}
          />
          <TextField
            select
            label="Event Type"
            value={eventType}
            onChange={handleEventTypeChange}
            sx={{ width: 200 }}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="workshop">Workshop</MenuItem>
            <MenuItem value="seminar">Seminar</MenuItem>
            <MenuItem value="conference">Conference</MenuItem>
          </TextField>
        </Box>

        <Grid container spacing={3}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card>
                  {event.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000/${event.image}`}
                      alt={event.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Date: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Max Attendees: {event.maxAttendees}
                    </Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No events found.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Viewevent;
