import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import AddGame from '../components/AddGame'; // A new modal component
import AddEvent from '../components/AddEvent';
import AddEditContactInfo from '../components/AddEditContactInfo';
import DeleteGame from '../components/DeleteGame';
import UpdateGame from '../components/UpdateGame';
import GetGames from '../components/GetGames';
import UpdateEvent from '../components/UpdateEvent';
import DeleteEvent from '../components/DeleteEvent';
import GetEvents from '../components/GetEvents';

const AdminDashboard = () => {
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
    const [showGetGamesModal, setShowGetGamesModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showAddEditContactModal, setShowAddEditContactModal] = useState(false);
    const [showUpdateGameModal,  setShowUpdateGameModal] = useState(false);
    const [showUpdateEventModal,  setShowUpdateEventModal] = useState(false);
    const [showDeleteEventModal,  setShowDeleteEventModal] = useState(false);
    const [showGetEventsModal, setShowGetEventsModal] = useState(false);

    const toggleAddGameModal = () => {
        console.log("Modal State:", !showAddGameModal); // Debugging state
        setShowAddGameModal(!showAddGameModal);
    };

    const toggleDeleteGameModal = () => {
        console.log("Modal State:", !showDeleteGameModal); // Debugging state
        setShowDeleteGameModal(!showDeleteGameModal);
    };

    const toggleUpdateGameModal = () => {
        console.log("Modal State:", !showUpdateGameModal); // Debugging state
        setShowUpdateGameModal(!showUpdateGameModal);
    };

    const toggleUpdateEventModal = () => {
        console.log("Modal State:", !showUpdateEventModal); // Debugging state
        setShowUpdateEventModal(!showUpdateEventModal);
    };

    const toggleDeleteEventModal = () => {
        console.log("Modal State:", !showDeleteEventModal); // Debugging state
        setShowDeleteEventModal(!showDeleteEventModal);
    };

    const toggleGetGamesModal = () => {
        console.log("Modal State:", !showGetGamesModal); // Debugging state
        setShowGetGamesModal(!showGetGamesModal);
    };

    const toggleGetEventsModal = () => {
        console.log("Modal State:", !showGetEventsModal); // Debugging state
        setShowGetEventsModal(!showGetEventsModal);
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
            <Sidebar toggleAddGameModal={toggleAddGameModal} toggleDeleteEventModal={toggleDeleteEventModal} toggleUpdateGameModal={toggleUpdateGameModal} toggleUpdateEventModal={toggleUpdateEventModal} toggleGetGamesModal={toggleGetGamesModal} toggleGetEventsModal={toggleGetEventsModal} toggleDeleteGameModal={toggleDeleteGameModal} toggleAddEventModal={toggleAddEventModal} toggleAddEditContactModal={toggleAddEditContactModal}/>
            {showAddEventModal && <AddEvent closeModal={toggleAddEventModal} />}
            {showAddGameModal && <AddGame closeModal={toggleAddGameModal} />}
            {showDeleteGameModal && <DeleteGame closeModal={toggleDeleteGameModal} />}
            {showUpdateGameModal && <UpdateGame closeModal={toggleUpdateGameModal} />}
            {showUpdateEventModal && <UpdateEvent closeModal={toggleUpdateEventModal} />}
            {showDeleteEventModal && <DeleteEvent closeModal={toggleDeleteEventModal} />}
            {showGetGamesModal && <GetGames closeModal={toggleGetGamesModal} />}
            {showGetEventsModal && <GetEvents closeModal={toggleGetEventsModal} />}
            {showAddEditContactModal && <AddEditContactInfo closeModal={toggleAddEditContactModal} />}
        </div>
    );
};

export default AdminDashboard;