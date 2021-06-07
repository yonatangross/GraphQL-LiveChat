import { ObjectType, Field } from 'type-graphql';
import { Message } from './Message';

@ObjectType({ description: 'The Chat model' })
export class Chat {
  @Field()
  id: string;

  @Field(() => [Message])
  messages: Message[];

  @Field()
  createdAt: Date;
}
