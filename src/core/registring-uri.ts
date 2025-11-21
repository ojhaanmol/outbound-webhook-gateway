export class RegistringUri {
    uriregx = /\w+:\/\//;
    uri;
    constructor(uri: string) {
        if (!this.uriregx.test(uri))
            throw new Error('invalid uri.');
        this.uri = uri;
    }
}
