import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser ($username: String!, $email: String!, $password: String!) {
        addUser (username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_CHARACTER = gql`
    mutation addCharacter ($characterName: String!) {
        addCharacter (characterName: $characterName) {
            _id
            characterName
        }
    }
`;

export const UPDATE_CHARACTER = gql`
    mutation updateCharacter ($characterId: ID!, $characterData: CharacterInput!) {
        updateCharacter (characterId: $characterId, characterData: $characterData) {
            _id
            characterName
            vigor
            mind
            endurance
            strength
            dexterity
            intelligence
            faith
            arcane
        }
    }
`;

export const REMOVE_CHARACTER = gql`
    mutation removeCharacter ($characterId: ID!) {
        removeCharacter (characterId: $characterId) {
            _id
            username
            characters {
                _id
                characterName
                vigor
                mind
                endurance
                strength
                dexterity
                intelligence
                faith
                arcane
                equipment {
                    _id
                    equipmentName
                    equipmentType
                    weight
                    strengthReq
                    strengthScale
                    dexterityReq
                    dexterityScale
                    intelligenceReq
                    intelligenceScale
                    faithReq
                    faithScale
                    arcaneReq
                    arcaneScale
                    ashOfWar
                    special
                }
            }
        }
    }
`;

export const ADD_EQUIPMENT = gql`
    mutation addEquipment ($characterId: ID!, $equipmentData: EquipmentInput!) {
        addEquipment (characterId: $characterId, equipmentData: $equipmentData) {
            _id
            characterName
            vigor
            mind
            endurance
            strength
            dexterity
            intelligence
            faith
            arcane
            equipment {
                _id
                equipmentName
                equipmentType
                weight
                strengthReq
                strengthScale
                dexterityReq
                dexterityScale
                intelligenceReq
                intelligenceScale
                faithReq
                faithScale
                arcaneReq
                arcaneScale
                ashOfWar
                special
            }
        }
    }
`;

export const REMOVE_EQUIPMENT = gql`
    mutation removeEquipment ($characterId: ID!, $equipmentId: ID!) {
        removeEquipment (characterId: $characterId, equipmentId: $equipmentId) {
            _id
            characterName
            vigor
            mind
            endurance
            strength
            dexterity
            intelligence
            faith
            arcane
            equipment {
                _id
                equipmentName
                equipmentType
                weight
                strengthReq
                strengthScale
                dexterityReq
                dexterityScale
                intelligenceReq
                intelligenceScale
                faithReq
                faithScale
                arcaneReq
                arcaneScale
                ashOfWar
                special
            }
        }
    }
`;