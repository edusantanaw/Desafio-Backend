import { RepositoryInMemory } from "../../../test/mocks/repository";
import { IDeleteUsecase } from "../../domain/usecases/delete";
import { ICard } from "../../types/card";
import { IloadByIdRepository } from "../protocols/repository/loadById";
import { makeValidCard } from "./createCard.test";

interface IDeleteRepository<T> extends IloadByIdRepository<T> {
  delete: (id: string) => Promise<void>;
}

export class DeleteCardUsecase implements IDeleteUsecase {
  constructor(private readonly cardRepository: IDeleteRepository<ICard>) {}

  public async execute(id: string): Promise<boolean> {
    const cardExists = await this.cardRepository.loadById(id);
    if (!cardExists) return false;
    await this.cardRepository.delete(id);
    return true;
  }
}

function makeSut(){
    const cardRepository = new RepositoryInMemory<ICard>();
    const deleteCardUsecase = new DeleteCardUsecase(cardRepository);
    return {cardRepository, deleteCardUsecase}
}

describe("DeleteCardUsecase", ()=> {
    test("Should call cardRepository.loadById with correct value", async ()=> {
        const {cardRepository, deleteCardUsecase} = makeSut()
        await deleteCardUsecase.execute("any_id");
        expect(cardRepository.inputById).toBe("any_id")
    })
   
    test("Should return false if card not exists", async ()=> {
        const {deleteCardUsecase} = makeSut()
        const response = await deleteCardUsecase.execute("any_id");
        expect(response).toBe(false)
    })
   
    test("Should call cardRepository.delete with correct value", async ()=> {
        const {deleteCardUsecase, cardRepository} = makeSut()
        cardRepository.items = [{...makeValidCard(), id: "any"}]
        await deleteCardUsecase.execute("any");
        expect(cardRepository.inputDelete).toBe("any")
    })
    
    test("Should return true if card is deleted", async ()=> {
        const {deleteCardUsecase, cardRepository} = makeSut()
        cardRepository.items = [{...makeValidCard(), id: "any"}]
        const response = await deleteCardUsecase.execute("any");
        expect(response).toBe(true)
    })
})