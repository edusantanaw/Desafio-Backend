import { UpdateCardUsecase } from "../../../data/usecases/updateCard";
import { CardRepository } from "../../../infra/repository/card";

export function UpdateCardUsecaseFactory() {
  const cardRepository = new CardRepository();
  return new UpdateCardUsecase(cardRepository);
}
