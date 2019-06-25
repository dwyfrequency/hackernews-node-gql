const { GraphQLServer } = require('graphql-yoga');

/* 1
 * The typeDefs constant defines your GraphQL schema. Here, it defines a simple Query type with one field called info.
 * This field has the type String!. The exclamation mark in the type definition means that this field can never be null.
 */

/* 2
 * The resolvers object is the actual implementation of the GraphQL schema. Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
 *  */
// 1
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

/*
 * Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga. This tells the server what API operations are accepted and how they should be resolved.
 */
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
