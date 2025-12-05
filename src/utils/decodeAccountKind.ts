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

function decodeAccountKindUppercase(account_kind: AccountKind) {
    switch (account_kind) {
        case AccountKind.Student:
            return "Eleves";
        case AccountKind.Family1:
            return "Familles";
        case AccountKind.Family2:
            return "Familles";
        case AccountKind.Staff:
            return "Personnels";
        case AccountKind.Teacher:
            return "Enseignants";
    }
}

export { decodeAccountKind, decodeAccountKindUppercase };