import {Account} from "./Account";

export interface AuthentificationCredential {
    changementMDP: boolean,
    nbJourMdpExire: number,
    accounts: Account[]
}

export interface AuthentificationCredentialWithToken extends AuthentificationCredential {
    token: string;
}