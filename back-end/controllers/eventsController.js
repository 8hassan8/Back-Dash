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

            // Extract the date part only (YYYY-MM-DD)
            const dateOnly = new Date(date).toISOString().split("T")[0];  // Format date as YYYY-MM-DD

            // Check if an event with the same title, game, and date already exists
            const existingEvent = await Events.findOne({ title, game, date: dateOnly });
            if (existingEvent) {
                return res.status(400).json({ message: "An event with the same title, game, and date already exists" });
            }

            // Create the new event with buffered image data
            const event = new Events({
                title,
                description,
                date: dateOnly,  // Store date as string YYYY-MM-DD
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

const updateEvent = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const { title, date, description, game, time, location } = req.body;
        console.log(req.body);
        try {
            let event = await Events.findOne({ title, date }); // Fetch using title and date from body
            if (!event) {
                return res.status(404).json({ message: "Event does not exist" });
            }

            // Update fields if provided
            if (description) {
                event.description = description;
            }

            if (game) {
                event.game = game;
            }

            if (time) {
                event.time = time;
            }

            if (location) {
                event.location = location;
            }

            // Update the image if a new image is provided
            if (req.file) {
                event.image = req.file.buffer; // Store the new image as a buffer
                event.contentType = req.file.mimetype; // Update content type
            }

            // If no new image is uploaded, don't modify the image field
            // (it will remain the same)

            await event.save(); // Save the updated event
            return res.status(200).json({ message: "Event updated successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};

const removeEvent = async (req, res) => {
    const { title,date } = req.body; // Get the title from the request body

    try {
        let event = await Events.findOne({ title, date });
        if (event) {
            await Events.deleteOne({ title, date });
            return res.status(200).json({ message: "Event deleted successfully" }); // Changed to 200 for success
        } else {
            return res.status(404).json({ message: "Event does not exist on this day" }); // Changed to 404 for not found
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getEvent = async (req, res) => {
    const { title, date } = req.query;  // Extract title and date from query parameters

    console.log("Received Title:", title);
    console.log("Received Date:", date);

    try {
        // Fetch the event from the database
        const event = await Events.findOne({ title });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Format the date to only consider the YYYY-MM-DD part for comparison
        const eventDate = new Date(event.date).toISOString().split("T")[0];
        const requestDate = new Date(date).toISOString().split("T")[0];

        if (eventDate !== requestDate) {
            return res.status(404).json({ message: "Event does not exist on this date" });
        }

        const eventWithImage = {
            ...event._doc,
            image: event.image.toString("base64"), // Convert image buffer to base64 string
        };

        return res.status(200).json(eventWithImage);
    } catch (err) {
        console.error("Error fetching event:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
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
    updateEvent,
    getEvent,
    getEvents, 
    removeEvent
};
