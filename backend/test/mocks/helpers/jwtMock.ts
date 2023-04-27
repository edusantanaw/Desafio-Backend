import { ITokenGenerator } from "../../../src/data/protocols/helpers/jwt";

export class JwtServiceMock implements ITokenGenerator {
  public input: unknown = null;
  public async generate(data: string): Promise<string> {
    this.input = data;
    return "access_token";
  }
}
