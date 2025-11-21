import Forwarder from "../../../usecase/forwarder";
import RegisterListner from "../../../usecase/register-listner";

import UrlMapper from "../../../interface-adapters/gateways/in-memory-local-url-mapper";
import mockForwarding from "../../../interface-adapters/gateways/mock.forwarding";
import mockHealthCheck from "../../../interface-adapters/gateways/mock.health.beat";
import PasswordStore from "../../../interface-adapters/gateways/password.store";

import ControllerHook from "../../../interface-adapters/controllers/hook";
import RegisterControllers from "../../../interface-adapters/controllers/register";

import awilix, { createContainer, Lifetime, asFunction, asClass, asValue} from 'awilix';

const awilixContainer= createContainer({
    injectionMode: 'PROXY'
});

awilixContainer.register({

    getLocalUrlAddressByServiceName: asValue(async(serviceName:string) => await UrlMapper.getUrlByServiceName(serviceName)),
    forwardingService: asValue( (address:string, payload:object)=> mockForwarding(address, payload)),

    registrar: asClass( RegisterListner, {lifetime: Lifetime.SCOPED} ),
    forwarder: asClass( Forwarder, {lifetime: Lifetime.SCOPED} ),
    checkHeartBeat: asValue( async(url:string)=> await mockHealthCheck(url) ),
    getPasswordByUserName: asValue( async(userName:string)=> await PasswordStore.getPasswordByUserName(userName) ),
    registerUrl: asValue( async(url:string, serviceName: string)=> await UrlMapper.setUrlForServiceName(url, serviceName) ),

    controllerHook: asClass( ControllerHook, {lifetime: Lifetime.SCOPED} ),
    registerController: asClass( RegisterControllers, {lifetime: Lifetime.SCOPED} )

});

export default awilixContainer;