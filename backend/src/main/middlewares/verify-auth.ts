import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../../presentational/helpers/http-response";
import { JwtService } from "../../data/helpers/jwtService";
import { httpResponse } from "../../presentational/protocols/httpResponse";

const jwt = new JwtService();

function getToken(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) return null;
  const [, token] = authorization.split(" ");
  return token;
}

const requestError = <T>(data: httpResponse<T>, res: Response) => {
  return res.status(data.statusCode).json(data.body);
};

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    if (!token) return requestError(Unauthorized("Acesso negado!"), res);
    jwt.verify(token);
    next();
  } catch (error) {
    return requestError(Unauthorized("Token invalido!"), res);
  }
};
