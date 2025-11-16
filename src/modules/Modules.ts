import {RESTManager} from "../rest/RESTManager";
import {Credential} from "../types/Credential";

export class Modules {
    protected restManager: RESTManager;
    protected credentials: Credential;

    constructor(restManager: RESTManager, credentials: Credential) {
        this.restManager = restManager;
        this.credentials = credentials;
    }
}