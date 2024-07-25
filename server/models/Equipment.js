const { Schema } = require('mongoose');

const equipmentSchema = new Schema(
    {
        equipmentName: {
            type: String,
            required: true,
        },
        equipmentType: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Weight',
            },
        },
        strengthReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Strength Requirement',
            },
        },
        dexterityReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Dexterity Requirement',
            },
        },
        intelligenceReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Intelligence Requirement',
            },
        },
        faithReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Faith Requirement',
            },
        },
        arcaneReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Arcane Requirement',
            },
        },
        special: {
            type: String,
        }
    }
);

module.exports = equipmentSchema;
