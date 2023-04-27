import { CreateCardUsecase } from "../../../data/usecases/createCard";
import { CardRepository } from "../../../infra/repository/card";

export function CreateCardUsecaseFactory(){
    const cardRepository= new CardRepository()
    return new CreateCardUsecase(cardRepository);
}