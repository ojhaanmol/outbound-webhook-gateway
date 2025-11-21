type Password= string;
type Username= string;
const registry:Record<Username, Password>={
    anmol: 'abcd12345678'
}
export default class PasswordStore{
    static async getPasswordByUserName(username: Username){
        if(!registry[ username ])
            throw new Error('username doesnot exist.');
        return registry[ username ];
    }
}