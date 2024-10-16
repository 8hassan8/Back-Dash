const express = require('express');
const router = express.Router();
const userAuthMiddleware = require('../middleware/userAuth');

const {loginUser, signUpUser, getUserProfile}=require('../controllers/userController');


router.post('/login',loginUser);
router.post('/signUp',signUpUser);
router.get('/profile',userAuthMiddleware,getUserProfile);


module.exports = router;