const express = require('express');
const router = express.Router();

const {addGame,getGames, getGameByTitle,removeGame, updateGame}=require('../controllers/gamesController.js');



router.post('/addGame', addGame);
router.get('/getGames', getGames);
router.delete('/removeGame', removeGame);
router.get('/getGame/:title', getGameByTitle);
router.put('/updateGame/:title', updateGame);


module.exports = router;