import { RegisterListnerUrlInboundPort, AuthTokenRecived, ListnerUrl, ServiceName } from '../ports/registering-Listner';
import { RegistringServiceName } from '../core/registring-service-name';
import { RegisterListnerDebugger } from '../core/register-listner-debugger';
import { RegistringUri } from '../core/registring-uri';
import { AuthToken } from '../core/registring-auth-token';

class RegisterListner{
    private getPasswordByUserName;
    private checkHeartBeat;
    private registerUrl;
    debug= new RegisterListnerDebugger();

    constructor(options: RegisterListnerUrlInboundPort){
        this.getPasswordByUserName= options.getPasswordByUserName;
        this.checkHeartBeat= options.checkHeartBeat;
        this.registerUrl= options.registerUrl;
    }
    
    async registerUrlForServiceName(serviceName: ServiceName, authToken: AuthTokenRecived, uri: ListnerUrl){
        
        this.debug.register('serviceName', new RegistringServiceName(serviceName).serviceName);
        const {user, password}= this.getAuthToken( authToken );

        const url= this.getUrl(uri);

        const registerdPassword= await this.fetchPassword( user );
        this.debug.register('registerdPassword',registerdPassword);

        if( registerdPassword !== password )
            throw new RegisterListnerError('Authentication Failed', 401)

        await this.ping(url);

        await this.persistUrlByUserName(uri, serviceName);
        
    }

    private async fetchPassword(userName: string){
        try {
            return await this.getPasswordByUserName( userName );
        } catch (error) {
            throw new RegisterListnerError('unable to fetch Password.', 502);
        }
    }

    private async ping(uri:string){
        if(!await this.checkHeartBeat( uri ))
            throw new RegisterListnerError('unable to ping to server.', 502);
    }

    private async persistUrlByUserName(url: string, serviceName: string){
        try {
            await this.registerUrl(url, serviceName);
        } catch (error) {
            throw new RegisterListnerError('unable to store url.', 502)
        }
    }

    private getAuthToken(authToken: string){
        try {
            const { user, password }= new AuthToken(authToken);
            this.debug.register('authTokenUser', user);
            this.debug.register('authTokenPassword', password);
            return { user, password }
        } catch (error) {
            if( error instanceof Error )
                throw new RegisterListnerError( error.message, 401 );
            throw new RegisterListnerError( 'unable to process token', 401 );
        }
    }

    private getUrl(uri: string){
        try {
            const parsedUri= new RegistringUri(uri).uri;
            this.debug.register('registringUrl', parsedUri);
            return parsedUri;
        } catch (error) {
            if(error instanceof Error)
                throw new RegisterListnerError( error.message, 400 );
            throw new RegisterListnerError('unable to process url', 400);    
        }
    }

}

class RegisterListnerError extends Error{
    code;
    constructor(message:string, code: number){
        super(message);
        this.code=code;
    }
}

export default RegisterListner;
export { RegisterListnerError };
