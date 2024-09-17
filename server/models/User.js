// Import Mongoose's Schema and Model constructors
const { Schema, model } = require('mongoose');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Import characterSchema to associate with users
const characterSchema = require('./Character');

// Defines the user schema
const userSchema = new Schema(
    {
        // Username field
        username: {
            type: String,       // Data type is String
            required: true,     // Field is required
            unique: true,       // Username must be unique in the database
        },
        // Email field
        email: {
            type: String,       // Data type is String
            required: true,     // Field is required
            unique: true,       // Email must be unique in the database
            match: [/.+@.+\..+/, 'Must use a valid email address'],     // Regex to ensure proper email format
        },
        // Password field
        password: {
            type: String,       // Data type is String
            required: true,     // Field is required
        },
        // Characters associated with the user, linked to the characterSchema
        characters: [characterSchema], // Array of character schemas (one-to-many relationship)
    }
);

// Middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
    // Chech if the user is new or if the password is modified
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; // Set the number of salt rounds for bcrypt
        // Hash the password with the specified salt rounds and save it
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    // Move to the next middleware or finish the process
    next();
});

// Custom method to check if the provided password is correct
userSchema.methods.isCorrectPassword = async function (password) {
    // Compare the provided with the hashed password stored in the database
    return bcrypt.compare(password, this.password);
};

// Create the User model from the user schema
const User = model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;