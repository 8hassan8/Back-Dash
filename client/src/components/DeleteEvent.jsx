import React, { useState } from "react";
import axios from "axios";

const DeleteEvent = ({ closeModal }) => {
    const [eventTitle, setEventTitle] = useState(""); // Title of the event to delete
    const [dateInput, setDateInput] = useState(""); // For the date input
    const [eventInfo, setEventInfo] = useState(null); // Store fetched event information
    const [confirmDelete, setConfirmDelete] = useState(false); // State for confirming deletion
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading

    const handleChange = (e) => {
        setEventTitle(e.target.value); // Update eventTitle with the input value
    };

    const handleDateChange = (e) => {
        setDateInput(e.target.value); // Update dateInput with the input value
    };

    const fetchEventInfo = async () => {
        setLoading(true); // Set loading to true
        setError(""); // Clear any previous error messages

        try {
            const res = await axios.get("http://localhost:5000/api/events/getEvent", {
                params: { title: eventTitle, date: dateInput },  // Send the title and date as query params
            });
            console.log("Fetched event info:", res.data); // Log the fetched data
            setEventInfo(res.data); // Set the event information
            setConfirmDelete(true); // Set confirmation state to true after fetching info
        } catch (err) {
            console.error("Error fetching event info:", err);
            setEventInfo(null); // Clear eventInfo if error occurs
            setError("Event not found or an error occurred. Please check the title and date."); // Set error message
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmDelete && eventInfo) {
            try {
                const res = await axios.delete("http://localhost:5000/api/events/removeEvent", {
                    data: { title: eventTitle, date: dateInput }, // Send both title and date for deletion
                });
                console.log("Event deleted:", res.data);
                closeModal(); // Close the modal after successful deletion
            } catch (err) {
                console.log("Error deleting event:", err);
                setError("Error occurred while deleting the event. Please try again."); // Display error message
            }
        } else {
            fetchEventInfo(); // Fetch event info if not confirmed
        }
    };

    const handleCancel = () => {
        setEventTitle(""); // Clear the input field
        setDateInput(""); // Clear the date input
        setEventInfo(null); // Clear the event info
        setConfirmDelete(false); // Reset confirmation state
        setError(""); // Clear any error messages
        closeModal(); // Close the modal
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700">
                    {confirmDelete ? "Confirm Deletion" : "Delete an Event"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {!confirmDelete ? (
                        <>
                            <input
                                name="eventTitle"
                                value={eventTitle}
                                onChange={handleChange}
                                placeholder="Enter Event Title to Delete"
                                className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                                required
                            />
                            <input
                                type="date"
                                value={dateInput}
                                onChange={handleDateChange}
                                className="block w-full p-2 mb-4 border border-red-700 bg-gray-800 text-white rounded"
                                required
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Get Event Info
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal} // Call closeModal to close the form
                                    className="bg-gray-400 text-white p-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {eventInfo && (
                                <div className="mb-4">
                                    <p className="font-bold">Event Title: {eventInfo.title}</p>
                                    <p>Description: {eventInfo.description}</p>
                                    <p>Game: {eventInfo.game}</p>
                                    <p>Location: {eventInfo.location}</p>
                                    <p>Time: {eventInfo.time}</p>
                                    {eventInfo.image && (
                                        <img
                                            src={`data:${eventInfo.contentType};base64,${eventInfo.image}`} // Use the Base64 string directly
                                            alt={eventInfo.title}
                                            className="w-24 h-24 mb-2 object-cover"
                                        />
                                    )}
                                    <p>Are you sure you want to delete the event with the above details?</p>
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

export default DeleteEvent;
