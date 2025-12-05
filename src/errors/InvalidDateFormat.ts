export class InvalidDateFormat extends Error {
    constructor(message: string) {
        super();
        this.name = 'InvalidDateFormat';
        this.message = message;
    }
}