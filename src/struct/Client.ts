import {RESTManager} from "../rest/RESTManager";
import {Credential} from "../types/Credential";
import {AuthModules} from "../modules/Auth";
import {TimelineModules} from "../modules/Timeline";
import {TimetableModules} from "../modules/Timetable";

export class Client {
    private restManager: RESTManager;
    private credentials: Credential = { accounts: [], selectedAccounts: -1 };

    public auth: AuthModules;
    public timeline: TimelineModules;
    public timetable: TimetableModules;

    constructor(credential?: Credential) {
        if (credential) this.credentials = credential;
        this.restManager = new RESTManager();

        this.auth = new AuthModules(this.restManager, this.credentials);
        this.timeline = new TimelineModules(this.restManager, this.credentials);
        this.timetable = new TimetableModules(this.restManager, this.credentials, "EDT");
    }
}