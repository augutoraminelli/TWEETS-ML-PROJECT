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
    // @Arg('useranme') username: string,
    @Arg('tweet') tweet: string,
    ): Promise<Tweet> {
    const newTweet = { id: crypto.randomUUID(), tweet, createdAt: new Date() };

    this.data.push(newTweet);

    return newTweet;
  }

  @Mutation(() => Tweet)
  async removeTweet(@Arg('id') id: string): Promise<Tweet> {
    const tweet = this.data.find(t => t.id === id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    this.data = this.data.filter(t => t.id !== id);
    return tweet;
  }
}
