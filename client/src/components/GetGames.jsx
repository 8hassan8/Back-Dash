import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateGame from "./UpdateGame"; // Assuming you have this modal for editing

const GetGames = ({ closeModal }) => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null); // For edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle edit modal
    const [isConfirmDelete, setIsConfirmDelete] = useState(false); // Show confirmation modal
    const [gameToDelete, setGameToDelete] = useState(null); // Game to delete

    // Fetch games from backend on component mount
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/games/getGames");
                setGames(res.data);
            } catch (err) {
                console.error("Error fetching games:", err);
            }
        };
        fetchGames();
    }, []);

    // Handle delete game
    const handleDelete = async () => {
        if (!gameToDelete) return;

        console.log("Deleting game with title:", gameToDelete.title); // Debugging
        try {
            await axios.delete("http://localhost:5000/api/games/removeGame", { data: { title: gameToDelete.title } });
            setGames(games.filter(game => game.title !== gameToDelete.title)); // Remove the deleted game from the state
            setIsConfirmDelete(false); // Close the confirmation modal
        } catch (err) {
            console.error("Error deleting game:", err);
        }
    };

    // Show confirmation modal
    const showConfirmDelete = (game) => {
        setGameToDelete(game);
        setIsConfirmDelete(true);
    };

    // Close confirmation modal
    const closeConfirmDelete = () => {
        setIsConfirmDelete(false);
        setGameToDelete(null);
    };

    // Open the edit modal and set the selected game
    const openEditModal = (game) => {
        setSelectedGame(game);
        setIsEditModalOpen(true);
    };

    // Close the edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedGame(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-4/5 md:w-3/5 lg:w-2/5 rounded-lg relative">
                {/* Close button to close the entire GetGames modal */}
                <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-500">
                    X
                </button>

                <h2 className="text-2xl font-bold text-red-700 mb-4">All Games</h2>

                <div className="space-y-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 p-2">Title</th>
                                <th className="border-b-2 p-2">Description</th>
                                <th className="border-b-2 p-2">Image</th>
                                <th className="border-b-2 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game._id}>
                                    <td className="border-b p-2">{game.title}</td>
                                    <td className="border-b p-2">{game.description}</td>
                                    <td className="border-b p-2">
                                        <img
                                            src={`data:image/jpeg;base64,${game.image}`}
                                            alt={game.title}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                    <td className="border-b p-2">
                                        <button
                                            onClick={() => openEditModal(game)}
                                            className="text-blue-600 p-1 mr-2"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => showConfirmDelete(game)}
                                            className="text-red-600 p-1"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Edit modal */}
                    {isEditModalOpen && selectedGame && (
                        <UpdateGame game={selectedGame} closeModal={closeEditModal} />
                    )}

                    {/* Confirmation Modal */}
                    {isConfirmDelete && gameToDelete && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 w-4/5 md:w-3/5 lg:w-2/5 rounded-lg relative">
                                <h3 className="text-xl font-bold text-red-700 mb-4">Are you sure you want to delete this game?</h3>
                                <div className="mb-4">
                                    <p>Title: {gameToDelete.title}</p>
                                    <p>Description: {gameToDelete.description}</p>
                                    <img
                                        src={`data:image/jpeg;base64,${gameToDelete.image}`}
                                        alt={gameToDelete.title}
                                        className="w-16 h-16 object-cover mt-2"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={closeConfirmDelete}
                                        className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetGames;
