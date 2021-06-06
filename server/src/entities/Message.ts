import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The message model' })
export class Message {
  @Field((type) => ID)
  id: string;

  @Field()
  from: string;

  @Field()
  content: string;

  @Field()
  sentAt: Date;

  @Field()
  chatId: string;
}
