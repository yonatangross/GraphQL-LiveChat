import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';

export const sampleChats = [
  createChat({
    id: '1',
    createdAt: new Date(),
    messages: [
      createMessage({
        id:'1',
        sentAt: new Date(),
        content: 'Very tasty!',
      }),
      createMessage({
        id:'2',
        sentAt: new Date(),
        content: 'Very tasty 2!',
      }),
    ],
  }),
  createChat({
    id: '2',
    createdAt: new Date(),
    messages: [
      createMessage({
        id:'3',

        sentAt: new Date(),
        content: 'Very yummy!',
      }),
      createMessage({
        id:'4',

        sentAt: new Date(),
        content: 'Very yummy 2!',
      }),
    ],
  }),
  createChat({
    id: '3',
    createdAt: new Date(),
    messages: [
      createMessage({
        id:'5',

        sentAt: new Date(),
        content: 'Very dummy!',
      }),
      createMessage({
        id:'6',

        sentAt: new Date(),
        content: 'Very dummy 2!',
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
