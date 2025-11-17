import {Account} from "./Account";

export interface Credential {
    token?: string;
    accounts: Account[];
    selectedAccounts: number;
}