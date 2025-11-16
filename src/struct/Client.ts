import {RESTManager} from "../rest/RESTManager";
import {Credential} from "../types/Credential";
import {AuthModules} from "../modules/Auth";

export class Client {
    private restManager: RESTManager;
    private credentials: Credential = {};

    public auth: AuthModules;

    constructor(credential?: Credential) {
        if (credential) this.credentials = credential;
        this.restManager = new RESTManager();

        this.auth = new AuthModules(this.restManager, this.credentials);
    }
}