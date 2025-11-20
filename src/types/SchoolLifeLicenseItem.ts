import {SchoolLifeLicenseItemAuthor} from "./SchoolLifeLicenseItemAuthor";

export interface SchoolLifeLicenseItem {
    id: number;
    date: string;
    pointsPermis: number;
    motif: string;
    libelle: string;
    commentaire: string;
    typeElement: "Permis";
    auteur: SchoolLifeLicenseItemAuthor
}