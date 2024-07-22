const typeDefs =`
    type User {
    _id: ID!
    username: String!
    password: String!
    }

    type Auth {
    token: ID!
    user: User
    }

    type Query {
    user (username: String!, email: String!): User
    }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;