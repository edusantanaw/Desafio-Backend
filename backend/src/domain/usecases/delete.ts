
export interface IDeleteUsecase {
    execute: (id: string) => Promise<boolean>;
}