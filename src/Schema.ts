import {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLInputObjectType
} from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'

import PersonModel from './Models/Person'
import PostModel from './Models/Post'

const PersonTypeInput = new GraphQLInputObjectType({
    name: "PersonInput",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    }
})

const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    }
})

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: {
        id: { type: GraphQLID },
        created_by: { type: PersonType },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        followers: { type: GraphQLList(PersonType) },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            people: {
                type: GraphQLList(PersonType),
                resolve: (root, args, context, info) => {
                    return PersonModel.find().exec()
                }
            },
            person: {
                type: PersonType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return PersonModel.findById(args.id).exec()
                }
            },
            posts: {
                type: GraphQLList(PostType),
                args: {
                    id: { type: GraphQLList(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    if (args.id) {
                        return PostModel.find({
                            "created_by.id" : {
                                $in: args.id
                            }
                        })
                    }
                    return PostModel.find().populate('created_by').exec()
                }
            },
            post: {
                type: PostType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return PostModel.findById(args.id).populate('created_by').exec()
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            person: {
                type: PersonType,
                args: {
                    firstName: { type: GraphQLNonNull(GraphQLString) },
                    lastName: { type: GraphQLNonNull(GraphQLString) },
                    balance: { type: GraphQLFloat, defaultValue: 0 }
                },
                resolve: (root, args, context, info) => {
                    const person = new PersonModel(args)
                    return person.save()
                }
            },
            post: {
                type: PostType,
                args: {
                    created_by: { type: GraphQLNonNull(GraphQLID) },
                    title: { type: GraphQLNonNull(GraphQLString) },
                    body: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    const post = new PostModel(args)
                    return post.save()
                }
            }
        }
    })
})

export default schema