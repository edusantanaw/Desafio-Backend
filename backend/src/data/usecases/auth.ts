import { IAuthUsecase } from "../../domain/usecases/auth";
import { ITokenGenerator } from "../protocols/helpers/jwt";

export class AuthUsecase implements IAuthUsecase {
  private login = process.env.LOGIN!;
  private pass = process.env.SENHA!;
  constructor(private readonly jwtService: ITokenGenerator) {}
  public async execute(login: string, password: string): Promise<string> {
    if (login != this.login) throw new Error("Login invalido!");
    if (password != this.pass) throw new Error("Senha invalida!");
    const accessToken = this.jwtService.generate(login);
    return accessToken;
  }
}
