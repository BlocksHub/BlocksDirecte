import AccountKind from "./AccountKind";

export interface SchoolLifeConductItemAuthor {
    id: number;
    nom: string;
    prenom: string;
    civilite: string;
    particule: string;
    type: AccountKind;
}