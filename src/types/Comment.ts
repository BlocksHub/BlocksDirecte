import AccountKind from "./AccountKind";

export interface Comment {
    id: number;
    idAuteur: number;
    profilAuteur: AccountKind;
    auteur: string;
    date: string;
    message: string;
    supprime: boolean;
}