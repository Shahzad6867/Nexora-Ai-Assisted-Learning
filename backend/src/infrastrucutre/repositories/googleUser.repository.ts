import { GoogleUser } from "../../application/dtos/user.dto";
import { IGoogleUserRepository } from "../../domain/repositories/googleUser.repository";
import redisClient from "../redis/connection";

export class GoogleUserRepository implements IGoogleUserRepository {
  private readonly prefix = "googleUsers:";

  async save(googleUser: GoogleUser, expireDocumentIn: number): Promise<void> {
    const key = `${this.prefix}${googleUser._id}`;
    await redisClient.set(key, JSON.stringify(googleUser), {
      EX: expireDocumentIn,
    });
  }
  async findById(_id: string): Promise<GoogleUser | null> {
    const key = `${this.prefix}${_id}`;
    const user = await redisClient.get(key);
    if (!user) return null;
    return JSON.parse(user);
  }
  async delete(_id: string): Promise<void> {
    const key = `${this.prefix}${_id}`;
    await redisClient.del(key);
  }
}
