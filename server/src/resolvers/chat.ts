import { MessageInput } from './../entities/MessageInput';
import { sampleChats } from '../data/chat.samples';
import { Arg, Args, Mutation, Publisher, PubSub, PubSubEngine, Query, Resolver, ResolverFilterData, Root, Subscription } from 'type-graphql';
import { Topic } from '../entities/topics';
import { Chat } from '../entities/Chat';
import uuid from 'uuid';
import { Message } from 'src/entities/Message';
import { INewMessagePayload } from 'src/entities/INewMessage';
import { NewMessagesArgs } from './chatArgs';

@Resolver()
export class ChatResolver {
  private chatsCollection: Chat[] = sampleChats.slice();
  @Query(() => [Chat])
  getChats(): Chat[] {
    return this.chatsCollection;
  }

  @Mutation(() => Boolean)
  async addNewMessage(@PubSub(Topic.NewMessage) notifyAboutNewMessage: Publisher<INewMessagePayload>, @Arg('message') input: MessageInput): Promise<Boolean> {
    const chat = this.chatsCollection.find((chat) => chat.id === input.chatId);
    if (!chat) {
      return false;
    }

    const message: Message = { id: uuid.v4(), from: input.from, content: input.content, chatId: input.chatId, sentAt: new Date() };
    chat.messages.push(message);
    await notifyAboutNewMessage({
      chatId: message.chatId,
      content: message.content,
      sentAt: message.sentAt,
      from: message.from,
    });

    return true;
  }

  @Subscription(() => Message, {
    topics: Topic.NewMessage,
    filter: ({ payload, args }: ResolverFilterData<INewMessagePayload, NewMessagesArgs>) => {
      return payload.chatId === args.chatId;
    },
  })
  newMessages(@Root() newMessage: INewMessagePayload, @Args() { chatId }: NewMessagesArgs): Message {
    return {
      id: uuid.v4(),
      content: newMessage.content,
      sentAt: newMessage.sentAt,
      from: newMessage.from,
      chatId: chatId,
    };
  }
}
