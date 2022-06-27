const { projects, clients } = require('../sampleData')

const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString,
    GraphQLSchema,
    GraphQLList } = require('graphql')

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: (parent, args) => {
                return clients.find(client => client.id === parent.id)
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
            resolve: () => {
                return clients
            }
        },
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return clients.find((client) => client.id === args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: () => {
                return projects
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return projects.find((project) => project.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery })