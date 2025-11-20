import {Modules} from "./Modules";
import {SCHOOLLIFE_GET} from "../rest/endpoints";

export class SchoolLife extends Modules {
    public async getSchoolLife(): Promise<SchoolLife> {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<SchoolLife>(
            SCHOOLLIFE_GET(
                account.typeCompte,
                account.id
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        );

        return res.data;
    }
}