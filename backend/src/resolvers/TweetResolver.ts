import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { Tweet } from "../models/TweetsML";
import crypto from "crypto";

@Resolver()
export class TweetMLResolver {
  private data: Tweet[] = [];

  @Query(() => [Tweet])
  async tweets() {
    return this.data;
  }

  @Mutation(() => Tweet)
  async createTweet(
    @Arg('tweet') tweet: string): Promise<Tweet> {
    const newTweet = { id: crypto.randomUUID(), tweet };

    this.data.push(newTweet);

    return newTweet;
  }
}