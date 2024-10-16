import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEditContactInfo = ({ closeModal }) => {
    const [contactId, setContactId] = useState(null); // Declare contactId here
    const [contactData, setContactData] = useState({
        phone: '',
        email: '',
        address: '',
        googleMapLocation: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
    });

    useEffect(() => {
        const fetchExistingContact = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact/getContactInfo');
                if (response.data) {
                    setContactId(response.data._id); // Set contactId if data exists
                    setContactData({
                        phone: response.data.phone || '',
                        email: response.data.email || '',
                        address: response.data.address || '',
                        googleMapLocation: response.data.googleMapLocation || '',
                        facebook: response.data.socialLinks?.facebook || '',
                        twitter: response.data.socialLinks?.twitter || '',
                        instagram: response.data.socialLinks?.instagram || '',
                        youtube: response.data.socialLinks?.youtube || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchExistingContact();
    }, []); // Only run once, on component mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (contactId) {
                // Edit existing contact
                await axios.put(`http://localhost:5000/api/contact/editContactInfo/${contactId}`, contactData);
            } else {
                // Add new contact
                await axios.post('http://localhost:5000/api/contact/addContactInfo', contactData);
            }
            closeModal(); // Close the modal after submitting
        } catch (error) {
            console.error('Error saving contact info:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700">{contactId ? 'Edit Contact Info' : 'Add Contact Info'}</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        name="phone"
                        value={contactData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="address"
                        value={contactData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="googleMapLocation"
                        value={contactData.googleMapLocation}
                        onChange={handleChange}
                        placeholder="Google Map Location"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="facebook"
                        value={contactData.facebook}
                        onChange={handleChange}
                        placeholder="Facebook Link"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="twitter"
                        value={contactData.twitter}
                        onChange={handleChange}
                        placeholder="Twitter Link"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="instagram"
                        value={contactData.instagram}
                        onChange={handleChange}
                        placeholder="Instagram Link"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="youtube"
                        value={contactData.youtube}
                        onChange={handleChange}
                        placeholder="YouTube Link"
                        className="block w-full p-2 mb-2 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <button
                        type="submit"
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        {contactId ? 'Update Contact' : 'Add Contact'}
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-400 text-white p-2 rounded ml-4"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditContactInfo;
