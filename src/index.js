const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a HackerNews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
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
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));