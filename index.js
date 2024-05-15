// External Dependencies
import fs from "fs";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

// Internal Dependencies
const typeDefs = gql(
    fs.readFileSync("./prices.graphql", {
      encoding: "utf-8",
    })
  );
import { prices } from "./data/prices.js";

// Variable Definitions
const port = process.env.PORT || 4002

const resolvers = {
    Price: {
        __resolveReference(object) {
            return prices.find((price) => price.id === parseInt(object.id, 10));
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

// Apollo Server Setup
const server = new ApolloServer({ 
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: port },
  });

console.log(`🚀  Prices Subgraph ready at ${url}`);
