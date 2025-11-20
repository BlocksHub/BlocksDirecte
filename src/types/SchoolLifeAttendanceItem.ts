import {SchoolLifeAttendanceItemType} from "./SchoolLifeAttendanceItemType";

export interface SchoolLifeAttendanceItem {
    id: number;
    idEleve: number;
    nomEleve: number;
    typeElement: SchoolLifeAttendanceItemType;
    date: string;
    displayDate: string;
    libelle: string;
    motif: string;
    justifie: boolean;
    par: string;
    pointsPermis: number;
    commentaire: string;
    typeJustification: string;
    justifieEd: boolean;
    dontNeedJustifiePrim: boolean;
    aFaire: string;
    dateDeroulement: string;
    matiere: string;
    presence: boolean;
    jour: number;
}