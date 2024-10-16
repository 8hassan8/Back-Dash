const express = require('express');
const router = express.Router();

const {addEvent,getEvents, removeEvent, getEvent, updateEvent}=require('../controllers/eventsController.js');



router.post('/addEvent', addEvent);
router.get('/getEvents', getEvents);
router.delete('/removeEvent', removeEvent);
router.get('/getEvent', getEvent);
router.put('/updateEvent', updateEvent);


module.exports = router;