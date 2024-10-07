import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
            const response = await axios.get('http://localhost:5000/api/events/getEvents')
            const data = response.data
            setEvents(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    };
    fetchEvents()
    console.log(events)
    }, [])
  return (
    <div>
            {events.map((event) => (
                <div 
                    className='game border-2 border-red-700 rounded-lg bg-black text-red-700 my-0 p-4' 
                    key={event._id}
                >
                    {/* Event Title */}
                    <h2 className='text-8xl mb-4 font-black text-center'>{event.title}</h2>

                    {/* Flex container for image and details */}
                    <div className='flex items-center justify-between'>
                        {/* Event Image */}
                        <img 
                            className='w-1/2 h-auto rounded-lg border-2 border-red-700' 
                            src={`data:image/jpeg;base64,${event.image}`} 
                            alt={event.title} 
                        />

                        {/* Event Details */}
                        <div className='w-1/2 flex flex-col justify-center pl-6'>
                            <p className='text-2xl mb-4 font-black'>{event.game}</p>
                            <p className='text-2xl mb-4 font-black'>{event.description}</p>
                            <p className='text-lg mb-2'>Date: {new Date(event.date).toDateString()}</p>
                            <p className='text-lg mb-4'>Time: {event.time}</p>
                            <p className='text-lg mb-4'>Location: {event.location}</p>

                            {/* Book Slot Button */}
                            <button className='bg-gray-10 bg-opacity-25 border-2 border-red-700 text-red-700 font-black text-2xl px-6 py-2 rounded-xl shadow-lg hover:bg-red-100 hover:scale-105 hover:shadow-2xl transition-all duration-300'>
                                Register Yourself
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

  )
}

export default EventsPage