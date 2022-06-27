const Project = require('../models/Project')
const Client = require('../models/Client')

const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString,
    GraphQLSchema,
    GraphQLList } = require('graphql')

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: (parent, args) => {
                return Client.findById({ id: parent.clientId })
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: (parent, args) => {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return Client.findById({ id: args.id })
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent, args) => {
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return Project.findById({ id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery })