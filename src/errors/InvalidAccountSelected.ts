export class InvalidAccountSelected extends Error {
    constructor(message: string) {
        super();
        this.name = 'InvalidAccountSelected';
        this.message = message;
    }
}