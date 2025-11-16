export interface ServerResponse<T> {
    code: number;
    token: string;
    message?: string;
    host: string;
    data: T;
    headers: Headers;
}