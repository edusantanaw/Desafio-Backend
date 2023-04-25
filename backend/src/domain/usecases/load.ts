export interface ILoadUsecase<T> {
    execute: () => Promise<T>
}