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
            // return prices.find((price) => price.id === parseInt(object.id, 10));
            // async price(_, { id }) {
            let returnPrice;
            const delay = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(prices.find((price) => price.id === parseInt(id, 10)));
                    }, 2000);
            });
        return await delay;
        }
    },
    Query: {
        price(_, { id }) {
            let returnPrice;
            function resolveAfter2Seconds() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(prices.find((price) => price.id === parseInt(id, 10)));
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
            // setTimeout(() => {
                // console.log("Taking a break for defer")
            //  }, "2000");
            // return prices.find((price) => price.id === parseInt(id, 10));
        },
        prices() {
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
