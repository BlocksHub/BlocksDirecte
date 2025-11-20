import {SchoolLifeAttendanceItem} from "./SchoolLifeAttendanceItem";
import {SchoolLifeExemptionItem} from "./SchoolLifeExemptionItem";
import {SchoolLifeConductItem} from "./SchoolLifeConductItem";
import {SchoolLifeLicense} from "./SchoolLifeLicense";
import {SchoolLifeSettings} from "./SchoolLifeSettings";

export interface SchoolLife {
    absencesRetards: SchoolLifeAttendanceItem[];
    dispenses: SchoolLifeExemptionItem[];
    sanctionsEncouragements: SchoolLifeConductItem[];
    permisPoint: SchoolLifeLicense;
    parametrage: SchoolLifeSettings;
}