import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';

export const sampleChats = [
  createChat({
    id: '1',
    createdAt: new Date(),
    messages: [
      createMessage({
        id: '1',
        sentAt: new Date(),
        content: 'Very tasty!',
        chatId: '1',
      }),
      createMessage({
        id: '2',
        sentAt: new Date(),
        content: 'Very tasty 2!',
        chatId: '1',
      }),
    ],
  }),
  createChat({
    id: '2',
    createdAt: new Date(),
    messages: [
      createMessage({
        id: '3',
        sentAt: new Date(),
        content: 'Very yummy!',
        chatId: '2',
      }),
      createMessage({
        id: '4',

        sentAt: new Date(),
        content: 'Very yummy 2!',
        chatId: '2',
      }),
    ],
  }),
  createChat({
    id: '3',
    createdAt: new Date(),
    messages: [
      createMessage({
        id: '5',

        sentAt: new Date(),
        content: 'Very dummy!',
        chatId: '3',
      }),
      createMessage({
        id: '6',

        sentAt: new Date(),
        content: 'Very dummy 2!',
        chatId: '3',
      }),
    ],
  }),
];

function createChat(recipeData: Partial<Chat>): Chat {
  return Object.assign(new Chat(), recipeData);
}

function createMessage(commentData: Partial<Message>): Message {
  return Object.assign(new Message(), commentData);
}
