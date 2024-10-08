import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
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

export const QUERY_CHARACTER = gql`
    query character ($characterId: ID!) {
        character (characterId: $characterId) {
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