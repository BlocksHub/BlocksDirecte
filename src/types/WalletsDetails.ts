import {WalletsAccount} from "./WalletsAccount";

export interface WalletsDetails {
  comptes: WalletsAccount[];
  parametrage: {
	paiementSoldeCrediteur: boolean;
	porteMonnaie: boolean;
  }
}