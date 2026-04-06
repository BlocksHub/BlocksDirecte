/* *************************************************************** */
/* Structures                                                      */
/* *************************************************************** */

export * from "./struct/Client";

/* *************************************************************** */
/* Types                                                           */
/* *************************************************************** */

export * from "./types/Account";
export * from "./types/AccountIndividualSettings";
export * from "./types/AccountKind";
export * from "./types/Credential";
export * from "./types/CloudFile";
export * from "./types/DownloadRequest";
export * from "./types/DoubleAuthQuestions";
export * from "./types/DoubleAuthResult";
export * from "./types/Homework";
export * from "./types/HomeworkDate";
export * from "./types/HomeworkEntityType";
export * from "./types/HomeworkLessonContent";
export * from "./types/HomeworkSubject";
export * from "./types/HomeworkTags";
export * from "./types/HomeworkUpcoming";
export * from "./types/Module";
export * from "./types/RequestHandler";
export * from "./types/ServerResponse";
export * from "./types/SchoolLifeConductItem";
export * from "./types/SchoolLifeExemptionItem";
export * from "./types/SchoolLifeAttendanceItem";
export * from "./types/SchoolLifeAttendanceItemType";
export * from "./types/TimetableCourse"
export * from "./types/TimetableCourseType"

/* *************************************************************** */
/* Errors                                                          */
/* *************************************************************** */

export * from "./errors/InvalidCredentials";
export * from "./errors/Require2FA";
export * from "./errors/Invalid2FAKey";
