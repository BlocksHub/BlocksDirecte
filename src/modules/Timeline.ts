import {Modules} from "./Modules";
import {PersonalTimelineItem} from "../types/PersonalTimelineItem";
import {TIMELINE_GET_PRIVATE, TIMELINE_GET_PUBLIC} from "../rest/endpoints";
import {PublicTimeline} from "../types/PublicTimeline";

export class TimelineModules extends Modules {
    public async getPersonalTimeline(): Promise<PersonalTimelineItem[]>
    {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<PersonalTimelineItem[]>(
            TIMELINE_GET_PRIVATE(
                account.typeCompte,
                account.id
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        )

        return (res.data);
    }

    public async getPublicTimeline(): Promise<PublicTimeline>
    {
        const account = this.getSelectedAccount();

        const res = await this.restManager.post<PublicTimeline>(
            TIMELINE_GET_PUBLIC(
                account.typeCompte,
                account.id
            ),
            {},
            {
                "X-Token": this.credentials.token!
            }
        )

        return (res.data);
    }
}