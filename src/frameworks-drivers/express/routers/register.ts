import RegisterControllers from "../../../interface-adapters/controllers/register"
import { Request, Response, Router } from "express";

import PasswordStore from "../../../interface-adapters/gateways/password.store";
import checkHeartBeat from "../../../interface-adapters/gateways/mock.health.beat";
import UrlMapper from "../../../interface-adapters/gateways/in-memory-local-url-mapper";

import container from "../../utils/awilix/container";

const registryRouter= Router();

registryRouter.post('/:serviceName',async(request:Request, response: Response)=>{
    try {
        await (container.resolve('registerController') as RegisterControllers).registerbyServiceName(request, response);
    } catch (error) {
        console.error('[ ERROR ]',new Date().toISOString(), error);
    }
})

export default registryRouter;