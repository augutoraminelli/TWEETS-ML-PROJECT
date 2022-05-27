import path from 'path';
import "reflect-metadata";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './src/resolvers/UserResolver';
import { TweetMLResolver } from './src/resolvers/TweetResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TweetMLResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`); 
}

main();
