import { ISchemaValidator } from "../../../src/presentational/protocols/schemaValidator";

export class SchemaValidatorMock<T> implements ISchemaValidator<T> {
  public isValid = true;
  public input: unknown = null;
  public valid(data: T): string | null {
    this.input = data;
    if (!this.isValid) return "Schema invalido!";
    return null;
  }
}
