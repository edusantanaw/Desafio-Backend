import { httpResponse } from "./httpResponse";

export interface IController<input> {
  handle: (data: input) => Promise<httpResponse<unknown>>;
}
