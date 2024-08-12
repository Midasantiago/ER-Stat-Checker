import React, { useState, useEffect } from 'react';
//import { Redirect } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import {
    ADD_CHARACTER,
    UPDATE_CHARACTER,
    REMOVE_CHARACTER,
    ADD_EQUIPMENT,
    REMOVE_EQUIPMENT
} from '../utils/mutations';
import Auth from '../utils/auth';
import Header from '../components/header';

const Account = () => {

    const [userData, setUserData] = useState({});

    const [showModal, setShowModal] = useState(false);

    const [newCharacterName, setNewCharacterName] = useState('');

    const { loading, data } = useQuery(QUERY_ME);

    useEffect(() => {
        if (!loading && data && data.me) {
            setUserData(data.me);
        }
    }, [loading, data]);

    // Login Check. If fails, redirects to login page
    const isLoggedIn = Auth.loggedIn();
    if (!isLoggedIn) {
        window.location.replace('/');
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        setNewCharacterName(event.target.value);
    };

    const [addCharacter] = useMutation(ADD_CHARACTER);
    const [removeCharacter] = useMutation(REMOVE_CHARACTER);

    const handleCharacterSubmit = async function () {
        event.preventDefault();
        try {
            const { data } = await addCharacter({ variables: { characterName: newCharacterName } });
            const newCharacter = data.addCharacter;
            setUserData((prevState) => ({
                ...prevState,
                characters: [...prevState.characters, newCharacter],
            }));
            setNewCharacterName('');
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveCharacter = async function (characterId) {
        event.preventDefault();
        console.log(characterId);
        try {
            const { data } = await removeCharacter({
                variables: { characterId }
            });
            setUserData((prevState) => ({
                ...prevState,
                characters: prevState.characters.filter(
                    (character) => character._id !== characterId
                ),
            }));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCharacterClick = (characterId) => {
        window.location.replace(`/character/${characterId}`);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Your Characters</h1>
                {userData.characters && userData.characters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userData.characters.map((character) => (
                            <div key={character._id} className="bg-gray-800 p-4 rounded shadow">
                                <h2 className="text-xl font-bold text-white">{character.characterName}</h2>
                                <button
                                    onClick={() => handleCharacterClick(character._id)} // Set up navigation on click
                                    className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleRemoveCharacter(character._id)}
                                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No characters found.</p>
                )}
                <div>
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleOpenModal}
                    >
                        Create New Character
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-black text-xl font-bold mb-4">Create New Character</h2>
                        <form onSubmit={handleCharacterSubmit}>
                            <input
                                type="text"
                                name="characterName"
                                value={newCharacterName}
                                onChange={handleInputChange}
                                placeholder="Character Name"
                                className="border border-gray-300 p-2 rounded w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account;