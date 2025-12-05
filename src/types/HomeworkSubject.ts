import {HomeworkEntityType} from "./HomeworkEntityType";
import {HomeworkLessonContent} from "./HomeworkLessonContent";
import {Homework} from "./Homework";

export interface HomeworkSubject {
    entityCode: string;
    entityLibelle: string;
    entityType: HomeworkEntityType;
    matiere: string;
    codeMatiere: string;
    nomProf: string;
    id: number;
    interrogation: boolean;
    blogActif: boolean;
    nbJourMaxRenduDevoir: number;
    aFaire?: Homework;
    contenuDeSeance?: HomeworkLessonContent;
}