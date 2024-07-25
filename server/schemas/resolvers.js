const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username, email }) => {
            return User.findOne({ username, email });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addCharacter: async (parent, { characterName }, context) => {
            
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            console.log("Context User: ", context.user);
            console.log("Character Name: ", characterName);

            try {

                const newCharacter = {
                    characterName
                };

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { characters: newCharacter } },
                    { new: true, runValidators: true }
                );

                console.log("Updated User: ", updatedUser);

                const addedCharacter = updatedUser.characters.find(char => char.characterName === characterName);

                if (!addedCharacter) {
                    throw new Error('Character could not be found in the updated user');
                }

                console.log("Added Character: ", addedCharacter);
                return addedCharacter;

            } catch (error) {
                console.log(error);
                throw new AuthenticationError('Failed to add character');
            }
        },
        updateCharacter: async (parent, { characterId, characterData }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }

            console.log(context.user);
            console.log(characterData, characterId);

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id, 'characters._id': characterId },
                    { $set: Object.fromEntries(Object.entries(characterData).map(([key, value]) => [`characters.$.${key}`, value])) },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw AuthenticationError;
                }

                console.log('Updated User:', updatedUser);
                console.log('Character ID: ', updatedUser.characters[0]._id);

                const updatedCharacter = updatedUser.characters.id(characterId);

                console.log(updatedCharacter);
                return updatedCharacter;
            } catch (error) {
                console.log(error);
                throw AuthenticationError;
            }
        },
        removeCharacter: async (parent, { characterId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            console.log(context.user);
            console.log(characterId);

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { characters: { _id: characterId } } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new AuthenticationError('Character not found or you do not have permission to delete it');
                }

                console.log(updatedUser);
                return updatedUser;
            } catch (error) {
                console.log(error);
                throw new AuthenticationError('Failed to delete character');
            }
        },
        addEquipment: async (parent, { characterId, equipmentData }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            console.log(context.user);
            console.log(characterId, equipmentData);

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id, 'characters._id': characterId },
                    { $push: { 'characters.$.equipment': equipmentData } },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                   throw new AuthenticationError('Character not found or you do not have permission to update'); 
                }

                const updatedCharacter = updatedUser.characters.id(characterId);

                console.log(updatedCharacter);
                return updatedCharacter;
            } catch (error) {
                console.log(error);
                throw new AuthenticationError('Failed to add equipment');
            }
        },
        removeEquipment: async (parent, { characterId, equipmentId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            console.log(context.user);
            console.log(characterId, equipmentId);

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id, 'characters._id': characterId },
                    { $pull: { 'characters.$.equipment': { _id: equipmentId } } },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw new AuthenticationError('Equipment not found or you do not have permission to delete');
                }

                const updatedCharacter = updatedUser.characters.id(characterId);

                console.log(updatedCharacter);
                return updatedCharacter;
            } catch (error) {
                console.log(error);
                throw new AuthenticationError('Failed to remove equipment');
            }
        }
    }
};

module.exports = resolvers;
