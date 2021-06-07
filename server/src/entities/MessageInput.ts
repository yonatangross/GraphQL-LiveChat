import { Message } from 'src/entities/Message';
import { Field, ID, InputType } from 'type-graphql';

@InputType({ description: 'New message data' })
export class MessageInput implements Partial<Message> {
  @Field(() => ID)
  chatId: string;

  @Field()
  from?: string;

  @Field()
  content: string;
}
