const express = require('express');
const router = express.Router();

const {addGame,getGames}=require('../controllers/gamesController.js');



router.post('/addGame', addGame);
router.get('/getGames', getGames);


module.exports = router;