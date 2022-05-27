import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Tweet {
  @Field()
  id: string;

  @Field()
  tweet: string;
}
