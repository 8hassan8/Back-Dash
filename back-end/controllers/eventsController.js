const Events = require('../models/Events');
const multer = require('multer');

// Set up multer storage (in memory so you can store it as a buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');  // 'image' is the field name in the form-data

const addEvent = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const { title, description, date, time, location, game } = req.body;

        try {

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({ message: "Image is required" });
            }

            // Create the new event with buffered image data
           const event = new Events({
                title,
                description,
                date,
                game,
                time,
                location,
                image: req.file.buffer  // Store the image as a buffer
            });

            await event.save();
            return res.status(201).json({ message: "Event added successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};

const getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        const eventsWithImages = events.map(event => ({
            ...event._doc,
            image: event.image.toString('base64') // Convert image buffer to base64 string
        }));
        return res.status(200).json(eventsWithImages);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    };

module.exports = {
    addEvent,
    getEvents
};
