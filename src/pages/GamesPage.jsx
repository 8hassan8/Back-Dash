import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GamesPage = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
            const response = await axios.get('http://localhost:5000/api/games/getGames')
            const data = response.data
            setGames(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    };
    fetchGames()
    console.log(games)
    }, [])
  return (
    <div>
        {games.map((game) => (
            <div className='flex flex-col game border-2 border-red-700 rounded-lg bg-black text-red-700 items-center justify-center' key={game._id}>
                <h2 className='text-4xl my-2 font-black'>{game.title}</h2>
                <p className='text-2xl mb-2 font-black'>{game.description}</p>
                <div className='relative flex'>
                 <img className='' src={`data:image/jpeg;base64,${game.image}`} alt={game.title} />
                 
                <button className='absolute bottom-2 bg-gray-50 bg-opacity-25 left-1/2 transform -translate-x-1/2 border-2 border-red-700 text-red-700 font-black text-5xl px-4 py-4 rounded-xl shadow-lg hover:bg-red-100 hover:scale-110 hover:shadow-2xl transition-all duration-300'>
                    Book Your Slot
                </button>
                </div> 
            </div>
        ))}
    </div>

  )
}

export default GamesPage