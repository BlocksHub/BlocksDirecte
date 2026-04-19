import {Modules} from "./Modules";
import {BASE_URL, DOWNLOADER_URL, USER_AGENT} from "../rest/endpoints";
import {cleanJSON} from "../utils/json";
import {BinaryRequest, BinaryResponse, DownloadBodyParams, DownloadRequest} from "../types/DownloadRequest";
import {CloudFile} from "../types/CloudFile";

const ECOLEDIRECTE_ORIGIN = "https://www.ecoledirecte.com";
const PROFILE_PHOTO_ACCEPT = "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5";

export class DownloaderModules extends Modules {
    private async executeBinaryRequest(request: BinaryRequest): Promise<BinaryResponse> {
        const response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch binary resource (${response.status} ${response.statusText})`);
        }

        return {
            data: await response.arrayBuffer(),
            contentType: response.headers.get("content-type") ?? undefined,
            contentDisposition: response.headers.get("content-disposition") ?? undefined,
            fileName: getResponseFileName(response.headers.get("content-disposition") ?? undefined),
        };
    }

    private getDownloadData(bodyParams?: DownloadBodyParams): Record<string, string | number | boolean> {
        return cleanJSON({ forceDownload: 0, ...bodyParams });
    }

    private getDownloadBody(bodyParams?: DownloadBodyParams): string {
        return new URLSearchParams({
            data: JSON.stringify(this.getDownloadData(bodyParams)),
        }).toString();
    }

    public getDownloadURL(fileId: string | number, fileType: string): string {
        return new URL(DOWNLOADER_URL(fileId, fileType), BASE_URL).toString();
    }

    public getDownloadHeaders(): Record<string, string> {
        return this.getAuthHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://www.ecoledirecte.com",
            "Referer": "https://www.ecoledirecte.com/",
            "User-Agent": USER_AGENT,
        });
    }

    public getDownloadRequest(fileId: string | number, fileType: string, bodyParams?: DownloadBodyParams): DownloadRequest {
        return {
            url: this.getDownloadURL(fileId, fileType),
            method: "POST",
            headers: this.getDownloadHeaders(),
            body: this.getDownloadBody(bodyParams),
        };
    }

    public getBinaryDownloadRequest(fileId: string | number, fileType: string, bodyParams?: DownloadBodyParams): BinaryRequest {
        const request = this.getDownloadRequest(fileId, fileType, bodyParams);
        return {
            url: request.url,
            method: request.method,
            headers: request.headers,
            body: request.body,
        };
    }

    public async getDownloadBinary(fileId: string | number, fileType: string, bodyParams?: DownloadBodyParams): Promise<BinaryResponse> {
        return await this.executeBinaryRequest(
            this.getBinaryDownloadRequest(fileId, fileType, bodyParams)
        );
    }

    public getCloudFileRequest(file: CloudFile, bodyParams?: DownloadBodyParams): BinaryRequest {
        return this.getBinaryDownloadRequest(file.id, file.type, bodyParams);
    }

    public async getCloudFile(file: CloudFile, bodyParams?: DownloadBodyParams): Promise<BinaryResponse> {
        return await this.executeBinaryRequest(this.getCloudFileRequest(file, bodyParams));
    }

    public async getStream(fileId: string | number, fileType: string, bodyParams?: DownloadBodyParams): Promise<ReadableStream<Uint8Array<ArrayBuffer>> | null> {
        const request = this.getDownloadRequest(fileId, fileType, bodyParams);
        const url = new URL(request.url);

        return await this.restManager.getStream(
            `${url.pathname}${url.search}`,
            this.getDownloadData(bodyParams),
            request.headers
        );
    }

    public getProfilePhotoURL(): string | undefined {
        const profilePhotoURL = this.getSelectedAccount().profile?.photo;
        if (typeof profilePhotoURL !== "string" || profilePhotoURL.trim().length === 0) {
            return undefined;
        }

        return new URL(profilePhotoURL, ECOLEDIRECTE_ORIGIN).toString();
    }

    public getProfilePhotoHeaders(): Record<string, string> {
        const account = this.getSelectedAccount();
        this.checkToken();

        return {
            "Accept": PROFILE_PHOTO_ACCEPT,
            "Cache-Control": "no-cache",
            "Origin": ECOLEDIRECTE_ORIGIN,
            "Pragma": "no-cache",
            "Referer": `${ECOLEDIRECTE_ORIGIN}/`,
            "User-Agent": USER_AGENT,
            "Cookie": `OGEC_ED_CAS=${account.codeOgec}; TOKEN_ED_CAS_0=${this.credentials.token!}`,
        };
    }

    public getProfilePhotoRequest(): BinaryRequest | null {
        const profilePhotoURL = this.getProfilePhotoURL();
        if (!profilePhotoURL) {
            return null;
        }

        const url = new URL(profilePhotoURL);
        url.searchParams.set("_", Date.now().toString());

        return {
            url: url.toString(),
            method: "GET",
            headers: this.getProfilePhotoHeaders(),
        };
    }

    public async getProfilePhoto(): Promise<BinaryResponse | null> {
        const request = this.getProfilePhotoRequest();
        if (!request) {
            return null;
        }

        return await this.executeBinaryRequest(request);
    }
}

function getResponseFileName(contentDisposition?: string): string | undefined {
    if (!contentDisposition) {
        return undefined;
    }

    const encodedMatch = contentDisposition.match(/filename\*\s*=\s*(?:UTF-8''|utf-8'')?([^;]+)/i);
    if (encodedMatch?.[1]) {
        const decoded = decodeContentDispositionValue(encodedMatch[1]);
        if (decoded) {
            return decoded;
        }
    }

    const quotedMatch = contentDisposition.match(/filename\s*=\s*"([^"]+)"/i);
    if (quotedMatch?.[1]) {
        return quotedMatch[1].trim();
    }

    const plainMatch = contentDisposition.match(/filename\s*=\s*([^;]+)/i);
    return plainMatch?.[1]?.trim();
}

function decodeContentDispositionValue(value: string): string | undefined {
    const normalizedValue = value.trim().replace(/^"(.*)"$/, "$1");
    if (!normalizedValue) {
        return undefined;
    }

    try {
        return decodeURIComponent(normalizedValue);
    } catch {
        return normalizedValue;
    }
}
