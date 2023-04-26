import { input } from "../../data/usecases/createCard";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICard } from "../../types/card";
import { BadRequest, Created, ServerError } from "../helpers/http-response";
import { ISchemaValidator } from "../protocols/schemaValidator";

export class CreateCardController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<input>,
    private readonly createUsecase: ICreateUsecase<input, ICard>
  ) {}

  public async handle(data: input) {
    try {
      const maybeError = this.schemaValidator.valid(data);
      if (maybeError) return BadRequest(maybeError);
      const card = await this.createUsecase.execute(data);
      return Created(card);
    } catch (error) {
        console.log(error)
      return ServerError();
    }
  }
}
