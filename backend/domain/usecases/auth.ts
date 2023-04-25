export interface IAuthUsecase {
    execute: (login: string, password: string) => Promise<string>
}