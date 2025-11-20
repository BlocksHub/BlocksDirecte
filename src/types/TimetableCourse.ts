import {TimetableCourseType} from "./TimetableCourseType";

export interface TimetableCourse {
    id: number;
    text: string;
    matiere: string;
    codeMatiere: string;
    typeCours: TimetableCourseType;
    start_date: string;
    end_date: string;
    color: string;
    dispensable: boolean;
    dispense: number;
    prof: string;
    salle: string;
    classeId: number;
    classe: string;
    classeCode: string;
    groupeId: number;
    groupe: string;
    groupeCode: string;
    isFlexible: boolean;
    icone: string;
    isModifie: boolean;
    contenuDeSeance: boolean;
    devoirAFaire: boolean;
    isAnnule: boolean;
    evenementId: number;
}