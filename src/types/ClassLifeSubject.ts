import {Comment} from "./Comment";
import {CloudFile} from "./CloudFile";

export interface ClassLifeSubject {
    libelle: string;
    id: string;
    idCDT: number;
    dateMiseAJour: string;
    contenu: string;
    commentaires: Comment[];
    fichiers: CloudFile[];
}