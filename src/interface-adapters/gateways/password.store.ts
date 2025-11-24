import 'dotenv/config';

type Password= string;
type Username= string;
const registry:Record<Username, Password>={
    [String(process.env.USER_NAME)]: String( process.env.PASSWORD )
}
export default class PasswordStore{
    static async getPasswordByUserName(username: Username){console.log(9,{registry})
        if(!registry[ username ])
            throw new Error('username doesnot exist.');
        return registry[ username ];
    }
}