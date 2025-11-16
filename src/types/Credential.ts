import AccountKind from "./AccountKind";

export interface Credential {
    token?: string;
    accountId?: number;
    accountType?: AccountKind;
}