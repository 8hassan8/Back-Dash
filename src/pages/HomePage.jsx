import React from 'react'
import image1 from '../../src/assets/images/image1.png'
import gamesImage from '../../src/assets/images/games.webp'
import gamesEventsImage from '../../src/assets/images/gamingEventsImage.jpg'
import bookingImage from '../../src/assets/images/redPS5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate=useNavigate();
  return (
    <div className="relative">
      <div className="relative w-full h-full">
        <img className='w-full h-full' src={image1} alt="" />
        <div className='absolute mt-4 top-4 left-1/2 transform -translate-x-1/2 text-red-700 font-black text-4xl'>
        Welcome to Our Online Portal
      </div>
      <button className='absolute bg-gray-50 bg-opacity-25 mt-6 top-16 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-4xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
         <FontAwesomeIcon icon={faWhatsapp} size="1x" /> WhatsApp Us
        </button>
      
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-700 font-black text-4xl'>
        Book Your Slot.
      </div>
      <button className='absolute bg-gray-50 bg-opacity-25 bottom-16 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-4xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
      <FontAwesomeIcon icon={faPhone} size="1x" />  Call Now
        </button>
      </div>
      <div className="relative w-full h-full ">
        <img className='w-full h-full' src={gamesImage} alt="" /> 
        <div className="w-full absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-4 justify-center">
          <div className="w-4/5 h-35 flex flex-col justify-center items-center border-red-700 border-2 text-red-700 bg-gray-50 bg-opacity-25 p-0 rounded-lg shadow-md">
            <p className="text-4xl m-2 font-black text-center">We have a wide range of games to play. Click the button below to view all the games available.</p>
          </div>
        </div> 
     <button onClick={()=>{navigate('/gamesPage')}} className='absolute bg-gray-50 bg-opacity-25 bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-5xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
            Our Games
      </button>
      </div>
      <div className="relative w-full h-full ">
        <img className='w-full h-full' src={gamesEventsImage} alt="" /> 
        <div className="w-full absolute top-24 left-1/2 justify-center transform -translate-x-1/2 flex space-x-4">
          <div className="w-2/5 h-75 font-black text-red-700 border-red-700 border-2 bg-gray-50 bg-opacity-25 p-2 rounded-lg shadow-md">
            <h2 className="text-4xl ">Tekken 8 Tournamnet</h2>
            <p className="text-2xl mt-2 ">Participate in the Tekken 8 tournament and compete against other players to win exciting prizes.</p>
            <p className="text-5xl my-2">Date: 20th September, 2024</p>
          </div>
          <div className="w-2/5 h-75 font-black text-red-700 border-red-700 border-2 bg-gray-50 bg-opacity-25 p-2 rounded-lg shadow-md">
            <h2 className="text-4xl ">PUBG Tournament</h2>
            <p className='text-2xl mt-2'>Be the part of the PUBG tournament and compete against other players to win exciting prizes.</p>
            <p className="text-5xl my-2">Date: 20th September, 2024</p>
          </div>
        </div>
        <button className='absolute bg-gray-50 bg-opacity-25 bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-5xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
          View All Events
        </button>
      </div>
      <div className="relative w-full h-full ">
        <img className='w-full h-full' src={bookingImage} alt="" /> 
       <button className='absolute bg-gray-50 bg-opacity-25 bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-bold text-5xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
          Book Now
        </button>
        <div className="w-full absolute top-10 mt-2 left-1/2 transform -translate-x-1/2 flex space-x-4 justify-center">
          <div className="w-2/5 h-40 font-black flex flex-col justify-center items-center border-red-700 border-2 text-red-700 bg-gray-50 bg-opacity-25 p-4 rounded-lg shadow-md">
            <h2 className="text-4xl text-center">Book the Games to Play</h2>
            <p className="text-2xl mt-2 text-center">Select a number of games to play and book your slot for a personalized gaming experience.</p>
          </div>
        </div> 
      </div>
     </div>
  )
}

export default HomePage