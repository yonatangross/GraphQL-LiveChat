import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The message model' })
export class Message {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  from?: string;

  @Field()
  content: string;

  @Field()
  sentAt: Date;

  @Field()
  chatId: string;
}
