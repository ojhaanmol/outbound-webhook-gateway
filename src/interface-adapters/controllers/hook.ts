import { Request, Response } from 'express';
import Forwarder from "../../usecase/forwarder"

class ControllerHook{
    forwarder: Forwarder;
    constructor({forwarder}: {forwarder: Forwarder}){
        this.forwarder= forwarder;
    }

    async forward(request:Request, response: Response){
        try {

            response.sendStatus(200);
            await this.forwarder
            .forwordToAddress(
                {
                    body: request.body,
                    headers: request.headers,
                    serviceName: request.params.serviceName ?? '' 
                }
            );

            console.info( "[ INFO ]", new Date().toISOString() , this.forwarder.debug );

        } catch (error) {
            console.error( '[ ERROR ]', new Date().toISOString(), error, this.forwarder.debug );
            return;
            
        }
    }    
}

export default ControllerHook;