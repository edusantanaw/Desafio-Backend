import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../../presentational/helpers/http-response";
import { JwtService } from "../../data/helpers/jwtService";

const jwt = new JwtService();

function getToken(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) return null;
  const [, token] = authorization.split(" ");
  return token;
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    if (!token) return Unauthorized("Acesso negado!");
    jwt.verify(token);
  } catch (error) {
    return Unauthorized("Token invalido!");
  }
};
