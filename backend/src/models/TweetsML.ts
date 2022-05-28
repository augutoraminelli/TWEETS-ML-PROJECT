import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Tweet {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  tweet: string;

  @Field()
  createdAt: Date;
}
