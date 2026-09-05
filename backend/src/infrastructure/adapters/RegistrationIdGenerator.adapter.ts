import crypto from "crypto";
import { IRegistrationIdGenerator } from "../../application/interfaces/IRegistrationIdGenerator.interface";

export class RegistrationIdGenerator implements IRegistrationIdGenerator {
  generate(): string {
    const id = crypto.randomUUID()
    return id;
  }
}
