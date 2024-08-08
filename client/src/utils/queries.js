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
                    dexterityReq
                    intelligenceReq
                    faithReq
                    arcaneReq
                    special
                }
            }
        }
    }
`;

export const QUERY_CHARACTER = gql`
    query character {
        character {
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
                dexterityReq
                intelligenceReq
                faithReq
                arcaneReq
                special
            }
        }
    }
`;