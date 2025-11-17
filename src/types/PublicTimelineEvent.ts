import {PublicTimelineTarget} from "./PublicTimelineTarget";

export interface PublicTimelineEvent {
    cibles: PublicTimelineTarget[];
    ciblesEtab: number[];
    dateDebut: string;
    dateFin: string;
    dateFormatee: string;
    description: string;
    heureDebut: string;
    heureFin: string;
    id: number;
    isVisio: boolean;
    isVisioAccessible: boolean;
    libelle: string;
    theme: string;
}