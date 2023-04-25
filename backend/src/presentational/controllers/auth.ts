import { IAuthUsecase } from "../../domain/usecases/auth";
import { BadRequest, ExceptionError, Ok } from "../helpers/http-response";

export class AuthController {
  constructor(private readonly authUsecase: IAuthUsecase) {}

  public async handle({ login, password }: data) {
    try {
      if (!login) return BadRequest("O login é necessario!");
      if (!password) return BadRequest("A senha é necessaria!");
      const token = await this.authUsecase.execute(login, password);
      return Ok(token);
    } catch (error) {
      return ExceptionError(error, 400);
    }
  }
}

type data = {
  login: string;
  password: string;
};
