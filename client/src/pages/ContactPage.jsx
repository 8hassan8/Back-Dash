// ContactPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [queryData, setQueryData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch contact information from backend
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/getContactInfo');
        setContactInfo(response.data);
      } catch (err) {
        setError('Failed to fetch contact information. Please try again later.');
        console.error(err);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/queries', queryData);
      setSuccessMessage('Your query has been sent successfully!');
      setQueryData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send your query. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-red-700">
      {/* Query Form Section */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Send Us a Query</h2>
        <form onSubmit={handleSubmit} className="bg-gray-950 p-4 rounded">
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={queryData.name}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-red-700 bg-black text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={queryData.email}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-red-700 bg-black text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={queryData.message}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-red-700 bg-black text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded bg-red-700 text-white ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Query'}
          </button>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {contactInfo ? (
          <div className="bg-gray-950 p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Contact Details</h3>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Address:</strong> {contactInfo.address}</p>

            <h3 className="text-xl font-bold mt-4 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500">Facebook</a>
              <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>
              <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">Instagram</a>
              <a href={contactInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600">YouTube</a>
            </div>

            <h3 className="text-xl font-bold mt-4 mb-2">Location</h3>
            <iframe
              title="Google Map Location"
              src={contactInfo.mapUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;