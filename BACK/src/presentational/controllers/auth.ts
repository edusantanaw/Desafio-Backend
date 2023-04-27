import { IAuthUsecase } from "../../domain/usecases/auth";
import { BadRequest, ExceptionError, Ok } from "../helpers/http-response";
import { IController } from "../protocols/controller";
import { httpResponse } from "../protocols/httpResponse";

export class AuthController implements IController<data> {
  constructor(private readonly authUsecase: IAuthUsecase) {}
  public async handle({ login, senha }: data): Promise<httpResponse<unknown>> {
    try {
      if (!login) return BadRequest("O login é necessario!");
      if (!senha) return BadRequest("A senha é necessaria!");
      const token = await this.authUsecase.execute(login, senha);
      return Ok(token);
    } catch (error) {
      return ExceptionError(error, 400);
    }
  }
}

type data = {
  login: string;
  senha: string;
};
