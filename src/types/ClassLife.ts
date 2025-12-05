import {Comment} from "./Comment";
import {CloudFile} from "./CloudFile";
import {ClassLifeSubject} from "./ClassLifeSubject";

export interface ClassLife {
    classe: string;
    contenu: string;
    idCDT: number;
    profPrincipal: boolean;
    commentaires: Comment[];
    fichiers: CloudFile[];
    matieres: ClassLifeSubject;
}