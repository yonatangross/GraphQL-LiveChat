import { INewChatPayload } from '../interfaces/INewChat';
import { MessageInput } from '../entities/MessageInput';
import { sampleChats } from '../data/chat.samples';
import { Arg, Args, Mutation, Publisher, PubSub, Query, Resolver, ResolverFilterData, Root, Subscription } from 'type-graphql';
import { Topic } from '../entities/Topic';
import { Chat } from '../entities/Chat';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../entities/Message';
import { INewMessagePayload } from '../interfaces/INewMessage';
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

    const message: Message = { id: uuidv4(), from: input.from, content: input.content, chatId: input.chatId, sentAt: new Date() };
    chat.messages.push(message);
    await notifyAboutNewMessage({
      id: message.id,
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
  newMessagesAdded(@Root() newMessage: INewMessagePayload, @Args() { chatId }: NewMessagesArgs): Message {
    return {
      id: newMessage.id,
      content: newMessage.content,
      sentAt: newMessage.sentAt,
      from: newMessage.from,
      chatId: chatId,
    };
  }

  @Mutation(() => Boolean)
  async addChat(@PubSub(Topic.NewChat) notifyAboutNewChat: Publisher<INewChatPayload>): Promise<Boolean> {
    const chat = Object.assign(new Chat(), {
      id: uuidv4(),
      messages: [],
      createdAt: new Date(),
    });

    if (!chat) {
      return false;
    }
    this.chatsCollection.push(chat);

    await notifyAboutNewChat({
      id: chat.id,
      createdAt: chat.createdAt,
    });

    return true;
  }

  @Subscription(() => Chat, { topics: Topic.NewChat })
  newChatAdded(@Root() newChat: INewChatPayload): Chat {
    return { id: newChat.id, createdAt: newChat.createdAt, messages: [] };
  }
}
