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
            validate: {
                validator: Number.isInteger,
                message: `{Value} is not an integer value for Vigor`,
            }
        },
        mind: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Mind`,
        },
        endurance: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Endurance`,
        },
        strength: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Strength`,
        },
        dexterity: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Dexterity`,
        },
        intelligence: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Intelligence`,
        },
        faith: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Faith`,
        },
        arcane: {
            type: Number,
            validate: Number.isInteger,
            message: `{Value} is not an integer value for Arcane`,
        },
        equipment: [equipmentSchema]
    }
);

module.exports = characterSchema;