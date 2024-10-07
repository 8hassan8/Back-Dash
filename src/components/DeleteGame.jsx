import React, { useState } from "react";
import axios from "axios";

const DeleteGame = ({ closeModal }) => {
    const [gameTitle, setGameTitle] = useState(""); // Title of the game to delete
    const [gameInfo, setGameInfo] = useState(null); // Store fetched game information
    const [confirmDelete, setConfirmDelete] = useState(false); // State for confirming deletion
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading

    const handleChange = (e) => {
        setGameTitle(e.target.value); // Update gameTitle with the input value
    };

    const fetchGameInfo = async (title) => {
        setLoading(true); // Set loading to true
        setError(""); // Clear any previous error messages

        try {
            const res = await axios.get(`http://localhost:5000/api/games/getGame/${title}`);
            console.log("Fetched game info:", res.data); // Log the fetched data
            setGameInfo(res.data); // Set the game information
            setConfirmDelete(true); // Set confirmation state to true after fetching info
        } catch (err) {
            console.error("Error fetching game info:", err);
            setGameInfo(null); // Clear gameInfo if error occurs
            setError("Game not found or an error occurred. Please check the title."); // Set error message
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmDelete && gameInfo) {
            try {
                const res = await axios.delete("http://localhost:5000/api/games/removeGame", {
                    data: { title: gameTitle },
                });
                console.log("Game deleted:", res.data);
                closeModal(); // Close the modal after successful deletion
            } catch (err) {
                console.log("Error deleting game:", err);
            }
        } else {
            fetchGameInfo(gameTitle); // Fetch game info if not confirmed
        }
    };

    const handleCancel = () => {
        setGameTitle(""); // Clear the input field
        setGameInfo(null); // Clear the game info
        setConfirmDelete(false); // Reset confirmation state
        setError(""); // Clear any error messages
        closeModal(); // Close the modal
    };

    // Utility function to convert buffer to Base64 Data URL
    const getBase64Image = (buffer, contentType) => {
        if (!buffer) return ''; // Return an empty string if the buffer is undefined
        return `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`; // Convert buffer to Base64
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700">
                    {confirmDelete ? "Confirm Deletion" : "Delete a Game"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {!confirmDelete ? (
                        <>
                            <input
                                name="gameTitle"
                                value={gameTitle}
                                onChange={handleChange}
                                placeholder="Enter Game Title to Delete"
                                className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Get Game Info
                            </button>
                        </>
                    ) : (
                        <>
                           {gameInfo && (
                                <div className="mb-4">
                                <p className="font-bold">Game Title: {gameInfo.title}</p>
                                <p>Description: {gameInfo.description}</p>
                            {gameInfo.image && (
                        <img
                            src={`data:${gameInfo.contentType};base64,${gameInfo.image}`} // Use the Base64 string directly
                            alt={gameInfo.title}
                            className="w-24 h-24 mb-2 object cover"
                            />
                            )}
                        <p>Are you sure you want to delete the game with the above details?</p>
                        </div>
                            )}
                            <button
                                type="submit"
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Confirm Deletion
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel} // Cancel and close the modal
                                className="bg-gray-400 text-white p-2 rounded ml-4"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </form>
                {loading && <p className="text-yellow-500">Loading...</p>} {/* Loading state */}
                {error && <p className="text-red-500">{error}</p>} {/* Error message */}
            </div>
        </div>
    );
    
};

export default DeleteGame;
