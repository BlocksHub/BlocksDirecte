import AccountKind from "../types/AccountKind";
import {decodeAccountKind, decodeAccountKindUppercase} from "../utils/decodeAccountKind";

/* *************************************************************** */
/* Base config                                                     */
/* *************************************************************** */

export const BASE_URL: string = 'https://api.ecoledirecte.com';
export const API_VERSION: string = '7.8.2';
export const USER_AGENT: string = 'BlocksDirecte/1.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148  EDMOBILE v' + API_VERSION;

/* *************************************************************** */
/* Modules - Downloader                                            */
/* *************************************************************** */

export const DOWNLOADER_URL = (fileId: number, filetype: string) => `/v3/telechargement.awp?verbe=get&fichierId=${fileId}&leTypeDeFichier=${filetype}`;

/* *************************************************************** */
/* Modules - Auth                                                  */
/* *************************************************************** */

export const AUTH_LOGIN = () => '/v3/login.awp';
export const AUTH_GTK = () => '/v3/login.awp?gtk=1';
export const AUTH_2FA_GET = () => '/v3/connexion/doubleauth.awp?verbe=get';
export const AUTH_2FA_POST= () => '/v3/connexion/doubleauth.awp?verbe=post';

/* *************************************************************** */
/* Modules - Visios                                                */
/* *************************************************************** */

export const VISIOS_GET = (account_kind: AccountKind, account_id: number) => `/v3/${account_kind}/${account_id}/visios.awp?verbe=get`;

/* *************************************************************** */
/* Modules - Polls                                                 */
/* *************************************************************** */

export const POLLS_GET = () => '/v3/rdt/sondages.awp?verbe=get';

/* *************************************************************** */
/* Modules - Timeline                                              */
/* *************************************************************** */

export const TIMELINE_GET_PRIVATE = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKind(account_kind)}/${account_id}/timeline.awp?verbe=get`;
export const TIMELINE_GET_PUBLIC = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKind(account_kind)}/${account_id}/timelineAccueilCommun.awp?verbe=get`;

/* *************************************************************** */
/* Modules - Forms                                                 */
/* *************************************************************** */

export const FORMS_LIST = () => '/v3/edforms.awp?verbe=list';

/* *************************************************************** */
/* Modules - Timetable                                             */
/* *************************************************************** */

export const TIMETABLE_GET = (account_kind: AccountKind, account_id: number) => `/v3/${account_kind}/${account_id}/emploidutemps.awp?verbe=get`;
export const TIMETABLE_ICS_GET = (account_kind: AccountKind, account_id: number) => `/v3/ical/${account_kind}/${account_id}/url.awp?verbe=get`;

/* *************************************************************** */
/* Modules - School Life                                           */
/* *************************************************************** */

export const SCHOOLLIFE_GET = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKind(account_kind)}/${account_id}/viescolaire.awp?verbe=get`

/* *************************************************************** */
/* Modules - Class Life                                            */
/* *************************************************************** */

export const CLASSLIFE_GET = (class_id: number) => `/v3/Classes/${class_id}/viedelaclasse.awp?verbe=get`
export const CLASSLIFE_COMMENT_POST =  (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKind(account_kind)}/${account_id}/viedelaclasse/commentaires.awp?verbe=post`

/* *************************************************************** */
/* Modules - Mark                                                  */
/* *************************************************************** */

export const MARKS_GET = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKind(account_kind)}/${account_id}/notes.awp?verbe=get`;

/* *************************************************************** */
/* Modules - Homework                                              */
/* *************************************************************** */

export const HOMEWORK_DATE_GET = (account_kind: AccountKind, account_id: number, date: string) => `/v3/${decodeAccountKindUppercase(account_kind)}/${account_id}/cahierdetexte/${date}.awp?verbe=get`;
export const HOMEWORK_GET = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKindUppercase(account_kind)}/${account_id}/cahierdetexte.awp?verbe=get`;
export const HOMEWORK_PUT = (account_kind: AccountKind, account_id: number) => `/v3/${decodeAccountKindUppercase(account_kind)}/${account_id}/cahierdetexte.awp?verbe=put`;

/* *************************************************************** */
/* Modules - WalletS                                               */
/* *************************************************************** */

export const WALLETS_DETAILS = () => '/v3/comptes/detail.awp?verbe=get';