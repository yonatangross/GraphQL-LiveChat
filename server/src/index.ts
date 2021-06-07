import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ChatResolver } from './resolvers/chat';
import { MessageResolver } from './resolvers/message';

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors({ origin: `http://localhost:${process.env.PORT}`, credentials: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChatResolver, MessageResolver],
      validate: false,
    }),
    subscriptions: {
      path: '/subscriptions',
      onConnect: () => {
        console.log('Client connected for subscriptions');
      },
      onDisconnect: () => {
        console.log('Client disconnected from subscriptions');
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(process.env.GRAPHQL_PORT, () => {
    console.log(`Server ready at http://localhost:${process.env.GRAPHQL_PORT}${apolloServer.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${process.env.GRAPHQL_PORT}${apolloServer.subscriptionsPath}`);
  });
};

main().catch((err) => {
  console.log(err);
});
