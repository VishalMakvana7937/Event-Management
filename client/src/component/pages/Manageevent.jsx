import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Sidenav from './Sidenav';

export const Manageevent = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setMessage('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  // Open the edit dialog with the selected event data
  const handleEdit = (event) => {
    setCurrentEvent(event);
    setUpdatedEvent({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0], // Format date for input
      location: event.location,
      maxAttendees: event.maxAttendees,
    });
    setOpenEditDialog(true);
  };

  // Update the event in the backend
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/events/${currentEvent._id}`, updatedEvent);
      if (response.status === 200) {
        setMessage('Event updated successfully');
        // Update the event list after editing
        setEvents(events.map((ev) => (ev._id === currentEvent._id ? response.data : ev)));
        setOpenEditDialog(false);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setMessage('Failed to update event');
    }
  };
  
  const handleDelete = async (id) => {
    try {
      console.log("Event ID to delete:", id); // Add this log to check the ID
      const response = await axios.delete(`http://localhost:5000/events/${id}`);
      if (response.status === 200) {
        setMessage('Event deleted successfully');
        setEvents(events.filter((ev) => ev._id !== id));
      }
    } catch (error) {
      console.error('Error deleting event:', error.response || error.message);
      setMessage('Failed to delete event');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidenav />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Manage Events
        </Typography>

        {/* Message Handling */}
        {message && (
          <Typography variant="body1" color="error.main" gutterBottom>
            {message}
          </Typography>
        )}

        {/* Event Cards */}
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card>
                {event.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/${event.image}`} // Assuming images are served from the backend
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
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => handleEdit(event)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 1 }} onClick={() => handleDelete(event._id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Edit Event Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <DialogContentText>Update the event details below:</DialogContentText>
            <TextField
              margin="dense"
              label="Title"
              fullWidth
              value={updatedEvent.title}
              onChange={(e) => setUpdatedEvent({ ...updatedEvent, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={updatedEvent.description}
              onChange={(e) => setUpdatedEvent({ ...updatedEvent, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              value={updatedEvent.date}
              onChange={(e) => setUpdatedEvent({ ...updatedEvent, date: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={updatedEvent.location}
              onChange={(e) => setUpdatedEvent({ ...updatedEvent, location: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Max Attendees"
              type="number"
              fullWidth
              value={updatedEvent.maxAttendees}
              onChange={(e) => setUpdatedEvent({ ...updatedEvent, maxAttendees: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Manageevent;
