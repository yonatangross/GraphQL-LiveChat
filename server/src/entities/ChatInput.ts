import { InputType } from 'type-graphql';
import { Chat } from './Chat';

@InputType({ description: 'New chat data' })
export class ChatInput implements Partial<Chat> {
}
