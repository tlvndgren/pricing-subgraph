const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation")
const typeDefs = gql(fs.readFileSync("./prices.graphql", 'utf8'));
const prices = require("./data/prices.js");

const port = process.env.PORT || 4003

const resolvers = {
    Price: {
        __resolverReference(object) {
            return prices.find((price) => price.id === object.id);
        },
    },
    Query: {
        price(_, { id }) {
            return prices.find((price) => price.id === parseInt(id, 10));
        },
        prices() {
            return prices
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });
  
  server.listen({ port }).then(({ url }) => {
    console.log(`Prices service ready at ${url}`);
  });
