export class BadAnswer2FA extends Error {
    constructor(message: string) {
        super();
        this.name = 'BadAnswer2FA';
        this.message = message;
    }
}