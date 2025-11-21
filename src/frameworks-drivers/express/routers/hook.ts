import container from "../../utils/awilix/container"

import ControllerHook from "../../../interface-adapters/controllers/hook"
import { Router, Request, Response } from "express";

const hookRoute= Router();

hookRoute.post('/:serviceName', async(request:Request, response:Response)=>{
    await (container.resolve('controllerHook')as ControllerHook).forward(request,response);
});

export default hookRoute;