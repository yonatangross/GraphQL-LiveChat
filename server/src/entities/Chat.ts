import { ObjectType, Field } from 'type-graphql';
import { Message } from './Message';

@ObjectType({ description: 'The Chat model' })
export class Chat {
  @Field()
  id: number;

  @Field((type) => [Message])
  messages: Message[];
}
