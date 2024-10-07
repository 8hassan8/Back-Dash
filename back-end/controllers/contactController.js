const ContactInfo = require('../models/ContactInfo'); // Assuming you have a ContactInfo model

// Function to add contact information
const addContactInfo = async (req, res) => {
  try {
    const { phone, email, address, socialLinks, mapUrl } = req.body;

    // Log incoming data to debug
    console.log('Contact info data received:', { phone, email, address, socialLinks, mapUrl });

    // Create new contact info entry
    const newContactInfo = new ContactInfo({ phone, email, address, socialLinks, mapUrl });
    await newContactInfo.save();

    res.status(201).json({ message: 'Contact information added successfully!', contactInfo: newContactInfo });
  } catch (error) {
    console.error('Error adding contact information:', error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to edit existing contact information
const editContactInfo = async (req, res) => {
  const { id } = req.params; // Assuming the contact info has an ID to edit
  const { phone, email, address, socialLinks, mapUrl } = req.body;

  try {
    // Log incoming data to debug
    console.log('Editing contact info data received:', { id, phone, email, address, socialLinks, mapUrl });

    // Find contact info by ID and update it
    const updatedContactInfo = await ContactInfo.findByIdAndUpdate(
      id,
      { phone, email, address, socialLinks, mapUrl },
      { new: true } // Return the updated document
    );

    if (!updatedContactInfo) {
      return res.status(404).json({ message: 'Contact information not found.' });
    }

    res.status(200).json({ message: 'Contact information updated successfully!', contactInfo: updatedContactInfo });
  } catch (error) {
    console.error('Error editing contact information:', error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
};
// Function to get contact information
const getContactInfo = async (req, res) => {
    try {
      // Fetch the contact information (assuming you only have one contact record)
      const contactInfo = await ContactInfo.findOne(); // Fetches the first document it finds
  
      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact information not found.' });
      }
  
      res.status(200).json(contactInfo);
    } catch (error) {
      console.error('Error fetching contact information:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports = { addContactInfo, editContactInfo, getContactInfo };
