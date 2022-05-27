import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import crypto from "crypto"; //criar o Id do usuário

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    return this.data;
  }
  
  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string): Promise<User> {
    const user = { id: crypto.randomUUID(), name };

    this.data.push(user);

    return user;
  }

  @Mutation(() => User)
  async removeUser(
    @Arg('id') id: string): Promise<User> {
    const user = this.data.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    this.data = this.data.filter(user => user.id !== id);
    return user;
  }
}