export type DownloadBodyParams = Record<string, string | number | boolean | undefined>;

export interface DownloadRequest {
    url: string;
    method: "POST";
    headers: Record<string, string>;
    body: string;
}

export interface BinaryRequest {
    url: string;
    method: "GET" | "POST";
    headers: Record<string, string>;
    body?: string;
}

export interface BinaryResponse {
    data: ArrayBuffer;
    contentType?: string;
    contentDisposition?: string;
    fileName?: string;
}
