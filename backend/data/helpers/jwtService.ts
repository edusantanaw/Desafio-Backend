import jwt from "jsonwebtoken";
import { ITokenGenerator } from "../protocols/jwt";

export class JwtService implements ITokenGenerator {
  private secret = process.env.SECRET_TOKEN!;
  public async generate(data: string): Promise<string> {
    const token =  jwt.sign(data, this.secret, { expiresIn: 1000 });
    return token;
  }
}
