"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const chat_1 = require("./resolvers/chat");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const httpServer = http_1.default.createServer(app);
    app.use(cors_1.default({ origin: 'http://localhost:3000', credentials: true }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [chat_1.ChatResolver],
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
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`);
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map