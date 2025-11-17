import AccountKind from "../types/AccountKind";
import decodeAccountKind from "../utils/decodeAccountKind";

/* *************************************************************** */
/* Base config                                                     */
/* *************************************************************** */

export const BASE_URL: string = 'https://api.ecoledirecte.com';
export const API_VERSION: string = '7.7.2';
export const USER_AGENT: string = 'BlocksDirecte/1.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148  EDMOBILE v' + API_VERSION;

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

/* *************************************************************** */
/* Modules - School Life                                           */
/* *************************************************************** */