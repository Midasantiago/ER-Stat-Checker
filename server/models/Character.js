const { Schema } = require('mongoose');

const equipmentSchema = require('./Equipment'); 

const characterSchema = new Schema(
    {
        characterName: {
            type: String,
            required: true,
        },
        vigor: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Vigor',
            },
        },
        mind: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Mind',
            },
        },
        endurance: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Endurance',
            },
        },
        strength: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Strength',
            },
        },
        dexterity: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Dexterity',
            },
        },
        intelligence: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Intelligence',
            },
        },
        faith: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Faith',
            },
        },
        arcane: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for Arcane',
            },
        },
        equipment: [equipmentSchema]
    }
);

module.exports = characterSchema;
