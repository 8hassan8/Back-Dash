import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-black py-8 text-center">
        {/* Subscribe Form */}
        <div className="footer-container max-w-4xl mx-auto flex flex-col items-center px-4">
          <form className="subscribe-form w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <p className="text-red-700 text-2xl font-bold">Subscribe for updates</p>
            <input
              type="email"
              className="bg-gray-100 rounded-full w-full md:w-80 px-6 py-2 text-base focus:outline-none"
              placeholder="Enter your email"
            />
            <button className="bg-gray-500 hover:bg-gray-700 text-red-700 font-bold py-2 px-4 rounded-full" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="footer-container max-w-4xl mx-auto mt-10">
          <div className="social-links flex justify-center space-x-10 md:space-x-20 lg:space-x-40 mt-6">
            <a href="https://facebook.com" className="text-red-700 hover:text-blue-500">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
            <a href="https://instagram.com" className="text-red-700 hover:text-pink-500">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://youtube.com" className="text-red-700 hover:text-red-500">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://twitter.com" className="text-red-700 hover:text-blue-400">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links mt-6 text-red-700">
          <ul className="space-y-2 text-center">
            <li>
              <a href="/privacy-policy" className="hover:text-gray-400 hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-gray-400 hover:underline">Terms of Service</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400 hover:underline">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div className="company-info mt-6 text-red-700">
          <p className="font-bold">Back Dash Gaming</p>
          <p>1234 Street Name, City, State, 56789</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Copyright */}
        <div className="copyright mt-6 text-red-700">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
