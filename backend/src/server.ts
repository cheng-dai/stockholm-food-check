import path from "path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const SCHEMA = loadSchemaSync(path.join(__dirname, "../../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

interface MyContext {
  token?: string;
}

async function startApolloServer() {
  // Create Apollo Server
  const server = new ApolloServer<MyContext>({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers,
    }),
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer().catch((err) => {
  console.error("Error starting server:", err);
});
