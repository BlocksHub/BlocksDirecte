import {Modules} from "./Modules";
import {DOWNLOADER_URL} from "../rest/endpoints";

export class DownloaderModules extends Modules {
    public async getStream(fileId: number, fileType: string): Promise<ReadableStream<Uint8Array<ArrayBuffer>> | null> {
        this.checkToken();

        const stream: ReadableStream<Uint8Array<ArrayBuffer>> | null = await this.restManager.getStream(
            DOWNLOADER_URL(fileId, fileType),
            { forceDownload: 0 },
            {
                "X-Token": this.credentials.token!
            }
        );

        return stream;
    }
}