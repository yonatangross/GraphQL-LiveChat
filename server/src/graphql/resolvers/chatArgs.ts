import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class NewMessagesArgs {
  @Field(() => ID)
  chatId: string;
}
