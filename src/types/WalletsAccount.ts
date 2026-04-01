import {WalletsAccountTransaction} from "./WalletsAccountTransaction";

export interface WalletsAccount {
  id: number;
  idEleve: number;
  typeCompte: "portemonnaie" | string;
  isPMPayable: boolean;
  disponible: boolean;
  montantVersement: number;
  montantModifiable: boolean;
  quantiteModifiable: boolean;
  codeCompte: string;
  idServiceClasse: string;
  libelle: string;
  libelleCompte: string;
  solde: number;
  avenir: unknown[];
  ecritures: WalletsAccountTransaction[];
}