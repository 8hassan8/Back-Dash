const express = require('express');
const router = express.Router();

const {addContactInfo,editContactInfo, getContactInfo}=require('../controllers/contactController.js');



router.post('/addcontactInfo', addContactInfo);
router.put('/editContactInfo/:id', editContactInfo);
router.get('/getContactInfo', getContactInfo); // Get contact info


module.exports = router;