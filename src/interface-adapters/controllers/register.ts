import { Request, Response } from "express";
import RegisterListner, { RegisterListnerError } from "../../usecase/register-listner"

class RegisterControllers{
    registrar: RegisterListner;
    constructor({ registrar }:{
        registrar: RegisterListner;
    }){
        this.registrar= registrar;
    }
    async registerbyServiceName(request: Request, response: Response){
        try {
            const serviceName= request.params.serviceName;
            const authToken= /Basic\s+(.*)/.exec( request.headers.authorization ?? '' )?.[1] ?? '';
            const { url }= request.body;
            await this.registrar.registerUrlForServiceName(serviceName, authToken, url);
            response.sendStatus(202);
        } catch (error) {
            if(error instanceof RegisterListnerError)
                response.sendStatus( error.code );
            else
                response.sendStatus( 502 );
        }

    }
}


export default RegisterControllers;