export enum MarkSkillValue {
    ABSENT = '-1',
    EXEMPT = '-2',
    NOT_RATED = '-3',
    NOT_ACHIEVED = '1',
    PARTIALLY_ACHIEVED = '2',
    ACHIEVED = '3',
    EXCEEEDED = '4'
}

export interface MarkSkill {
    descriptif: string;
    idElemProg: number;
    valeur: MarkSkillValue;
    cdt: boolean;
    idCompetence: number;
    idConnaissance: number;
    libelleCompetence: string;
    afc: number;
}
