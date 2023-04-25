export interface IUpdateUsecase <T>{
    execute: (data:  T) => Promise<T | null>;
}