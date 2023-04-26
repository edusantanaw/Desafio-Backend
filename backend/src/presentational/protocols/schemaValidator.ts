export interface ISchemaValidator<Input> {
  valid: (data: Input) => string | null;
}
