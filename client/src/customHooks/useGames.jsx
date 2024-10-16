// src/hooks/useGames.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/games/getGames');
                setGames(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return { games, loading, error };
};

export default useGames;
