import { ILoadUsecase } from "../../domain/usecases/load";
import { NoContent, Ok, ServerError } from "../helpers/http-response";

export class LoadController<T> {
  constructor(private readonly loadUsecase: ILoadUsecase<T>) {}

  public async handle() {
    try {
      const response = await this.loadUsecase.execute();
      if (!response) return NoContent();
      return Ok(response);
    } catch (error) {
      return ServerError();
    }
  }
}
