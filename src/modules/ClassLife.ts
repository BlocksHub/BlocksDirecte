import {Modules} from "./Modules";
import {CLASSLIFE_COMMENT_POST, CLASSLIFE_GET} from "../rest/endpoints";
import {decodeBase64JSON} from "../utils/json";
import {ClassLifeCommentId} from "../types/ClassLifeCommentId";
import {encodeBase64} from "../utils/base64";
import {DownloaderModules} from "./Downloader";

export class ClassLifeModules extends Modules {
    public async getClassLife(): Promise<ClassLife> {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<ClassLife>(
            CLASSLIFE_GET(
                account.profile.classe.id
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        );

        return decodeBase64JSON(res.data);
    }

    public async postComment(message: string, contentId: number): Promise<ClassLifeCommentId> {
        const account = this.getSelectedAccount();
        const encodedMessage = encodeBase64(message);

        const res = await this.restManager.post<ClassLife>(
            CLASSLIFE_COMMENT_POST(
                account.typeCompte,
                account.id
            ),
            {
                message: encodedMessage,
                idContenu: contentId,
            },
            {
                "X-Token": this.credentials.token!
            }
        );

        return decodeBase64JSON(res.data);
    }
}