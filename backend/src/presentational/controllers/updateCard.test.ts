import { makeValidCard } from "../../data/usecases/createCard.test";
import { Card } from "../../domain/entities/card";
import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICard } from "../../types/card";
import {
  BadRequest,
  NotFound,
  Ok,
  ServerError,
} from "../helpers/http-response";

interface ISchemaValidator<Input> {
  valid: (data: Input) => string | null;
}

export class UpdateCardController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<ICard>,
    private readonly updateUsecase: IUpdateUsecase<ICard>
  ) {}

  public async handle(data: ICard) {
    try {
      const maybeError = this.schemaValidator.valid(data);
      if (maybeError) return BadRequest(maybeError);
      const updateCard = await this.updateUsecase.execute(data);
      if (!updateCard) return NotFound();
      return Ok(updateCard);
    } catch (error) {
      return ServerError();
    }
  }
}

class SchemaValidatorMock implements ISchemaValidator<ICard> {
  public isValid = true;
  public input: unknown = null;
  public valid(data: ICard): string | null {
    this.input = data;
    if (!this.isValid) return "Schema invalido!";
    return null;
  }
}
class UpdateUsecaseMock implements IUpdateUsecase<ICard> {
  public cardExists = true;
  public input: unknown = null;
  public exceptionError: boolean = false
  public async execute(data: ICard): Promise<ICard | null> {
    this.input = data;
    if(!this.cardExists)return null;
    if(this.exceptionError) throw new Error("Internal server error!")
    const updateCard = new Card(data);
    return updateCard.getCard();
  }
}

function makeSut() {
  const schemaValidator = new SchemaValidatorMock();
  const updateCardUsecase = new UpdateUsecaseMock();
  const updateController = new UpdateCardController(
    schemaValidator,
    updateCardUsecase
  );
  return { updateController, schemaValidator, updateCardUsecase };
}

describe("UpdateCardController", () => {
  test("Should call schemaValidor with correct values", async () => {
    const { schemaValidator, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await updateController.handle(card);
    expect(schemaValidator.input).toEqual(card);
  });
  
  test("Should return a badRequest if schema is invalid", async () => {
    const { schemaValidator, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    schemaValidator.isValid =false;
    const response  = await updateController.handle(card);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Schema invalido!");
  });
  
  test("Should call updateUsecase  with correct values", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await updateController.handle(card);
    expect(updateCardUsecase.input).toEqual(card);
  });
 
  test("Should return a notFound if no item exists", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    updateCardUsecase.cardExists = false;
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(404);
  });

  test("Should return a serverError if a unexpected error happen", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" }
    updateCardUsecase.exceptionError= true;;
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(500);
  });
  
  test("Should return 200 and a updated card", async () => {
    const {updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" }
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(card);
  });
});
