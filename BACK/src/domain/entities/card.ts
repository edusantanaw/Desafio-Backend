import { randomUUID } from "node:crypto";
import { ICard } from "../../types/card";

export class Card {
  private id: string;
  private titulo: string;
  private conteudo: string;
  private lista: string;

  constructor(data: cardData) {
    this.id = data.id ?? randomUUID();
    this.titulo = data.titulo;
    this.conteudo = data.conteudo;
    this.lista = data.lista;
  }

  public getCard(): ICard {
    return {
      id: this.id,
      conteudo: this.conteudo,
      lista: this.lista,
      titulo: this.titulo,
    };
  }
}

type cardData = {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: string;
};
