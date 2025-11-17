import {PublicTimelineTarget} from "./PublicTimelineTarget";

export interface PublicTimelinePostItAuthor {
    id: string;
    civilite: string;
    nom: string;
    particule: string;
    prenom: string;
    type: PublicTimelineTarget;
}