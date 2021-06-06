import { Message } from 'src/entities/Message';
import { Mutation, Query, Resolver, Arg, Root, PubSub, PubSubEngine, Subscription } from 'type-graphql';
import { Chat } from '../entities/Chat';

const chats: Chat[] = [];
const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  async createChat(@PubSub() pubSub: PubSubEngine, @Arg('messages') messages: Message[]): Promise<Chat> {
    const chat = { id: chats.length + 1, messages };
    chats.push(chat);
    const payload = chat;
    await pubSub.publish(channel, payload);
    return chat;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() { id, messages }: Chat): Chat {
    return { id, messages };
  }
}
