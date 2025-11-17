import {PublicTimelinePostItAuthor} from "./PublicTimelinePostItAuthor";
import {PublicTimelineTarget} from "./PublicTimelineTarget";
import {PublicTimelinePostItType} from "./PublicTimelinePostItType";

export interface PublicTimelinePostIt {
    id: number;
    auteur: PublicTimelinePostItAuthor;
    cible: PublicTimelineTarget[];
    ciblesEtab: number[];
    contenu: string;
    dateCreation: string;
    dateDebut: string;
    dateFin: string;
    type: PublicTimelinePostItType;
}