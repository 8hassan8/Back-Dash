import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import AddGame from '../components/AddGame'; // A new modal component
import AddEvent from '../components/AddEvent';
import AddEditContactInfo from '../components/AddEditContactInfo';
import DeleteGame from '../components/DeleteGame';

const AdminDashboard = () => {
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showAddEditContactModal, setShowAddEditContactModal] = useState(false);

    const toggleAddGameModal = () => {
        console.log("Modal State:", !showAddGameModal); // Debugging state
        setShowAddGameModal(!showAddGameModal);
    };

    const toggleDeleteGameModal = () => {
        console.log("Modal State:", !showDeleteGameModal); // Debugging state
        setShowDeleteGameModal(!showDeleteGameModal);
    };

    const toggleAddEventModal = () => {
        console.log("Modal State:", !showAddEventModal); // Debugging state
        setShowAddEventModal(!showAddEventModal);
    };

    const toggleAddEditContactModal = () => {
        console.log("Modal State:", !showAddEditContactModal); // Debugging state
        setShowAddEditContactModal(!showAddEditContactModal);
    };

    return (
        <div className="flex flex-col bg-black min-h-screen">
            <div className="flex-1 p-6">
                <h1 className="text-3xl flex justify-center font-bold text-red-700">
                    Welcome to the Admin Dashboard
                </h1>
            </div>
            <Sidebar toggleAddGameModal={toggleAddGameModal} toggleDeleteGameModal={toggleDeleteGameModal} toggleAddEventModal={toggleAddEventModal} toggleAddEditContactModal={toggleAddEditContactModal}/>
            {showAddEventModal && <AddEvent closeModal={toggleAddEventModal} />}
            {showAddGameModal && <AddGame closeModal={toggleAddGameModal} />}
            {showDeleteGameModal && <DeleteGame closeModal={toggleDeleteGameModal} />}
            {showAddEditContactModal && <AddEditContactInfo closeModal={toggleAddEditContactModal} />}
        </div>
    );
};

export default AdminDashboard;