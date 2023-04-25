import { IAuthUsecase } from "../../domain/usecases/auth";
import { AuthController } from "./auth";

class AuthUsecaseMock implements IAuthUsecase {
  inputs: unknown[] = [];
  public exceptionError = false;
  public async execute(login: string, password: string): Promise<string> {
    this.inputs.push(login);
    this.inputs.push(password);
    if (this.exceptionError) throw new Error("Error");
    return "access_token";
  }
}

function makeSut() {
  const authUsecase = new AuthUsecaseMock();
  const authController = new AuthController(authUsecase);
  return { authController, authUsecase };
}

describe("AuthController", () => {
  test("Should return a badRequest if login is not provided", async () => {
    const { authController } = makeSut();
    const response = await authController.handle({ login: "", password: "" });
    expect(response.body).toBe("O login é necessario!");
    expect(response.statusCode).toBe(400);
  });

  test("Should return a badRequest if password is not provided", async () => {
    const { authController } = makeSut();
    const response = await authController.handle({
      login: "any",
      password: "",
    });
    expect(response.body).toBe("A senha é necessaria!");
    expect(response.statusCode).toBe(400);
  });

  test("Should return a ExceptionError if authUsecase throw", async () => {
    const { authController, authUsecase } = makeSut();
    authUsecase.exceptionError = true;
    const response = await authController.handle({
      login: "any",
      password: "any",
    });
    expect(response.body).toBe("Error");
    expect(response.statusCode).toBe(400);
  });

  test("Should return ok and a token if is authenticated", async () => {
    const { authController } = makeSut();
    const response = await authController.handle({
      login: "any",
      password: "any",
    });
    expect(response.body).toBe("access_token");
    expect(response.statusCode).toBe(200);
  });
});
