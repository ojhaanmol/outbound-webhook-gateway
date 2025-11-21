export class AuthToken {
    private tokenRegx = /(.+):(.+)/;
    user;
    password;
    constructor(token: string) {
        const userPassword = Buffer.from(token, 'base64').toString('utf-8');

        if (!this.tokenRegx.test(userPassword))
            throw new Error('invalid token.');

        const verifiedUserPassword = this.tokenRegx.exec(userPassword);
        this.user = verifiedUserPassword?.[1] as string;
        this.password = verifiedUserPassword?.[2] as string;
    }
}
