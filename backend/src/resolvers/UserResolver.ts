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
}