export class InvalidCredentials extends Error {
    constructor(message: string) {
        super();
        this.name = 'InvalidCredentials';
        this.message = message;
    }
}