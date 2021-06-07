import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ChatResolver } from './graphql/resolvers/chat';
import { MessageResolver } from './graphql/resolvers/message';

import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middleware/logger';
import { apolloServerLoader } from './graphql/loaders/apollo-server';

dotenv.config();

class App {
  public app: express.Application;
  public httpServer: http.Server;
  public apolloServer: ApolloServer;
  private PORT: string | number = process.env.PORT || 3000;
  private GRAPHQL_PORT: string | number = process.env.GRAPHQL_PORT || 9000;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.initializeMiddlewares();
    this.initApolloServer();
    console.log('finished ctor');
  }

  public listen() {
    this.httpServer.listen(this.GRAPHQL_PORT, () => {
      console.log(`
      ################################################
      Server ready at http://localhost:${this.GRAPHQL_PORT}${this.apolloServer.graphqlPath}\n
      Subscriptions ready at ws://localhost:${this.GRAPHQL_PORT}${this.apolloServer.subscriptionsPath}
      ################################################
      `);
    });
  }

  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(() => express.json());
    this.app.use(() => express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: `http://localhost:${this.PORT}`, credentials: true }));
    console.log('finished init middlewares');
  }

  private async initApolloServer() {
    try {
      this.apolloServer = await apolloServerLoader(this.app, this.httpServer);
      app.listen();
    } catch (error) {
      console.log('error while init apollo server');
      console.log(error);
    }
  }
}

const app = new App();
