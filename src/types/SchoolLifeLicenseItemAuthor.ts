import AccountKind from "./AccountKind";

export interface SchoolLifeLicenseItemAuthor {
    id: number;
    nom: string;
    prenom: string;
    civilite: string;
    particule: string;
    type: AccountKind;
}