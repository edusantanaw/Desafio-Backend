import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";

type ILogger = (date: string, id: string, title: string) => void;

const updateLogger = (data: string, id: string, title: string) =>
  logger(data, id, title, "Atualizado");

const removeLogger = (data: string, id: string, title: string) =>
  logger(data, id, title, "Removido");

export const updateLoggerMiddleware = loggerMiddleware(updateLogger)
export const removeLoggerMiddleware = loggerMiddleware(removeLogger)
  


function logger(date: string, id: string, title: string, op: string) {
  console.log(`${date} - Card ${id} - ${title} - ${op}  `);
}

function getDate() {
  const now = moment().tz("America/Sao_Paulo");
  const format = now.format("DD-MM-YYYY HH:mm:ss");
  return format;
}

function loggerMiddleware(logger: ILogger) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const title = req.body.title;
    const date = getDate();
    logger(date, id, title);
  };
}
