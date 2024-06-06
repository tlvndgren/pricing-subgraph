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
            console.log("__reference.price")
            let returnPrice;
            function resolveAfter2Seconds() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(prices.find((price) => price.id === parseInt(object.id, 10)));
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
        },
    },
    Query: {
        price(_, { id }) {
            console.log("query.price")
            return prices.find((price) => price.id === parseInt(id, 10));
        },
        prices() {
            console.log("query.prices")
            return prices
        }
    }
};


// const resolvers = {
//     Price: {
//         async __resolveReference(object) {
//             console.log("__reference.price")
//             const delay = new Promise((resolve) => {
//                  setTimeout(() => {
//                      resolve(prices.find((price) => price.id == parseInt(object.id, 10)));
//                  }, 200);
//             });
//             const priceResult = await delay();
//             console.log("priceResult:", priceResult);
//             return priceResult;
//             // return await delay();
//         },
//     },
//     Query: {
//         price(_, { id }) {
//             console.log("query.price")
//             return prices.find((price) => price.id === parseInt(id, 10));
//         },
//         prices() {
//             console.log("query.prices")
//             return prices
//         }
//     }
// };

// Apollo Server Setup
const server = new ApolloServer({ 
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: port },
  });

console.log(`🚀  Prices Subgraph ready at ${url}`);
