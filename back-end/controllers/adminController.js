const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto = require('crypto');

const adminSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Admin Already Exists' });
    }

    // Create new admin user without manual hashing
    const newAdmin = new User({
      name,
      email,
      password,  // This will be hashed automatically via the schema's pre-save hook
      role: 'admin'  // Ensure the role is 'admin'
    });

    await newAdmin.save();  // Password will be hashed automatically

    const payload = {
      user: {
        id: newAdmin._id,  // Use newAdmin here
        role: newAdmin.role  // Include role to distinguish admin
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

      console.log(user.password, password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Check if the user is an admin
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Not an Admin' });
      }
  
      // Create and send token for admin
      const payload = { user: { id: user._id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };
  


module.exports = {
  adminLogin,  // Export the admin login function
  adminSignUp  // Export the admin sign-up function
};
