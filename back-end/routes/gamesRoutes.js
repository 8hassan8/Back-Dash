const express = require('express');
const router = express.Router();

const {addGame,getGames, getGameByTitle,removeGame}=require('../controllers/gamesController.js');



router.post('/addGame', addGame);
router.get('/getGames', getGames);
router.delete('/removeGame', removeGame);
router.get('/getGame/:title', getGameByTitle);


module.exports = router;