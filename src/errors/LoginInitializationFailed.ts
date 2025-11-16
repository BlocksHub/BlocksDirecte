export class LoginInitializationFailed extends Error {
    constructor(message: string) {
        super();
        this.name = 'LoginInitializationFailed';
        this.message = message;
    }
}