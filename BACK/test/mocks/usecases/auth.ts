import { IAuthUsecase } from "../../../src/domain/usecases/auth";

export class AuthUsecaseMock implements IAuthUsecase {
  inputs: unknown[] = [];
  public exceptionError = false;
  public async execute(login: string, senha: string): Promise<string> {
    this.inputs.push(login);
    this.inputs.push(senha);
    if (this.exceptionError) throw new Error("Error");
    return "access_token";
  }
}
