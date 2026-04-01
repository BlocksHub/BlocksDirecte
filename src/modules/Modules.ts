import {RESTManager} from "../rest/RESTManager";
import {Credential} from "../types/Credential";
import {InvalidAccountSelected} from "../errors/InvalidAccountSelected";
import {Module} from "../types/Module";
import {Account} from "../types/Account";
import {InvalidCredentials} from "../errors/InvalidCredentials";
import {UnsupportedModule} from "../errors/UnsupportedModule";

export class Modules {
    protected   restManager: RESTManager;
    protected   credentials: Credential;
    private     moduleName?: string;

    /**
     * Create a new module
     * @constructor
     * @param {RESTManager} restManager The RESTManager to use in the current module
     * @param {Credential} credentials The credentials to sync with the parent Client
     * @param {string?} moduleName The current module code used by EcoleDirecte.
     */
    constructor(restManager: RESTManager, credentials: Credential, moduleName?: string) {
        this.restManager = restManager;
        this.credentials = credentials;
        this.moduleName = moduleName;
    }

    protected checkToken(): void {
        if (!this.credentials.token)
            throw new InvalidCredentials("No token found in this client. Please login first.");
    }

    /**
     * Check if the current selected account is valid.
     * @private
     * @throws
     */
    protected checkSelectedAccount(): void {
        if (this.credentials.selectedAccounts === -1) throw new InvalidAccountSelected("No account has been selected. Select an account before using this action.");
        if (this.credentials.selectedAccounts < 0) throw new InvalidAccountSelected("The account selection can't be negative.")
        if (this.credentials.accounts.length === 0) throw new InvalidAccountSelected("The accounts list is empty. Make sure you're logged in.");
        if (this.credentials.selectedAccounts > this.credentials.accounts.length) throw new InvalidAccountSelected("The account selection is superior than the accounts list length.");
    }

    /**
     * Check if the current module is supported by the selected account.
     * @private
     * @return boolean
     * @throws
     */
    protected isModuleAvailableForSelectedAccount(): boolean {
        if (!this.moduleName) throw new Error("[Developer note] 'moduleName' is unset. Make sure you're initialising the module with it before using this function.");

        const accounts = this.getSelectedAccount();
        let module: Module | undefined = accounts.modules.find((module) => module.code === this.moduleName );
        return (typeof module !== "undefined");
    }

    protected getSelectedAccountWithModuleName(moduleName: string | undefined): Account
    {
        this.checkSelectedAccount();

        const account: Account = this.credentials.accounts[this.credentials.selectedAccounts];

        if (moduleName !== undefined && !this.isModuleAvailableForSelectedAccount())
            throw new UnsupportedModule(`The selected account does not support the module "${this.moduleName}"`);
        return (account);
    }

    protected getSelectedAccount(): Account
    {
        return this.getSelectedAccountWithModuleName(this.moduleName);
    }
}