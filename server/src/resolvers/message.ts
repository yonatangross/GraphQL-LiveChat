import { Message } from 'src/entities/Message';
import uuid from 'uuid';
import { Mutation, Query, Resolver, Arg, Root, PubSub, PubSubEngine, Subscription } from 'type-graphql';

const messages: Message[] = [];
const channel = 'CHAT_CHANNEL';

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  getMessages(): Message[] {
    return messages;
  }

  @Mutation(() => Message)
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('from') from: string,
    @Arg('content') content: string,
    @Arg('chatId') chatId: string
  ): Promise<Message> {
    const message = { id: uuid.v4(), from: from, content: content, chatId: chatId, sentAt: new Date() };
    messages.push(message);
    const payload = message;
    await pubSub.publish(channel, payload);
    return message;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() { id, from, content, sentAt, chatId }: Message): Message {
    return { id, from, content, sentAt, chatId };
  }
}
