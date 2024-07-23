const { Schema } = require('mongoose');

const equipmentSchema = new Schema(
    {
        equipmentName: {
            type: String,
            required: true,
        },
        equipmentType: {
            type: String,
            require: true,
        },
        strengthReq: {
            type: Number,
            require: true,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Strength Requirement`,
        },
        dexterityReq: {
            type: Number,
            require: true,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Dexterity Requirement`,
        },
        intelligenceReq: {
            type: Number,
            require: true,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Intelligence Requirement`,
        },
        faithReq: {
            type: Number,
            require: true,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Faith Requirement`,
        },
        arcaneReq: {
            type: Number,
            require: true,
            validate: Number.isInteger,
            message: `{Value} is not an integer for Arcane Requirement`,
        }
    }
);

export default equipmentSchema;