import hookRoute from "./routers/hook";
import express from "express";
import registryRouter from "./routers/register";

// import container from "../utils/awilix/container"

const app= express();

app.use(express.json());

app.use(express.urlencoded());

app.use('/hook',hookRoute);
app.use('/register', registryRouter);

app.get('/ping',(req, response)=>{response.json({message: 'pong'})})

app.listen(1234, ()=>{
    console.log('curl http://127.0.0.1:1234/ping');
});

export default app;