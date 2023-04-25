export interface ITokenGenerator {
    generate: (data: string) => Promise<string>;
  }
  