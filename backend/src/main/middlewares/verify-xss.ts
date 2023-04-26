import { Request, Response, NextFunction } from "express";
import sanitizeHtml from 'sanitize-html';
import { marked } from "marked";

export default (req: Request, res: Response, next: NextFunction) => {
  const conteudo = req.body.conteudo;
  if (conteudo) {
    const html = marked(conteudo);
    const sanitizedHtml = sanitizeHtml(html);
    req.body.conteudo = sanitizedHtml;
  }
  next();
};
