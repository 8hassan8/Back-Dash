import React, { useState} from "react";
import axios from "axios";

const UpdateGame = ({ closeModal }) => {
    const [titleInput, setTitleInput] = useState(""); // For the initial title input
    const [gameData, setGameData] = useState({
        title: "",
        description: "",
        image: "",
    });
    const [selectedFileName, setSelectedFileName] = useState(""); // Show selected file name
    const [gameFound, setGameFound] = useState(false); // Track if game was found
    const [loading, setLoading] = useState(false); // To handle loading state for fetching game data
    const [error, setError] = useState(""); // Error handling

    // Fetch game data by title when the title is submitted
    const handleTitleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.get(`http://localhost:5000/api/games/getGame/${titleInput}`);
            const { title, description, image } = res.data;
            setGameData({
                title,
                description,
                image, // The image is in Base64 format
            });
            setSelectedFileName(image ? "Current Image" : "");
            setGameFound(true);
        } catch (err) {
            console.error("Error fetching game:", err);
            setError("Game not found. Please enter a valid title.");
            setGameFound(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setGameData({ ...gameData, image: files[0] });
            setSelectedFileName(files[0]);
        } else {
            setGameData({ ...gameData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", gameData.title);
        formData.append("description", gameData.description);
        if (gameData.image) {
            formData.append("image", gameData.image);
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/games/updateGame/${gameData.title}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Game updated:", res.data);
            closeModal();
        } catch (err) {
            console.error("Error updating game:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700">Update Game</h2>

                {/* Form to enter the game title */}
                {!gameFound && (
                    <form onSubmit={handleTitleSubmit} className="mt-4">
                        <input
        name="titleInput"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        placeholder="Enter Game Title"
        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
    />
    <div className="flex space-x-4">
        <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Fetch Game
        </button>
        <button
            type="button"
            onClick={closeModal} // Call closeModal to close the form
            className="bg-gray-400 text-white p-2 rounded"
        >
            Cancel
        </button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
                    </form>
                )}

                {/* Form to update the game, visible only if game is found */}
                {gameFound && (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            name="title"
                            value={gameData.title}
                            onChange={handleChange}
                            placeholder="Game Title"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                            disabled
                        />
                        <input
                            name="description"
                            value={gameData.description}
                            onChange={handleChange}
                            placeholder="Game Description"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="block w-full p-2 mb-4 text-white"
                        />
                        {selectedFileName && (
                            <div className="flex items-center mb-4">
                                <p className="text-red-700 ">{selectedFileName.name || selectedFileName}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setGameData({ ...gameData, image: "" });
                                        setSelectedFileName("");
                                    }}
                                    className="text-red-700"
                                >
                                    ✖️
                                </button>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Update Game
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-400 text-white p-2 rounded ml-4"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateGame;
