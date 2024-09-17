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
        strengthScale: {
            type: String,
            default: "-"
        },
        dexterityReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Dexterity Requirement',
            },
        },
        dexterityScale: {
            type: String,
            default: "-"
        },
        intelligenceReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Intelligence Requirement',
            },
        },
        intelligenceScale: {
            type: String,
            default: "-"
        },
        faithReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Faith Requirement',
            },
        },
        faithScale: {
            type: String,
            default: "-"
        },
        arcaneReq: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer for Arcane Requirement',
            },
        },
        arcaneScale: {
            type: String,
            default: "-"
        },
        ashOfWar : {
            type: String,
        },
        special: {
            type: String,
        }
    }
);

module.exports = equipmentSchema;
