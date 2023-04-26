import { DeleteCardUsecase } from "../../../data/usecases/deleteCard";
import { CardRepository } from "../../../infra/repository/card";

export function DeleteCardUsecaseFactory() {
  const cardRepository = new CardRepository();
  return new DeleteCardUsecase(cardRepository);
}
