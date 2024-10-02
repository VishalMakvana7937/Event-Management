const Event = require("../models/eventmodel");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Create Event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, maxAttendees } = req.body;

        // Check if all fields are provided
        if (!title || !description || !date || !location || !maxAttendees) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the image is provided
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Create a new event
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            image: req.file.path 
        });

        // Save the event
        await newEvent.save();

        // Respond with the created event
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, description, date, location, maxAttendees } = req.body;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Update fields if provided
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.maxAttendees = maxAttendees || event.maxAttendees;

        // If a new image is uploaded, update it
        if (req.file) {
            event.image = req.file.path;
        }

        // Save updated event
        const updatedEvent = await event.save();

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Log the event ID
        console.log("Deleting event with ID:", eventId);

        // Find event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Log the found event
        console.log("Found event:", event);

        // If the event has an associated image, delete the image file
        if (event.image) {
            const imagePath = path.join(__dirname, '..', event.image);
            if (fs.existsSync(imagePath)) {
                console.log("Deleting image at:", imagePath); // Log image deletion
                fs.unlinkSync(imagePath); // Delete the image file
            }
        }

        // Delete the event from the database
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createEvent, getEvents, upload, updateEvent, deleteEvent  };
