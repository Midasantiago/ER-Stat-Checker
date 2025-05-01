import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CHARACTER } from "../utils/queries";
import {
    UPDATE_CHARACTER,
    ADD_EQUIPMENT,
    REMOVE_EQUIPMENT
}
    from "../utils/mutations";
import Auth from "../utils/auth";
import Header from "../components/header";
import DecBtn from "../components/buttons/decBtn";
import IncBtn from "../components/buttons/incBtn";
import EquipmentTypes from "../components/EquipmentTypes";
import DemoCharacter from "../utils/demoCharacter";

const Character = () => {

    // Extract character ID from the URL parameters
    const { id } = useParams();

    //Check wether to skip query
    const skipQuery = !id;

    // Fetch character data using GraphQL query
    const { loading, data } = useQuery(QUERY_CHARACTER, {
        variables: { characterId: id },
        skip: skipQuery
    });

    // Login Check. If fails, redirects to login page
    const isLoggedIn = Auth.loggedIn();
    /*if (!isLoggedIn) {
        window.location.replace('/');
    }; */

    if (id == 'demo' && isLoggedIn) {
        Auth.logout();
        window.location.replace('/');
    };

    if (id !== 'demo' && !isLoggedIn) {
        window.location.replace('/');
    }

    // GraphQL mutations for updating character, adding equipment, and removing equipment
    const [updateCharacter] = useMutation(UPDATE_CHARACTER);
    const [addEquipment] = useMutation(ADD_EQUIPMENT);
    const [removeEquipment] = useMutation(REMOVE_EQUIPMENT);

    // Modal toggle for equipment input
    const [showEquipInputModal, setShowEquipInputModal] = useState(false);

    // State for tracking updates to character stats
    const [updatedCharacterData, setUpdatedCharacterData] = useState({
        characterName: '',
        vigor: 0,
        mind: 0,
        endurance: 0,
        strength: 0,
        dexterity: 0,
        intelligence: 0,
        faith: 0,
        arcane: 0
    });

    // State for equipment input form
    const [equipmentData, setEquipmentData] = useState({
        equipmentName: '',
        equipmentType: '',
        weight: 0,
        strengthReq: 0,
        strengthScale: '-',
        dexterityReq: 0,
        dexterityScale: '-',
        intelligenceReq: 0,
        intelligenceScale: '-',
        faithReq: 0,
        faithScale: '-',
        arcaneReq: 0,
        arcaneScale: '-',
        ashOfWar: '',
        special: ''
    });

    const resetEquipmentForm = () => setEquipmentData({
        equipmentName: '',
        equipmentType: '',
        weight: 0,
        strengthReq: 0,
        strengthScale: '-',
        dexterityReq: 0,
        dexterityScale: '-',
        intelligenceReq: 0,
        intelligenceScale: '-',
        faithReq: 0,
        faithScale: '-',
        arcaneReq: 0,
        arcaneScale: '-',
        ashOfWar: '',
        special: ''
    });

    const [demoCharacter, setDemoCharacter] = useState(null);

    // Notification state for success/failure messages
    const [notification, setNotification] = useState('');

    // Populate character state with fetched data
    useEffect(() => {
        if (isLoggedIn && data && data.character) {
            setUpdatedCharacterData({
                characterName: data.character.characterName,
                vigor: data.character.vigor,
                mind: data.character.mind,
                endurance: data.character.endurance,
                strength: data.character.strength,
                dexterity: data.character.dexterity,
                intelligence: data.character.intelligence,
                faith: data.character.faith,
                arcane: data.character.arcane
            });
        }

        if (!isLoggedIn) {
            setDemoCharacter(new DemoCharacter())
        }
    }, [data, isLoggedIn]);

    // Open and close modal handlers
    const handleOpenEquipInputModal = () => {
        setShowEquipInputModal(true);
    };

    const handleCloseEquipInputModal = () => {
        setShowEquipInputModal(false);
    };

    // Handle input changes to character stats form
    const handleCharacterInputChange = (event, setStateFunction) => {
        const { name, value } = event.target;
        const numericValue = parseInt(value, 10) || 0; // Convert to number or default to 0
        setUpdatedCharacterData(prevState => ({
            ...prevState,
            [name]: numericValue
        }));
    };

    // Handle input changes to equipment form
    const handleEquipmentInput = (event) => {
        const { name, value, type } = event.target;

        let newValue;
        if (type === 'number') {
            newValue = parseInt(value, 10) || 0; //Convert to number or default to 0
        } else {
            newValue = value;
        }

        setEquipmentData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    // Submit updated character stats to server
    const handleUpdatedCharacterSubmit = async function (event) {
        event.preventDefault();
        if (isLoggedIn) {
            try {
                const { data } = await updateCharacter({
                    variables: {
                        characterId: id,
                        characterData: updatedCharacterData
                    }
                });
                console.log(data);
                setNotification('character data saved successfully');
                setTimeout(() => setNotification(''), 3000); // Clear notification
            } catch (error) {
                console.error(error);
            }
        } else {
            setNotification('DEMO CHARACTER DATA CAN NOT BE SAVED!');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    // Submit new equipment to server
    const handleEquipmentSubmit = async function (event) {
        event.preventDefault();
        if (!isLoggedIn) {
            const demoEquipmentWithId = {
                ...equipmentData,
                _id: crypto.randomUUID()  // Add a unique ID
            };

            setDemoCharacter(prevCharacter => ({
                ...prevCharacter,
                equipment: [...prevCharacter.equipment, demoEquipmentWithId]
            }));

            // Optionally reset modal and form here too
            setShowEquipInputModal(false);
            resetEquipmentForm();
            setNotification('Demo equipment added! (This Item Will Not Persist!)');
            setTimeout(() => setNotification(''), 3000);

            return;
        }
        try {
            const { data } = await addEquipment({
                variables: {
                    characterId: id,
                    equipmentData: equipmentData
                }
            });
            console.log(data);
            setNotification('Equipment added Successfully!');
            setTimeout(() => setNotification(''), 3000);

            // Reset modal and equipment form after submission
            setShowEquipInputModal(false);
            resetEquipmentForm();
        } catch (error) {
            console.error(error);
        }
    };

    // Remove equipment from character
    const handleRemoveEquipment = async function (equipmentId) {
        if (!isLoggedIn) {
            setDemoCharacter(prevCharacter => ({
                ...prevCharacter,
                equipment: prevCharacter.equipment.filter(item => item._id !== equipmentId)
            }));
            return;
        }
        try {
            const { data } = await removeEquipment({
                variables: {
                    characterId: id,
                    equipmentId: equipmentId
                }
            });
            console.log(data);
            setNotification('Equipment removed successfully!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const updateStat = (field, delta) => {
        if (!isLoggedIn) {
            setDemoCharacter(prev => ({
                ...prev,
                [field]: Math.max(0, prev[field] + delta)
            }));
        }
        setUpdatedCharacterData(prev => ({
            ...prev,
            [field]: Math.max(0, prev[field] + delta)
        }));
    };

    const handleIncrement = (field) => updateStat(field, 1);
    const handleDecrement = (field) => updateStat(field, -1);

    // Loading and error handling
    if (loading) return <div>Loading...</div>;
    //if (!data) return <div> No data found</div>

    // Extract character data from query
    const character = isLoggedIn ? data?.character : demoCharacter;

    // Calculate player level as sum of all stats
    let playerLevel = character
        ? character.vigor + character.mind + character.endurance + character.strength + character.dexterity + character.intelligence + character.faith + character.arcane
        : 0;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {/* App Header */}
            <Header isLoggedIn={isLoggedIn} />

            {/* Character name and player level */}
            <div className="mb-4 mt-4">
                <h1 className="text-3xl font-bold mb-2">
                    {character.characterName}
                    {!isLoggedIn && (
                        <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold ml-2 px-2 py-1 rounded uppercase">
                            Demo Mode
                        </span>
                    )}
                </h1>
                <h2 className="text-xl font-medium text-gray-400">Player Level: <span className="text-blue-400">{playerLevel}</span></h2>
            </div>
            <div className="flex">
                {/* Left Column: Character Stat Editing Form */}
                <div className="flex-1 mr-4">
                    <form onSubmit={handleUpdatedCharacterSubmit}>
                        <div className="space-y-4">
                            {/* Map through each stat and render input controls with increment/decrement buttons */}
                            {[
                                'vigor', 'mind', 'endurance', 'strength', 'dexterity',
                                'intelligence', 'faith', 'arcane'
                            ].map(stat => (
                                <div key={stat} className="flex items-center">
                                    <h3 className="font-semibold mb-1 w-32">{capitalizeFirstLetter(stat)}:</h3>
                                    <div className="flex items-center flex-grow">
                                        {/* Decrement Button */}
                                        <DecBtn handleDecrement={() => handleDecrement(stat)} />

                                        {/* Input for stat value */}
                                        <input
                                            type="number"
                                            name={stat}
                                            value={updatedCharacterData[stat]}
                                            onChange={(event) => handleCharacterInputChange(event, setUpdatedCharacterData)}
                                            className="w-12 text-center border border-gray-300 rounded mx-2"
                                        />

                                        {/* Increment Button */}
                                        <IncBtn handleIncrement={() => handleIncrement(stat)} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Save Button */}
                        <div className="mt-4">
                            {isLoggedIn ? (
                                <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                            ) :
                            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                                Sign Up or Login to Save Character
                            </button>
                            }

                        </div>
                    </form>
                </div>

                {/* Right Column: Equipment Section */}
                <div className="flex-1">
                    <h2 className="text-lg font-bold mt-4">Equipment</h2>

                    {/* Display equipment if any are found */}
                    {character.equipment && character.equipment.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {character.equipment.map((equip) => (
                                <div key={equip._id.toString()} className="bg-gray-800 p-3 rounded-lg shadow-lg">
                                    <div>
                                        <h3 className="text-lg font-semibold">{equip.equipmentName}</h3>
                                        <p className="text-gray-400 text-sm">{equip.equipmentType}</p>

                                        {/* Remove equipment button */}
                                        <button
                                            onClick={() => handleRemoveEquipment(equip._id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 text-xs mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Display stat requirements with conditional coloring */}
                                    <div className="flex mt-2">
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-gray-400">STR</p>
                                            <p className={`text-sm font-bold ${updatedCharacterData.strength >= equip.strengthReq ? 'text-green-500' : 'text-red-500'}`}>
                                                {equip.strengthReq}
                                            </p>
                                            <p>{equip.strengthScale} </p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-gray-400">DEX</p>
                                            <p className={`text-sm font-bold ${updatedCharacterData.dexterity >= equip.dexterityReq ? 'text-green-500' : 'text-red-500'}`}>
                                                {equip.dexterityReq}
                                            </p>
                                            <p>{equip.dexterityScale} </p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-gray-400">INT</p>
                                            <p className={`text-sm font-bold ${updatedCharacterData.intelligence >= equip.intelligenceReq ? 'text-green-500' : 'text-red-500'}`}>
                                                {equip.intelligenceReq}
                                            </p>
                                            <p>{equip.intelligenceScale} </p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-gray-400">FAI</p>
                                            <p className={`text-sm font-bold ${updatedCharacterData.faith >= equip.faithReq ? 'text-green-500' : 'text-red-500'}`}>
                                                {equip.faithReq}
                                            </p>
                                            <p>{equip.faithScale} </p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-gray-400">ARC</p>
                                            <p className={`text-sm font-bold ${updatedCharacterData.arcane >= equip.arcaneReq ? 'text-green-500' : 'text-red-500'}`}>
                                                {equip.arcaneReq}
                                            </p>
                                            <p>{equip.arcaneScale} </p>
                                        </div>
                                    </div>

                                    {/* Display special properties of the equipment */}
                                    <p className="text-xs mt-2">{equip.ashOfWar}</p>
                                    <p className="text-xs mt-2">{equip.special}</p>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <p>No equipment found. Add your first equipment!</p>
                    )}

                    {/* Add Equipment Button */}
                    <div>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            onClick={handleOpenEquipInputModal}
                        >
                            Add Equipment
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Equipment */}
            {showEquipInputModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-black text-xl font-bold mb-4">Add Your Equipment</h2>
                        <form onSubmit={handleEquipmentSubmit}>
                            {/* Equipment name input */}
                            <input
                                type="text"
                                name="equipmentName"
                                value={equipmentData.equipmentName}
                                onChange={handleEquipmentInput}
                                placeholder="Equipment Name"
                                className="border border-gray-300 p-2 rounded w-full mb-4"
                            />

                            {/* Equipment type select */}
                            <select
                                name="equipmentType"
                                value={equipmentData.equipmentType}
                                onChange={handleEquipmentInput}
                                className="border border-gray-300 p-2 rounded w-full mb-4"
                            >
                                <EquipmentTypes />
                            </select>


                            <div className="mb-4 flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-black font-semibold mb-1">Weight</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={equipmentData.weight}
                                        onChange={handleEquipmentInput}
                                        className="w-full text-center border border-gray-300 rounded p-2"
                                    />
                                </div>
                                <div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Strength</label>
                                        <input
                                            type="number"
                                            name="strengthReq"
                                            value={equipmentData.strengthReq}
                                            onChange={handleEquipmentInput}
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Strength Scaling</label>
                                        <input
                                            type="text"
                                            name="strengthScale"
                                            value={equipmentData.strengthScale}
                                            onChange={handleEquipmentInput}
                                            placeholder="UpperCase Please"
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Dexterity</label>
                                        <input
                                            type="number"
                                            name="dexterityReq"
                                            value={equipmentData.dexterityReq}
                                            onChange={handleEquipmentInput}
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Dexterity Scaling</label>
                                        <input
                                            type="text"
                                            name="dexterityScale"
                                            value={equipmentData.dexterityScale}
                                            onChange={handleEquipmentInput}
                                            placeholder="Uppercase Please"
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Intelligence</label>
                                        <input
                                            type="number"
                                            name="intelligenceReq"
                                            value={equipmentData.intelligenceReq}
                                            onChange={handleEquipmentInput}
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Intelligence Scaling</label>
                                        <input
                                            type="text"
                                            name="intelligenceScale"
                                            value={equipmentData.intelligenceScale}
                                            onChange={handleEquipmentInput}
                                            placeholder="Uppercase Please"
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Faith</label>
                                        <input
                                            type="number"
                                            name="faithReq"
                                            value={equipmentData.faithReq}
                                            onChange={handleEquipmentInput}
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Faith Scaling</label>
                                        <input
                                            type="text"
                                            name="faithScale"
                                            value={equipmentData.faithScale}
                                            onChange={handleEquipmentInput}
                                            placeholder="Uppercase Please"
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Arcane</label>
                                        <input
                                            type="number"
                                            name="arcaneReq"
                                            value={equipmentData.arcaneReq}
                                            onChange={handleEquipmentInput}
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-black font-semibold mb-1">Arcane Scaling</label>
                                        <input
                                            type="text"
                                            name="arcaneScale"
                                            value={equipmentData.arcaneScale}
                                            onChange={handleEquipmentInput}
                                            placeholder="Uppercase Please"
                                            className="w-full text-center border border-gray-300 rounded p-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                name="special"
                                value={equipmentData.special}
                                onChange={handleEquipmentInput}
                                placeholder="Special"
                                className="border border-gray-300 p-2 rounded w-full mb-4"
                            />
                            <input
                                type="text"
                                name="ashOfWar"
                                value={equipmentData.ashOfWar}
                                onChange={handleEquipmentInput}
                                placeholder="Ash of War"
                                className="border border-gray-300 p-2 rounded w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
                                    onClick={handleCloseEquipInputModal}
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

            {notification && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
                    {notification}
                </div>
            )}
        </div>
    )
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Character;