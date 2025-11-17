import {PersonalTimelineEventType} from "./PersonalTimelineEventType";

export interface PersonalTimelineItem {
    date: string;
    typeElement: PersonalTimelineEventType;
    idElement: number;
    titre: string;
    soustitre: string;
    contenu: string;
}