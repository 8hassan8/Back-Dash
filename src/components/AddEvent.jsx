import React, { useState } from "react";
import axios from "axios";
import useGames from "../customHooks/useGames";

const AddEvent = ( { closeModal }) => {
    const [eventData, setEventData]= useState({
        title: "",
        description: "",
        game: "",
        date:"",
        time: "",
        location: "",
        image: ""});

    const [selectedFileName, setSelectedFileName] = useState("");


    const { games } = useGames();


    const handleChange= (e)=> {
        const { name, value, files } = e.target; // Destructure the target's name, value, and files
        if (name === "image") {
            setEventData({ ...eventData, image: files[0] }); // Store the first file
            setSelectedFileName(files[0]);
        } else {
            setEventData({ ...eventData, [name]: value });
        }
        console.log(name, value);
    }

    const handleSubmit= async (e)=> {
        e.preventDefault();
        const formData = new FormData(); // Create a new FormData object
        formData.append('title', eventData.title); // Append title
        formData.append('description', eventData.description); // Append description
        formData.append('image', eventData.image); // Append the image file
        formData.append('date', eventData.date); // Append the date
        formData.append('time', eventData.time); // Append the time
        formData.append('location', eventData.location); // Append the location
        formData.append('game', eventData.game); // Append the game

        try {
            const res= await axios.post("http://localhost:5000/api/events/addEvent",  formData, {
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
                        placeholder="Event Title"
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        name="description"
                        onChange={handleChange}
                        placeholder="Event Description"
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <select 
                        name="game" 
                        onChange={handleChange} 
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    >
                        <option value="">Select a game</option>
                            {games.map(game => (
                            <option key={game._id} value={game.title}>{game.title}</option>
                            ))}
                    </select>
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        type="time"
                        name="time"
                        onChange={handleChange}
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        type="text"
                        name="location"
                        onChange={handleChange}
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                    />
                   {selectedFileName && (
                        <div className="flex items-center mb-4">
                            <p className="text-red-700 ">{selectedFileName.name}</p> {/* Show the file name */}
                            <button
                                type="button"
                                onClick={() => {
                                    setEventData({ ...eventData, image: "" }); // Reset the image in gameData
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
                        Add Event
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

export default AddEvent;