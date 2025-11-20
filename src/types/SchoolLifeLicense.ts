import {SchoolLifeLicenseItem} from "./SchoolLifeLicenseItem";

export interface SchoolLifeLicense {
    idPermis: number;
    libellePermis: string;
    dateDebut: string;
    dateFin: string;
    totalPoints: number;
    evenements: SchoolLifeLicenseItem[];
}