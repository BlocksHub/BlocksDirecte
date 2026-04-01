export class UnsupportedModule extends Error {
    constructor(message: string) {
        super();
        this.name = 'UnsupportedModule';
        this.message = message;
    }
}