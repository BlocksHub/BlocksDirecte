import {RequestOptions} from "../types/RequestHandler";
import {ServerResponse} from "../types/ServerResponse";
import {API_VERSION, BASE_URL, USER_AGENT} from "./endpoints";
import {cleanJSON} from "../utils/json";

type QueuedRequest<T> = {
    options: RequestOptions;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export class RESTManager {
    private queue: QueuedRequest<any>[] = [];
    private requestsSent = 0;
    private readonly MAX_REQUESTS_PER_MINUTE = 100;
    private readonly INTERVAL_MS = 60000;

    constructor() {
        setInterval(() => {
            this.requestsSent = 0;
            this.processQueue();
        }, this.INTERVAL_MS);
    }

    private async sendRequest<T>(options: RequestOptions): Promise<ServerResponse<T>> {
        const { method, path, body, headers } = options;
        const url = new URL(`${BASE_URL}${path}`);
        url.searchParams.set("v", API_VERSION);


        const response = await fetch(url, {
            method,
            body: body,
            headers: {
                "Content-Type": "x-www-form-urlencoded",
                "User-Agent": USER_AGENT,
                ...headers,
            },
            redirect: "manual",
        });

        if (!response.ok) throw new Error(`${response.status}: ${response.statusText} (Received '${await response.text()}')`);

        const json = await response.json() as ServerResponse<T>;
        json.headers = response.headers;

        return json;
    }

    private enqueueRequest<T>(options: RequestOptions): Promise<ServerResponse<T>> {
        return new Promise<ServerResponse<T>>((resolve, reject) => {
            this.queue.push({ options, resolve, reject });
            this.processQueue();
        });
    }

    private processQueue() {
        while (this.requestsSent < this.MAX_REQUESTS_PER_MINUTE && this.queue.length > 0) {
            const { options, resolve, reject } = this.queue.shift()!;
            this.requestsSent++;
            this.sendRequest<any>(options).then(resolve).catch(reject);
        }
    }

    async get<T>(path: string, headers?: Record<string, string>): Promise<ServerResponse<T>> {
        return this.enqueueRequest<T>({
            method: "GET",
            path,
            headers
        });
    }

    async post<T>(path: string, body: object, headers?: Record<string, string>): Promise<ServerResponse<T>> {
        return this.enqueueRequest<T>({
            method: "POST",
            path,
            body: new URLSearchParams({
                data: JSON.stringify(cleanJSON(body)),
            }).toString(),
            headers: headers
        });
    }

    async put<T>(path: string, body: object, headers?: Record<string, string>): Promise<ServerResponse<T>> {
        return this.enqueueRequest<T>({
            method: "PUT",
            path,
            body: new URLSearchParams({
                data: JSON.stringify(cleanJSON(body)),
            }).toString(),
            headers: headers
        });
    }

    async delete<T>(path: string, headers?: Record<string, string>): Promise<ServerResponse<T>> {
        return this.enqueueRequest<T>({
            method: "DELETE",
            path: path,
            headers: headers
        });
    }

    async getStream(path: string, body: object, headers?: Record<string, string>): Promise<ReadableStream<Uint8Array<ArrayBuffer>> | null> {
        const url = new URL(`${BASE_URL}${path}`);

        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                data: JSON.stringify(cleanJSON(body)),
            }).toString(),
            headers: {
                "Content-Type": "x-www-form-urlencoded",
                "User-Agent": USER_AGENT,
                ...headers,
            },
            redirect: "manual",
        });

        return (response.body);
    }
}