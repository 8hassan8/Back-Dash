import React, { useState, useEffect } from "react";
import axios from "axios";

const GetEvents = ({ closeModal }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // For edit form
    const [isConfirmDelete, setIsConfirmDelete] = useState(false); // Show confirmation modal
    const [eventToDelete, setEventToDelete] = useState(null); // Event to delete
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // To toggle edit form modal
    const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // Store image preview URL

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/events/getEvents");
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, []);

    // Handle event deletion
    const handleDelete = async () => {
        if (!eventToDelete) return;

        try {
            await axios.delete("http://localhost:5000/api/events/removeEvent", {
                data: { title: eventToDelete.title, date: eventToDelete.date }
            });
            setEvents(events.filter(event => event._id !== eventToDelete._id)); // Remove deleted event from state
            setIsConfirmDelete(false); // Close confirmation modal
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    // Show confirmation modal for delete
    const showConfirmDelete = (event) => {
        setEventToDelete(event);
        setIsConfirmDelete(true);
    };

    const closeConfirmDelete = () => {
        setIsConfirmDelete(false);
        setEventToDelete(null);
    };

    // Handle event update
    const handleUpdateEvent = async (e) => {
        e.preventDefault();

        if (!selectedEvent) return;

        try {
            const formData = new FormData();
            formData.append('title', selectedEvent.title);
            formData.append('date', selectedEvent.date);
            formData.append('description', selectedEvent.description);
            formData.append('game', selectedEvent.game);
            formData.append('time', selectedEvent.time);
            formData.append('location', selectedEvent.location);

            // Add image to formData if selected
            if (selectedEvent.image) {
                formData.append('image', selectedEvent.image);
            }

            await axios.put("http://localhost:5000/api/events/updateEvent", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update events in state after successful update
            setEvents(events.map(event =>
                event._id === selectedEvent._id
                    ? { ...event, ...selectedEvent }
                    : event
            ));

            setIsEditModalOpen(false); // Close edit modal
            setSelectedEvent(null); // Clear selected event
            setImagePreviewUrl(""); // Clear image preview
        } catch (err) {
            console.error("Error updating event:", err);
        }
    };

    // Handle input change in the form
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files[0]) {
            const file = files[0];
            
            // Create a FileReader to read the image file as a Base64 string
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1]; // Get Base64 string without "data:image/jpeg;base64,"
                
                // Update the selectedEvent state with the Base64 image
                setSelectedEvent({ ...selectedEvent, image: base64Image });
                setImagePreviewUrl(URL.createObjectURL(file)); // Generate and store image preview URL
            };
            
            reader.readAsDataURL(file); // Convert the image to Base64
        } else {
            setSelectedEvent({ ...selectedEvent, [name]: value });
        }
    };

    // Open the edit modal and set the selected event
    const openEditModal = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
        if (event.image) {
            setImagePreviewUrl(`data:image/jpeg;base64,${event.image}`);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
        setImagePreviewUrl(""); // Clear image preview when closing the modal
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 w-4/5 md:w-3/5 lg:w-3/5 rounded-lg relative overflow-y-auto max-h-[90vh]">
                    <button onClick={closeModal} className="absolute top-2 right-2 font-black text-xl text-red-700">
                        X
                    </button>

                    <h2 className="text-2xl font-bold text-red-700 mb-4">All Events</h2>

                    <div className="space-y-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b-2 p-2">Title</th>
                                    <th className="border-b-2 p-2">Description</th>
                                    <th className="border-b-2 p-2">Game</th>
                                    <th className="border-b-2 p-2">Location</th>
                                    <th className="border-b-2 p-2">Date</th>
                                    <th className="border-b-2 p-2">Time</th>
                                    <th className="border-b-2 p-2">Image</th>
                                    <th className="border-b-2 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event._id}>
                                        <td className="border-b p-2">{event.title}</td>
                                        <td className="border-b p-2">{event.description}</td>
                                        <td className="border-b p-2">{event.game}</td>
                                        <td className="border-b p-2">{event.location}</td>
                                        <td className="border-b p-2">{event.date}</td>
                                        <td className="border-b p-2">{event.time}</td>
                                        <td className="border-b p-2">
                                            <img
                                                src={`data:image/jpeg;base64,${event.image}`}
                                                alt={event.title}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="border-b p-2">
                                            <button
                                                onClick={() => openEditModal(event)}
                                                className="text-blue-600 p-1 mr-2"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => showConfirmDelete(event)}
                                                className="text-red-600 p-1"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Event Form Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 w-4/5 md:w-3/5 lg:w-3/5 rounded-lg relative overflow-y-auto max-h-[80vh]">
                        <button
                            onClick={closeEditModal}
                            className="absolute top-2 right-2 text-xl text-red-700"
                        >
                            X
                        </button>

                        <h3 className="text-xl font-bold text-red-700 mb-4">Edit Event</h3>

                        <form onSubmit={handleUpdateEvent}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={selectedEvent.title}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={selectedEvent.description}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Game</label>
                                <input
                                    type="text"
                                    name="game"
                                    value={selectedEvent.game}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={selectedEvent.date}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={selectedEvent.time}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={selectedEvent.location}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                                {imagePreviewUrl && (
                                    <img
                                        src={imagePreviewUrl}
                                        alt="Image Preview"
                                        className="mt-2 w-32 h-32 object-cover"
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update Event
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-lg font-semibold text-red-700">
                            Are you sure you want to delete this event?
                        </p>
                        <div className="mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-4"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={closeConfirmDelete}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GetEvents;
