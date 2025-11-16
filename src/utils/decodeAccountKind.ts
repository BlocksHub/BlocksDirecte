import AccountKind from "../types/AccountKind";

function decodeAccountKind(account_kind: AccountKind) {
	switch (account_kind) {
		case AccountKind.Student:
			return "eleves";
		case AccountKind.Family1:
			return "familles";
		case AccountKind.Family2:
			return "familles";
		case AccountKind.Staff:
			return "personnels";
		case AccountKind.Teacher:
			return "enseignants";
	}
}

export default decodeAccountKind;