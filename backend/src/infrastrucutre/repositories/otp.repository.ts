import { OtpEntity } from "../../application/dtos/otp.dto";
import { IOtpRepository } from "../../domain/repositories/otp.respository";
import redisClient from "../redis/connection";

export class OtpRepository implements IOtpRepository {
  private readonly prefix = "otps:";
  async save(otpEntity: OtpEntity, expireDocumentIn: number): Promise<void> {
    const key = `${this.prefix}${otpEntity._id}`;
    await redisClient.set(key, JSON.stringify(otpEntity), {
      EX: expireDocumentIn,
    });
  }
  async findById(_id: string): Promise<OtpEntity | null> {
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
