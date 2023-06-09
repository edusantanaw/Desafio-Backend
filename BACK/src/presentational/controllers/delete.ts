import { IDeleteUsecase } from "../../domain/usecases/delete";
import { ILoadUsecase } from "../../domain/usecases/load";
import {
  BadRequest,
  NoContent,
  NotFound,
  Ok,
  ServerError,
} from "../helpers/http-response";
import { IController } from "../protocols/controller";
import { httpResponse } from "../protocols/httpResponse";

type data = {
  id: string;
};

export class DeleteController<T> implements IController<data> {
  constructor(
    private readonly deleteCardUsecase: IDeleteUsecase,
    private readonly loadUsecase: ILoadUsecase<T>
  ) {}
  public async handle({ id }: data): Promise<httpResponse<unknown>> {
    try {
      if (!id) return BadRequest("id invalido!");
      const response = await this.deleteCardUsecase.execute(id);
      if (!response) return NotFound();
      const items = await this.loadUsecase.execute();
      if (!items) return NoContent();
      return Ok(items);
    } catch (error) {
      return ServerError();
    }
  }
}
