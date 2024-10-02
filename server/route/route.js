const express = require('express');
const router = express.Router();
const controllers = require('../controller/controller');

// Existing routes
router.get('/', controllers.Home);
router.post('/register', controllers.Register);
router.post('/login', controllers.Login);


const eventControllers = require('../controller/eventcontroller');

router.post('/events', eventControllers.upload.single('image'), eventControllers.createEvent);
router.get('/events', eventControllers.getEvents);
router.put('/events/:id', eventControllers.upload.single('image'), eventControllers.updateEvent);
router.delete('/events/:id', eventControllers.deleteEvent);

module.exports = router;
