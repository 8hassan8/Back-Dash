import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleAddGameModal, toggleGetGamesModal, toggleGetEventsModal, toggleAddEventModal, toggleUpdateEventModal, toggleDeleteEventModal, toggleAddEditContactModal, toggleDeleteGameModal, toggleUpdateGameModal }) => {
    // State for dropdown visibility
    const [gameMenuOpen, setGameMenuOpen] = useState(false);
    const [eventMenuOpen, setEventMenuOpen] = useState(false);
    const [contactMenuOpen, setContactMenuOpen] = useState(false);

    // Toggle game dropdown
    const toggleGameMenu = () => {
        setGameMenuOpen(!gameMenuOpen);
    };

    // Toggle event dropdown
    const toggleEventMenu = () => {
        setEventMenuOpen(!eventMenuOpen);
    };

    // Toggle event dropdown
    const toggleContactMenu = () => {
        setContactMenuOpen(!contactMenuOpen);
    };

    return (
        <div className="w-64 h-screen bg-black p-4 text-white">
            <h2 className="text-2xl font-black text-red-700 border-2 border-red-700 flex justify-center">Admin Menu</h2>
            <ul className="text-xl font-bold text-red-700 mt-4">

                {/* Manage Games Dropdown */}
                <li className="mb-2">
                    <button
                        onClick={toggleGameMenu}
                        className="hover:underline"
                    >
                        Manage Games
                    </button>
                    {gameMenuOpen && (
                        <ul className="ml-4 mt-2">
                            <li className="mb-2">
                                <button
                                    onClick={toggleAddGameModal}
                                    className="hover:underline text-sm"
                                >
                                    Add Game
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleDeleteGameModal}
                                    className="hover:underline text-sm"
                                >
                                    Remove Game
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleUpdateGameModal}
                                    className="hover:underline text-sm"
                                >
                                    Update Game
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleGetGamesModal}
                                    className="hover:underline text-sm"
                                >
                                    Get Games
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Manage Events Dropdown */}
                <li className="mb-2">
                    <button
                        onClick={toggleEventMenu}
                        className="hover:underline"
                    >
                        Manage Events
                    </button>
                    {eventMenuOpen && (
                        <ul className="ml-4 mt-2">
                            <li className="mb-2">
                            <button
                                    onClick={toggleAddEventModal}
                                    className="hover:underline text-sm"
                                >
                                    Add Event
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleDeleteEventModal}
                                    className="hover:underline text-sm"
                                >
                                    Remove Event
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleUpdateEventModal}
                                    className="hover:underline text-sm"
                                >
                                    Update Event
                                </button>
                            </li>
                            <li className="mb-2">
                            <button
                                    onClick={toggleGetEventsModal}
                                    className="hover:underline text-sm"
                                >
                                    Get Events
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Manage Contact Dropdown */}
                <li className="mb-2">
                    <button
                        onClick={toggleContactMenu}
                        className="hover:underline"
                    >
                        Manage Contact
                    </button>
                    {contactMenuOpen && (
                        <ul className="ml-4 mt-2">
                            <li className="mb-2">
                            <button
                                    onClick={toggleAddEditContactModal}
                                    className="hover:underline text-sm"
                                >
                                    Add / Edit Contact Info
                                </button>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/remove-event" className="hover:underline text-sm">
                                    Remove Contact Info
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/get-events" className="hover:underline text-sm">
                                    Get Contact Info
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
