import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICard } from "../../types/card";
import {
  BadRequest,
  NotFound,
  Ok,
  ServerError,
} from "../helpers/http-response";
import { IController } from "../protocols/controller";
import { httpResponse } from "../protocols/httpResponse";
import { ISchemaValidator } from "../protocols/schemaValidator";

export class UpdateCardController implements IController<ICard> {
  constructor(
    private readonly schemaValidator: ISchemaValidator<ICard>,
    private readonly updateUsecase: IUpdateUsecase<ICard>
  ) {}

  public async handle(data: ICard): Promise<httpResponse<unknown>> {
    try {
      const maybeError = this.schemaValidator.valid(data);
      if (maybeError) return BadRequest(maybeError);
      const updateCard = await this.updateUsecase.execute(data);
      if (!updateCard) return NotFound();
      return Ok(updateCard);
    } catch (error) {
      return ServerError();
    }
  }
}
