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

    const [updatedCharacterData, setUpdatedCharacterData] = useState({
        characterName: '',
        vigor: '',
        mind: '',
        endurance: '',
        strength: '',
        dexterity: '',
        intelligence: '',
        faith: '',
        arcane: ''
    });

    const [equipmentData, setEquipmentData] = useState({
        equipmentName: '',
        equipmentType: '',
        weight: '',
        strengthReq: '',
        dexterityReq: '',
        intelligenceReq: '',
        faithReq: '',
        arcaneReq: '',
        special: ''
    });

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

    /*const handleInputChange = (event, setStateFunction) => {
        const { name, value } = event.target;
        setStateFunction(prevState => ({
            ...prevState,
            [name]: value
        }));
    }; */

    const parseCharacterData = (data) => ({
        ...data,
        vigor: parseInt(data.vigor, 10) || 0,
        mind: parseInt(data.mind, 10) || 0,
        endurance: parseInt(data.endurance, 10) || 0,
        strength: parseInt(data.strength, 10) || 0,
        dexterity: parseInt(data.dexterity, 10) || 0,
        intelligence: parseInt(data.intelligence, 10) || 0,
        faith: parseInt(data.faith, 10) || 0,
        arcane: parseInt(data.arcane, 10) || 0,
    });

    const parseEquipmentData = (data) => ({
        ...data,
        weight: parseInt(data.weight, 10) || 0,
        strengthReq: parseInt(data.strengthReq, 10) || 0,
        dexterityReq: parseInt(data.dexterityReq, 10) || 0,
        intelligenceReq: parseInt(data.intelligenceReq, 10) || 0,
        faithReq: parseInt(data.faithReq, 10) || 0,
        arcaneReq: parseInt(data.arcaneReq, 10) || 0,
    });

    const [addCharacter] = useMutation(ADD_CHARACTER);
    const [updateCharacter] = useMutation(UPDATE_CHARACTER);
    const [removeCharacter] = useMutation(REMOVE_CHARACTER);
    const [addEquipment] = useMutation(ADD_EQUIPMENT);
    const [removeEquipment] = useMutation(REMOVE_EQUIPMENT);

    const handleCharacterSubmit = async function (newCharacterData) {
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

    const handleUpdatedCharacterSubmit = async function (updatedCharacterData) {
        event.preventDefault();
        try {
            const { data } = await updateCharacter({
                variables: { ...updatedCharacterData }
            });
            console.log(data);
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
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEquipmentSubmit = async function (characterId, equipmentData) {
        event.preventDefault();
        try {
            const { data } = await addEquipment({
                variables: { characterId, ...equipmentData }
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveEquipment = async function (characterId, EquipmentId) {
        event.preventDefault();
        try {
            const { data } = await removeEquipment({
                variables: { characterId, EquipmentId }
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

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