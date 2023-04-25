import { Request, Response } from "express";
import { ExceptionError } from "../../presentational/helpers/http-response";

type httpResponse<T> = {
  statusCode: number;
  body: T;
};

interface IController<input, output> {
  handle: (data: input) => Promise<httpResponse<output>>;
}

export function adapter<In, Out>(controller: IController<In, Out>) {
  return async (req: Request, res: Response) => {
    try {
      const { body, statusCode } = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query,
      });

      return res.status(statusCode).json(body);
    } catch (error) {
      return ExceptionError(error, 500);
    }
  };
}
