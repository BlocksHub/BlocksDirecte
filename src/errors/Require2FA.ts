export class Require2FA extends Error {
    public token: string;

    constructor(message: string, token: string) {
        super();
        this.name = 'Require2FA';
        this.message = message;
        this.token = token;
    }
}