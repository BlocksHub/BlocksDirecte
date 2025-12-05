import {Modules} from "./Modules";
import {InvalidSchoolYearFormat} from "../errors/InvalidSchoolYearFormat";
import {HOMEWORK_DATE_GET, HOMEWORK_GET, HOMEWORK_PUT} from "../rest/endpoints";
import {decodeBase64JSON} from "../utils/json";
import {HomeworkDate} from "../types/HomeworkDate";
import {HomeworkUpcoming} from "../types/HomeworkUpcoming";

export class HomeworkModules extends Modules {
    public async getUpcomingHomework(): Promise<HomeworkUpcoming> {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<HomeworkUpcoming>(
            HOMEWORK_GET(
                account.typeCompte,
                account.id,
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        );

        return (res.data)
    }

    public async getHomeworksForDate(date: string): Promise<HomeworkDate> {
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g.test(date))
            throw new InvalidSchoolYearFormat("The string your provided doesn't follow format 'XXXX-XX-XX'");
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<HomeworkDate>(
            HOMEWORK_DATE_GET(
                account.typeCompte,
                account.id,
                date
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        );

        return decodeBase64JSON(res.data);
    }

    public async updateHomeworkStatus(done: number[], undone: number[]): Promise<void> {
        const account = this.getSelectedAccount();

        // No need to check code here, the response code is always 200, even on bad input...
        await this.restManager.post<undefined>(
            HOMEWORK_PUT(
                account.typeCompte,
                account.id,
            ),
            {
                idDevoirsEffectues: done,
                idDevoirsNonEffectues: undone
            },
            {
                "X-Token": this.credentials.token!
            }
        );
    }

    public async markHomeworkAsDone(id: number | number[]): Promise<void> {
        const ids = typeof id === "number" ? [id] : id;
        await this.updateHomeworkStatus(ids, []);
    }

    public async markHomeworkAsUndone(id: number | number[]): Promise<void> {
        const ids = typeof id === "number" ? [id] : id;
        await this.updateHomeworkStatus([], ids);
    }
}