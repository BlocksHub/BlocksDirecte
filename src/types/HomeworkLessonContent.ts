import {CloudFile} from "./CloudFile";
import {Skill} from "./Skill";
import {HandbookLink} from "./HandbookLink";

export interface HomeworkLessonContent {
    idDevoir: number;
    contenu: string;
    documents: CloudFile[];
    commentaires: Comment[];
    elementsProg: Skill[];
    liensManuel: HandbookLink[];
}