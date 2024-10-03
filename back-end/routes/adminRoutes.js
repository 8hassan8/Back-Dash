const express = require('express');
const router = express.Router();

const {adminSignUp, adminLogin}=require('../controllers/adminController');



router.post('/adminSignUp', adminSignUp);
router.post('/adminLogin', adminLogin);


module.exports = router;