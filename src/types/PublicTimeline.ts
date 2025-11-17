import {PublicTimelineEvent} from "./PublicTimelineEvent";
import {PublicTimelinePostIt} from "./PublicTimelinePostIt";

export interface PublicTimeline {
    evenements: PublicTimelineEvent[];
    postits: PublicTimelinePostIt[];
}