import {Modules} from "./Modules";
import {Invalid2FAKey} from "../errors/Invalid2FAKey";
import {ServerResponse} from "../types/ServerResponse";
import {AUTH_2FA_GET, AUTH_2FA_POST, AUTH_LOGIN} from "../rest/endpoints";
import {Require2FA} from "../errors/Require2FA";
import {InvalidCredentials} from "../errors/InvalidCredentials";
import {AuthentificationCredential, AuthentificationCredentialWithToken} from "../types/AuthentificationCredential";
import {DoubleAuthQuestions} from "../types/DoubleAuthQuestions";
import {decodeBase64JSON} from "../utils/json";
import {DoubleAuthResult} from "../types/DoubleAuthResult";
import {encodeBase64} from "../utils/base64";
import {BadAnswer2FA} from "../errors/BadAnswer2FA";
import {InvalidAccountSelected} from "../errors/InvalidAccountSelected";
import {Account} from "../types/Account";
import AccountKind from "../types/AccountKind";

export class AuthModules extends Modules {
    public async loginUsername(
        username: string,
        password: string,
        cnKey?: string,
        cvKey?: string,
        keepSessionOpen?: boolean,
        deviceUUID?: string
    ): Promise<AuthentificationCredentialWithToken> {
        if ((!cnKey && cvKey) || (cnKey && !cvKey)) throw new Invalid2FAKey(`Missing ${(!cnKey && cvKey) ? "cnKey" : "cvKey"}. You must provide both cnKey and cvKey`)

        const res: ServerResponse<AuthentificationCredential> = await this.restManager.post<AuthentificationCredential>(
            AUTH_LOGIN(),
            {
                isReLogin: false,
                identifiant: username,
                motdepasse: password,
                cn: cnKey ?? undefined,
                cv: cvKey ?? undefined,
                sesouvenirdemoi: keepSessionOpen ?? undefined,
                uuid: deviceUUID ?? undefined,
            }
        );

        switch (res.code) {
            case 250:
                throw new Require2FA("Your account require 2FA to login.", res.headers.get("x-token")!);
            case 505:
                throw new InvalidCredentials("Username or password is invalid.");
            default: {
                const token2fa = res.headers.get("2fa-token") ?? this.credentials.token2fa ?? undefined;
                Object.assign(this.credentials, {token: res.token, token2fa, accounts: res.data.accounts});
                return {...res.data, token: res.token}
            }
        }
    }

    public async refreshToken(
        username: string,
        accountKind: AccountKind,
        token: string,
        cnKey?: string,
        cvKey?: string,
        deviceUUID?: string
    ): Promise<AuthentificationCredentialWithToken> {

        const res: ServerResponse<AuthentificationCredential> = await this.restManager.post<AuthentificationCredential>(
            AUTH_LOGIN(),
            {
                identifiant: username,
                uuid: deviceUUID,
                isReLogin: true,
                motdepasse: "???",
                typeCompte: accountKind,
                accesstoken: token,
                fa: [
                    {
                        cn: cnKey,
                        cv: cvKey
                    }
                ],
            }
        );

        switch (res.code) {
            case 250:
                throw new Require2FA("Your account require 2FA to login.", res.headers.get("x-token")!);
            case 505:
                throw new InvalidCredentials("Username or token is invalid.");
            default: {
                const token2fa = res.headers.get("2fa-token") ?? this.credentials.token2fa ?? undefined;
                Object.assign(this.credentials, {token: res.token, token2fa, accounts: res.data.accounts});
                return {...res.data, token: res.token}
            }
        }
    }

    public async get2FAQuestion(token: string): Promise<DoubleAuthQuestions> {
        const res: ServerResponse<DoubleAuthQuestions> = await this.restManager.post(
            AUTH_2FA_GET(),
            {},
            {"X-Token": token}
        );

        if (res.code === 520) throw new Invalid2FAKey(`Token is invalid.`);

        return decodeBase64JSON(res.data);
    }

    public async send2FAQuestion(response: string, token: string): Promise<DoubleAuthResult> {
        const res = await this.restManager.post<DoubleAuthResult>(
            AUTH_2FA_POST(),
            {
                choix: encodeBase64(response),
            },
            {"X-Token": token}
        );

        switch (res.code) {
            case 505:
                throw new BadAnswer2FA("The response you provided is invalid.");
            case 520:
                throw new Invalid2FAKey(`Token is invalid.`);
            default:
                return res.data;
        }
    }

    public setAccount(index: number) {
        if (index < 0 || index > this.credentials.accounts.length) throw new InvalidAccountSelected("Invalid account can't be found in the accounts list. Make sur to login first.");
        Object.assign(this.credentials, {selectedAccounts: index});
    }

    public getAccount(): Account {
        this.checkSelectedAccount();
        return (this.credentials.accounts[this.credentials.selectedAccounts]);
    }
}
