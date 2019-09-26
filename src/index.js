const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    info: () => `This is the API of a HackerNews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (parent, args) => {
      const linkToUpdate = links.find(link => link.id === args.id);
      const update = {...args};
      const updatedLink = {...linkToUpdate, ...update};
      return updatedLink;
    }, 
    deleteLink: (parent, args) => {
      const linkToDelete = links.find(link => link.id === args.id);
      links.splice(links.indexOf(linkToDelete), 1);
      console.log(links);
      return linkToDelete;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers, 
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));