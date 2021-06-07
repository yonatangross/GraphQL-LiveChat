import { Message } from '../entities/Message';
import { Query, Resolver } from 'type-graphql';
@Resolver()
export class MessageResolver {
  private messagesCollection: Message[] = [];

  @Query(() => [Message])
  getMessages(): Message[] {
    return this.messagesCollection;
  }
}
