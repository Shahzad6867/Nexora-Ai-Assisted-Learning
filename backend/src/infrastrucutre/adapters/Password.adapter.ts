import { IPassswordAdapter } from "../../application/interfaces/IPasswordAdapter.interface";
import bcrypt from "bcryptjs";
export class PasswordAdapter implements IPassswordAdapter {
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  async compare(password: string, hash: string): Promise<boolean> {
    const isPassCorrect = await bcrypt.compare(password, hash);
    return isPassCorrect;
  }
}
