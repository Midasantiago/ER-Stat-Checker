const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        characters: [Character]
    }

    type Character {
        _id: ID!
        characterName: String!
        vigor: Int
        mind: Int
        endurance: Int
        strength: Int
        dexterity: Int
        intelligence: Int
        faith: Int
        arcane: Int
        equipment: [Equipment]
    }

    type Equipment {
       _id: ID!
       equipmentName: String!
       equipmentType: String!
       weight: Int!
       strengthReq: Int!
       dexterityReq: Int!
       intelligenceReq: Int!
       faithReq: Int!
       arcaneReq: Int!
       special: String 
    }

    type Auth {
    token: ID!
    user: User
    }

    type Query {
    user (username: String!, email: String!): User
    me: User
    character (characterId: ID!): Character
    }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharacter(characterName: String!): Character
    updateCharacter(characterId: ID!, characterData: CharacterInput!): Character
    removeCharacter(characterId: ID!): User
    addEquipment(characterId: ID!, equipmentData: EquipmentInput!): Character
    removeEquipment(characterId: ID!, equipmentId: ID!): Character
    }

    input CharacterInput {
        characterName: String!
        vigor: Int
        mind: Int
        endurance: Int
        strength: Int
        dexterity: Int
        intelligence: Int
        faith: Int
        arcane: Int
    }

    input EquipmentInput {
        equipmentName: String!
        equipmentType: String!
        weight: Int!
        strengthReq: Int!
        dexterityReq: Int!
        intelligenceReq: Int!
        faithReq: Int!
        arcaneReq: Int!
        special: String
    }
`;

module.exports = typeDefs;