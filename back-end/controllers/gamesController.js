const Games = require('../models/Games');
const multer = require('multer');

// Set up multer storage (in memory so you can store it as a buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');  // 'image' is the field name in the form-data

const addGame = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const { title, description } = req.body;

        try {
            let game = await Games.findOne({ title });
            if (game) {
                return res.status(400).json({ message: "Game already exists" });
            }

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({ message: "Image is required" });
            }

            // Create the new game with buffered image data
            game = new Games({
                title,
                description,
                image: req.file.buffer  // Store the image as a buffer
            });

            await game.save();
            return res.status(201).json({ message: "Game added successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};

const getGames = async (req, res) => {
    try {
        const games = await Games.find();
        const gamesWithImages = games.map(game => ({
            ...game._doc,
            image: game.image.toString('base64') // Convert image buffer to base64 string
        }));
        return res.status(200).json(gamesWithImages);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    };

module.exports = {
    addGame,
    getGames
};
