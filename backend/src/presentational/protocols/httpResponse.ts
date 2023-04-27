export type httpResponse<T> = {
  statusCode: number;
  body: T;
};
