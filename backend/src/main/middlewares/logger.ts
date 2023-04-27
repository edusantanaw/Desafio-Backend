import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";

type dataLogger = {
  date: string;
  id: string;
  title: string;
};

type ILogger = (data: dataLogger) => void;

function logger(data: dataLogger, typeAction: string) {
  const { date, id, title } = data;
  console.log(`${date} - Card ${id} - ${title} - ${typeAction}`);
}

function loggerMiddleware(logger: ILogger) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const title = req.body.titulo;
    const date = getDate();
    logger({ id, title, date });
    next();
  };
}

const updateLogger = (data: dataLogger) => logger(data, "Atualizado");
const removeLogger = (data: dataLogger) => logger(data, "Removido");

export const updateLoggerMiddleware = loggerMiddleware(updateLogger);
export const removeLoggerMiddleware = loggerMiddleware(removeLogger);

function getDate() {
  const now = moment().tz("America/Sao_Paulo");
  const format = now.format("DD-MM-YYYY HH:mm:ss");
  return format;
}
