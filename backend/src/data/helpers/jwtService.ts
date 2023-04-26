import jwt from "jsonwebtoken";
import { ITokenGenerator } from "../protocols/helpers/jwt";

export class JwtService implements ITokenGenerator {
  private secret = process.env.SECRET_TOKEN!;
  public async generate(data: string): Promise<string> {
    const token = jwt.sign(data, this.secret, { expiresIn: 1000 });
    return token;
  }

  public verify(token: string) {
    jwt.verify(token, this.secret);
  }
}
