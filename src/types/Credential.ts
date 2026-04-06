import {Account} from "./Account";

export interface Credential {
    token?: string;
    token2fa?: string;
    accounts: Account[];
    selectedAccounts: number;
}
