import {Modules} from "./Modules";
import {WALLETS_DETAILS} from "../rest/endpoints";
import {WalletsDetails} from "../types/WalletsDetails";
import {Account} from "../types/Account";
import {Module} from "../types/Module";

export class WalletsModule extends Modules {
  public async getDetails(): Promise<WalletsDetails>
  {
	this.getSelectedAccount();

	const res = await this.restManager.post<WalletsDetails>(
	  WALLETS_DETAILS(),
	  {},
	  {
		"X-Token": this.credentials.token!
	  }
	)

	return (res.data);
  }

  public getBadgeNumber(): string
  {
	const account: Account = this.getSelectedAccountWithModuleName("CANTINE_BARCODE");
	const module: Module = account.modules.find((module) => module.code === "CANTINE_BARCODE")!;
	const params: { numeroBadge: string } = module.params as { numeroBadge: string };
	return (params.numeroBadge);
  }
}