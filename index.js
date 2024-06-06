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
        async __resolveReference(object) {
            console.log("reference.price")
            // return prices.find((price) => price.id === parseInt(object.id, 10));
            const delay = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(prices.find((price) => price.id == parseInt(object.id, 10)));
                    }, 2000);
            });
        const priceResult = await delay();
        console.log("priceResult:", priceResult)
        return priceResult;
        }
    },
    Query: {
        async price(_, { id }) {
            console.log("query.price")
            function resolveAfter2Seconds() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(prices.find((price) => price.id == parseInt(id, 10)));
                  }, 2000);
                });
            }
            async function asyncCall() {
                console.log('calling');
                const result = await resolveAfter2Seconds();
                console.log(result);
                return result
            }
            returnPrice = asyncCall();
            console.log("returnPrice:", returnPrice)
            return returnPrice
            return prices.find((price) => price.id === parseInt(id, 10));
        },
        prices() {
            console.log("query.prices")
            let returnPrices;
            function resolveAfter2Seconds() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(prices);
                  }, 2000);
                });
            }
            async function asyncCall() {
                console.log('calling');
                const result = await resolveAfter2Seconds();
                console.log(result);
                return result
            }
            returnPrices = asyncCall();
            console.log("returnPrices:", returnPrices)
            return returnPrices
            // return prices
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
