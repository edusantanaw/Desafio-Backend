import { LoadUsecase } from "../../../data/usecases/load";
import { CardRepository } from "../../../infra/repository/card";
import { ICard } from "../../../types/card";

export function LoadCardUsecaseFactory(){
    const cardRepository = new CardRepository();
    return new LoadUsecase<ICard>(cardRepository);
}