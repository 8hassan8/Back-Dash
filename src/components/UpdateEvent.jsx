import React, { useState} from "react";
import axios from "axios";

const UpdateEvent = ({ closeModal }) => {
    const [titleInput, setTitleInput] = useState(""); 
    const [dateInput, setDateInput] = useState(""); 
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        game: "",
        date: "",
        time: "",
        location: "",
        image: "",
    });
    const [selectedFileName, setSelectedFileName] = useState(""); 
    const [eventFound, setEventFound] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 
    const [selectedImageUrl, setSelectedImageUrl] = useState(""); 

    const handleTitleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const res = await axios.get("http://localhost:5000/api/events/getEvent", {
                params: { title: titleInput, date: dateInput }
            });
    
            const { title, description, game, date, time, location, image } = res.data;
            setEventData({
                title,
                description,
                game,
                date: new Date(date).toISOString().split("T")[0], 
                time,
                location,
                image, 
            });

            // If image exists, set the selected image URL
            if (image) {
                // Check if the image is a valid Base64 string and set it as the image source
                const imageUrl = image.startsWith('data:image') ? image : `data:image/png;base64,${image}`;
                setSelectedImageUrl(imageUrl); // This should be either the image URL or Base64 string
                setSelectedFileName(image ? "Current Image" : "");
            } else {
                setSelectedFileName(""); // No image available
            }

            setEventFound(true);
        } catch (err) {
            console.error("Error fetching event:", err);
            setError("Event not found. Please enter valid title and date.");
            setEventFound(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setEventData({ ...eventData, image: files[0] });
            setSelectedFileName(files[0].name);
            setSelectedImageUrl(URL.createObjectURL(files[0])); 
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", eventData.title);
        formData.append("description", eventData.description);
        formData.append("game", eventData.game);
        formData.append("date", eventData.date);
        formData.append("time", eventData.time);
        formData.append("location", eventData.location);
        if (eventData.image) {
            formData.append("image", eventData.image);
        }

        try {
            const res = await axios.put(
                "http://localhost:5000/api/events/updateEvent",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Event updated:", res.data);
            closeModal();
        } catch (err) {
            console.error("Error updating event:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl colored-red-700 font-bold mb-4">Update Event</h2>

                {!eventFound && (
                    <form onSubmit={handleTitleSubmit} className="mt-4">
                        <input
                            name="titleInput"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            placeholder="Enter Event Title"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            name="dateInput"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            type="date"
                            placeholder="Enter Event Date"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Fetch Event
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-400 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                )}

                {eventFound && (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            placeholder="Event Title"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                            disabled
                        />
                        <input
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            placeholder="Event Description"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            name="game"
                            value={eventData.game}
                            onChange={handleChange}
                            placeholder="Game"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            type="date"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            type="time"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        <input
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                        />
                        
                        {/* Display the current image or selected file preview */}
                        <div className="mb-4">
                            {selectedImageUrl ? (
                                <img
                                    src={selectedImageUrl}
                                    alt="Event"
                                    className="w-32 h-32 object-cover rounded" 
                                />
                            ) : (
                                <p>No image selected</p>
                            )}
                        </div>

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="block w-full p-2 mb-4 text-white"
                        />

                        {selectedFileName && (
                            <div className="flex items-center mb-4">
                                <p className="text-red-700">{selectedFileName}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Update Event
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded ml-4"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateEvent;
