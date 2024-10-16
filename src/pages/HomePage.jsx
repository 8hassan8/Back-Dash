import React from 'react';
import image1 from '../../src/assets/images/image1.png';
import gamesImage from '../../src/assets/images/image3.jpeg';
import gamesEventsImage from '../../src/assets/images/image9.jpeg';
import bookingImage from '../../src/assets/images/image7.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative w-full h-full">
        <img className="w-full" style={{ height: '1080px' }} src={image1} alt="" />
        <div className="absolute w-full mt-0 top-1 left-1/2 transform -translate-x-1/2 text-red-700 font-black text-xl sm:text-3xl md:text-4xl text-center">
          Welcome to Our Online Portal
        </div>
        <button className="absolute bg-gray-50 md:top-12 lg:top-12 bg-opacity-25 mt-2 top-8 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 py-2 md:py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300">
          <FontAwesomeIcon icon={faWhatsapp} size="1x" /> WhatsApp Us
        </button>
        <div className="absolute w-full bottom-2 left-1/2 transform -translate-x-1/2 text-red-700 font-black text-2xl sm:text-3xl md:text-4xl text-center">
          Book Your Slot.
        </div>
        <button className="absolute bg-gray-50 bg-opacity-25 bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 py-2 md:py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300">
          <FontAwesomeIcon icon={faPhone} size="1x" /> Call Now
        </button>
      </div>

      {/* Games Section */}
      <div className="relative w-full h-full">
        <img className="w-full" style={{ height: '720px' }} src={gamesImage} alt="" />
        <div className="w-full absolute top-2 md:top-12 left-1/2 transform -translate-x-1/2 flex justify-center px-4">
          <div className="w-full md:w-4/5 lg:w-2/3 flex flex-col justify-center items-center border-red-700 border-2 text-red-700 bg-gray-50 bg-opacity-25 p-2 md:p-4 rounded-lg shadow-md">
            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-center">
              We have a wide range of games to play. Click the button below to view all the games available.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate('/gamesPage');
          }}
          className="absolute bg-gray-50 bg-opacity-25 bottom-2 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 py-2 md:py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          Our Games
        </button>
      </div>

      {/* Events Section */}
      <div className="relative w-full h-auto">
        <img className="w-full" style={{ height: '720px' }} src={gamesEventsImage} alt="" />

        {/* Event Cards Container */}
        <div className="w-full top-2 absolute sm:top-2 lg:top-16 md:top-2 left-1/2 transform -translate-x-1/2 flex flex-col sm:space-y-2 md:space-y-4 lg:space-y-6 justify-center space-y-2 items-center px-4">
          
          {/* Event Card 1 */}
          <div className="w-full lg:h-auto md:h-auto flex md:flex-col lg:flex-col flex-row justify-center items-center h-5 sm:w-3/5 md:w-3/5 font-black text-red-700 border-red-700 border-2 bg-gray-50 bg-opacity-25 p-4 rounded-lg shadow-md">
            <h2 className="text-sm sm:text-2xl md:text-3xl text-center">Tekken 8 Tournament</h2>
            <p className="text-sm sm:text-md  md:hidden lg:block md:text-lg hidden sm:block mt-2">
              Participate in the Tekken 8 tournament and compete against other players to win exciting prizes.
            </p>
            <p className="text-sm sm:text-xl md:text-2xl my-2 text-center">Date: 20th September, 2024</p>
          </div>

          {/* Event Card 2 */}
          <div  className="w-full lg:h-auto md:h-auto flex md:flex-col lg:flex-col flex-row justify-center items-center h-5 sm:w-3/5 md:w-3/5 font-black text-red-700 border-red-700 border-2 bg-gray-50 bg-opacity-25 p-4 rounded-lg shadow-md">
            <h2 className="text-sm sm:text-2xl md:text-3xl text-center">PUBG Tournament</h2>
            <p className="text-sm sm:text-md md:text-lg md:hidden lg:block hidden sm:block mt-2">
              Be part of the PUBG tournament and compete against other players to win exciting prizes.
            </p>
            <p className="text-sm sm:text-xl md:text-2xl my-2 text-center">Date: 20th September, 2024</p>
          </div>
        </div>

        {/* View All Events Button */}
        <div className="absolute bottom-2 sm:bottom-2 lg:bottom-12 md:bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 px-4 bg-gray-50 bg-opacity-25 border-2 border-red-700 text-red-700 font-bold text-lg sm:text-xl md:text-2xl py-2 md:py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        onClick={() => {navigate('/eventsPage');}}
        >
          <button className="lg:text-2xl text-sm font-black w-full">View All Events</button>
        </div>
      </div>

      {/* Booking Section */}
      <div className="relative w-full h-full">
        <img className="w-full " style={{ height: '720px' }} src={bookingImage} alt="" />
        <button 
        className="absolute bg-gray-50 bg-opacity-25 bottom-2 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 py-2 md:py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        onClick={() => {
          navigate('/bookingsPage');
        }}
        >
          Book Now
        </button>
        <div className="w-full absolute top-8 md:top-10 left-1/2 transform -translate-x-1/2 flex justify-center px-4">
          <div className="w-full md:w-2/5 h-auto font-black flex flex-col justify-center items-center border-red-700 border-2 text-red-700 bg-gray-50 bg-opacity-25 p-3 md:p-4 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-center">Book the Games to Play</h2>
            <p className="text-md  hidden sm:text-lg md:text-xl mt-2 text-center">
              Select a number of games to play and book your slot for a personalized gaming experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
