import { ILoadUsecase } from "../../domain/usecases/load";
import { NoContent, Ok, ServerError } from "../helpers/http-response";
import { IController } from "../protocols/controller";
import { httpResponse } from "../protocols/httpResponse";

export class LoadController<T> implements IController<void> {
  constructor(private readonly loadUsecase: ILoadUsecase<T>) {}
  public async handle(): Promise<httpResponse<unknown>> {
    try {
      const response = await this.loadUsecase.execute();
      if (!response) return NoContent();
      return Ok(response);
    } catch (error) {
      return ServerError();
    }
  }
}
