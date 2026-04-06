import {RESTManager} from "../rest/RESTManager";
import {Credential} from "../types/Credential";
import {AuthModules} from "../modules/Auth";
import {TimelineModules} from "../modules/Timeline";
import {TimetableModules} from "../modules/Timetable";
import {SchoolLifeModules} from "../modules/SchoolLife";
import {ClassLifeModules} from "../modules/ClassLife";
import {DownloaderModules} from "../modules/Downloader";
import {MarkModules} from "../modules/Mark";
import {HomeworkModules} from "../modules/Homework";
import {WalletsModule} from "../modules/Wallets";


export class Client {
    private restManager: RESTManager;
    private credentials: Credential = { accounts: [], selectedAccounts: -1 };

    public downloader: DownloaderModules;
    public auth: AuthModules;
    public timeline: TimelineModules;
    public timetable: TimetableModules;
    public schoollife: SchoolLifeModules;
    public classlife: ClassLifeModules;
    public marks: MarkModules;
    public homework: HomeworkModules;
    public wallets: WalletsModule;

    constructor(credential?: Credential) {
        if (credential) this.credentials = credential;
        this.restManager = new RESTManager();

        this.downloader = new DownloaderModules(this.restManager, this.credentials);
        this.auth = new AuthModules(this.restManager, this.credentials);
        this.timeline = new TimelineModules(this.restManager, this.credentials);
        this.timetable = new TimetableModules(this.restManager, this.credentials, "EDT");
        this.schoollife = new SchoolLifeModules(this.restManager, this.credentials, "VIE_SCOLAIRE");
        this.classlife = new ClassLifeModules(this.restManager, this.credentials, "VIE_DE_LA_CLASSE");
        this.marks = new MarkModules(this.restManager, this.credentials, "NOTES");
        this.homework = new HomeworkModules(this.restManager, this.credentials, "CAHIER_DE_TEXTES");
        this.wallets = new WalletsModule(this.restManager, this.credentials, "SITUATION_FINANCIERE");
    }

    public getToken2FA(): string | undefined {
        return this.credentials.token2fa;
    }
}
