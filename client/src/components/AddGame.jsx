import React, { useState } from "react";
import axios from "axios";

const AddGame = ( { closeModal }) => {
    const [gameData, setGameData]= useState({
        title: "",
        description: "",
        image: ""});

    const [selectedFileName, setSelectedFileName] = useState("");


    const handleChange= (e)=> {
        const { name, value, files } = e.target; // Destructure the target's name, value, and files
        if (name === "image") {
            setGameData({ ...gameData, image: files[0] }); // Store the first file
            setSelectedFileName(files[0]);
        } else {
            setGameData({ ...gameData, [name]: value });
        }
    }

    const handleSubmit= async (e)=> {
        e.preventDefault();
        const formData = new FormData(); // Create a new FormData object
        formData.append('title', gameData.title); // Append title
        formData.append('description', gameData.description); // Append description
        formData.append('image', gameData.image); // Append the image file
        try {
            const res= await axios.post("http://localhost:5000/api/games/addGame",  formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                },});
                console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700">Add a New Game</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        name="title"
                        onChange={handleChange}
                        placeholder="Game Title"
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="description"
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
                            <p className="text-red-700 ">{selectedFileName.name}</p> {/* Show the file name */}
                            <button
                                type="button"
                                onClick={() => {
                                    setGameData({ ...gameData, image: "" }); // Reset the image in gameData
                                    setSelectedFileName(""); // Reset the selectedFileName
                                    }}
                                className="text-red-700" // Style the cross button as needed
                                >
                            ✖️ {/* Cross icon/button */}
                            </button>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Add Game
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-400 text-white p-2 rounded ml-4"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddGame;