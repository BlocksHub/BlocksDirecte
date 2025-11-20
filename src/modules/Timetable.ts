import {Modules} from "./Modules";
import {BASE_URL, TIMETABLE_GET, TIMETABLE_ICS_GET} from "../rest/endpoints";
import {dateToEDFormat} from "../utils/formatDate";
import {TimetableCourse} from "../types/TimetableCourse";
import {TimetableICalURL} from "../types/TimetableICalURL";

export class TimetableModules extends Modules {
    public async getTimetableBetweenDates(from: Date, to: Date, includeBreak: Boolean = false): Promise<TimetableCourse[]>
    {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<TimetableCourse[]>(
            TIMETABLE_GET(
                account.typeCompte,
                account.id
            ),
            {
                dateDebut: dateToEDFormat(from),
                dateFin: dateToEDFormat(to),
                avecTrous: includeBreak,
            },
            {
                "X-Token": this.credentials.token!
            }
        )

        return (res.data);
    }

    public async getTimetableICalURL(): Promise<TimetableICalURL>
    {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<TimetableICalURL>(
            TIMETABLE_ICS_GET(
                account.typeCompte,
                account.id
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        )

        res.data.url = `${BASE_URL}/${res.data.url}`;

        return (res.data);
    }
}