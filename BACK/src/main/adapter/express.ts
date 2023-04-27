import { Request, Response } from "express";
import { ExceptionError } from "../../presentational/helpers/http-response";
import { IController } from "../../presentational/protocols/controller";

export function adapter<In>(controller: IController<In>) {
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
