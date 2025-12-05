import {CloudFile} from "./CloudFile";
import {HomeworkTags} from "./HomeworkTags";
import {HandbookLink} from "./HandbookLink";
import {Skill} from "./Skill";

export interface Homework {
    idDevoir: number;
    contenu: string;
    rendreEnLigne: boolean;
    donneLe: string;
    effectue: boolean;
    ressource: string;
    documentsRendusDeposes: boolean;
    ressourceDocuments: CloudFile[];
    documents: CloudFile[];
    commentaires: Comment[];
    elementsProg: Skill[];
    liensManuel: HandbookLink[];
    documentsRendus: CloudFile[];
    tags: HomeworkTags[];
    cdtPersonnalises: any[];
    contenuDeSeance: {
        contenu: string;
        documents: CloudFile[];
        commentaires: Comment[];
    }
}