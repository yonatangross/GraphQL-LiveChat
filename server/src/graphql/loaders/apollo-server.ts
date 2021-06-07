import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';
import { ChatResolver } from '../resolvers/chat';
import { MessageResolver } from '../resolvers/message';

const apolloServerLoader = async (app: express.Application, httpServer: http.Server): Promise<ApolloServer> => {
  console.log('started apolloServerLoader');

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

  console.log('finished init apollo server');

  apolloServer.applyMiddleware({ app: app, cors: false });
  console.log('finished init apollo middleware');

  apolloServer.installSubscriptionHandlers(httpServer);
  console.log('finished init apollo subscription handlers');

  return apolloServer;
};

export { apolloServerLoader };
