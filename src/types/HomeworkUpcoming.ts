import {HomeworkTags} from "./HomeworkTags";

export type Day = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"
    | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25"
    | "26" | "27" | "28" | "29" | "30" | "31";
export type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
export type Year = `${number}${number}${number}${number}`

export type ISODate = `${Year}-${Month}-${Day}`;

export interface HomeworkUpcomingItem {
    aFaire: boolean,
    codeMatiere: string,
    documentsAFaire: boolean,
    donneLe: ISODate,
    effectue: boolean,
    idDevoir: number,
    interrogation: boolean,
    matiere: string,
    rendreEnLigne: boolean,
    tags: HomeworkTags[]
}

export type HomeworkUpcoming = Record<ISODate, HomeworkUpcomingItem[]>;