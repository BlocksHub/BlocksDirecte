export class Invalid2FAKey extends Error {
    constructor(message: string) {
        super();
        this.name = 'Invalid2FAKey';
        this.message = message;
    }
}