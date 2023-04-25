export interface ICreateUsecase<input, output> {
  execute: (data: input) => Promise<output>;
}
