import { ZodObject } from "zod";
import { ISchemaValidator } from "../protocols/schemaValidator";

export class SchemaValidator<T> implements ISchemaValidator<T> {
  private schema: ZodObject<any>;
  constructor(schema: ZodObject<any>) {
    this.schema = schema;
  }

  public valid(data: T) {
    const isSchemaValid = this.schema.safeParse(data);
    if (isSchemaValid.success) {
      return null;
    }
    return isSchemaValid.error.errors[0].message;
  }
}
