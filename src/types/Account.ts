import AccountKind from "./AccountKind";
import {AccountIndividualSettings} from "./AccountIndividualSettings";
import {Module} from "./Module";

export interface Account {
    idLogin: number;
    id: number;
    uid: string;
    identifiant: string;
    typeCompte: AccountKind;
    codeOgec: string;
    main: boolean;
    lastConnexion: string;
    civilite: string;
    prenom: string;
    particule: string;
    nom: string;
    email: string;
    anneeScolaireCourante: string;
    nomEtablissement: string;
    logoEtablissement: string;
    couleurAgendaEtablissement: string;
    dicoEnLigneLeRobert: boolean;
    socketToken: string;
    modules: Module[];
    parametresIndividuels: AccountIndividualSettings;
}