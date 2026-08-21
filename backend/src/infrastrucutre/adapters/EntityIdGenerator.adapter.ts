import { IEntityIdGenerator } from "../../application/interfaces/IEntityIdGenerator.interface";
import crypto from "crypto";

export class EntityIdGenerator implements IEntityIdGenerator {
  generate(prefix: string): string {
    const timestamp = Date.now().toString();
    const randomBuffer = crypto.randomBytes(4).toString("hex").toUpperCase();
    const id = `${prefix}-${timestamp}${randomBuffer}`;

    return id;
  }
}
