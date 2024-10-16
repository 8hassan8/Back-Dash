const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // 'image' is the form field


const signUpUser = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: 'File upload failed' });
        }

        const { name, email, password } = req.body;
        console.log("Request Body:", req.body);

        console.log("File Info:", req.file);

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User Already Exists' });
            }

            // Create a new user object with the image (if provided)
            user = new User({
                name,
                email,
                password,
                role: 'user',
                image: req.file ? req.file.buffer : undefined, // Save image as a buffer if it's uploaded
            });

            // Save the new user
            await user.save();

            // Create a JWT payload
            const payload = {
                user: {
                    id: user._id,
                },
            };

            // Sign and return the JWT
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ token });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Server Error');
        }
    });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"})

        }

        const payload = {

            user: {

                id: user._id,
                email: user.email

        }

    }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'});

        res.status(200).json({
            message: 'Login Success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image ? user.image.toString('base64') : undefined,
            }
        });

    }

    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Fetch user data by ID, excluding password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image ? user.image.toString('base64') : undefined, // Convert image to base64 if present
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    signUpUser,
    loginUser,
    getUserProfile
};