const express = require('express');
const router = express.Router();

const {addEvent,getEvents}=require('../controllers/eventsController.js');



router.post('/addEvent', addEvent);
router.get('/getEvents', getEvents);


module.exports = router;