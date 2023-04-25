import { ITokenGenerator } from "../protocols/jwt";
import { AuthUsecase } from "./auth";
import * as dotenv from "dotenv";

dotenv.config();

class JwtServiceMock implements ITokenGenerator {
  public input: unknown = null;
  public async generate(data: string): Promise<string> {
    this.input = data;
    return "access_token";
  }
}

function makeSut() {
  const jwtService = new JwtServiceMock();
  const authUsecase = new AuthUsecase(jwtService);
  return {
    jwtService,
    authUsecase,
  };
}

describe("AuthUsecase", () => {
  test("Should throw if a invalid login is provided", () => {
    const { authUsecase } = makeSut();
    const response = authUsecase.execute("invalid_login", "lets@123");
    expect(response).rejects.toThrow(new Error("Login invalido!"));
  });

  test("Should throw if a invalid password is provided", () => {
    const { authUsecase } = makeSut();
    const response = authUsecase.execute("letscode", "invalid_pass");
    expect(response).rejects.toThrow(new Error("Senha invalida!"));
  });

  test("Should call jwtService with correct value", async () => {
    const { authUsecase, jwtService } = makeSut();
    await authUsecase.execute("letscode", "lets@123");
    expect(jwtService.input).toBe("letscode");
  });

  test("Should return a if pass and login is valid", async () => {
    const { authUsecase } = makeSut();
    const response = await authUsecase.execute("letscode", "lets@123");
    expect(response).toBe("access_token");
  });
});
