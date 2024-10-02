const mongoose = require('mongoose');

// Define Event Schema
const eventSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    location: { type: String },
    maxAttendees: { type: Number },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create Event Model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
