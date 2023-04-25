const Ok = <T>(data: T) => HttpRequest(200, data);
const Created = <T>(data: T) => HttpRequest(201, data);
const NoContent = () => HttpRequest(204, null);
const BadRequest = <T>(data: T) => HttpRequest(400, data);
const Unauthorized = <T>(data: T) => HttpRequest(401, data);

function ExceptionError(data: unknown, status?: number) {
  const { message } = data as Error;
  return HttpRequest(status ?? 500, message);
}

function HttpRequest<T>(status: number, data: T) {
  return {
    statusCode: status,
    body: data,
  };
}

export {
  Ok,
  Created,
  NoContent,
  BadRequest,
  Unauthorized,
  ExceptionError,
  HttpRequest,
};
