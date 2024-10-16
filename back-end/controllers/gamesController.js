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

const getGameByTitle = async (req, res) => {
    const { title } = req.params; // Get the title from the request parameters
    try {
        const game = await Games.findOne({ title }); // Find the game by title
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        
        // Return just the image buffer as a Base64 string and content type
        return res.status(200).json({
            _id: game._id,
            title: game.title,
            description: game.description,
            image: game.image.toString('base64'), // Convert buffer to Base64 string here
            contentType: 'image/jpeg', // Change to the actual content type if needed
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateGame = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const { title } = req.params; // Get the title from the request parameters
        const { description } = req.body; // Get the description from the request body

        try {
            let game = await Games.findOne({ title });
            if (!game) {
                return res.status(404).json({ message: "Game does not exist" });
            }

            // Update the description if provided
            if (description) {
                game.description = description;
            }

            // Update the image if a new image is provided
            if (req.file) {
                game.image = req.file.buffer; // Store the new image as a buffer
                game.contentType = req.file.mimetype; // Update content type
            }

            await game.save(); // Save the updated game
            return res.status(200).json({ message: "Game updated successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};


const removeGame = async (req, res) => {
    const { title } = req.body; // Get the title from the request body

    try {
        let game = await Games.findOne({ title });
        if (game) {
            await Games.deleteOne({ title });
            return res.status(200).json({ message: "Game deleted successfully" }); // Changed to 200 for success
        } else {
            return res.status(404).json({ message: "Game does not exist" }); // Changed to 404 for not found
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
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
    removeGame,
    getGameByTitle,
    updateGame,
    getGames
};
