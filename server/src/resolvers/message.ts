import { Message } from '../entities/Message';
import { Query, Resolver, Root, Subscription } from 'type-graphql';

const channel = 'CHAT_CHANNEL';

@Resolver()
export class MessageResolver {
  private messagesCollection: Message[] = [];

  @Query(() => [Message])
  getMessages(): Message[] {
    return this.messagesCollection;
  }


  @Subscription({ topics: channel })
  messageSent(@Root() { id, from, content, sentAt, chatId }: Message): Message {
    return { id, from, content, sentAt, chatId };
  }
}
