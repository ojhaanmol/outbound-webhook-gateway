import http from "http";
import forwarding, { setDebugModeOn, stdoutLogs } from "./forwarding";
import checkHeartBeat, { setDebugging, stdoutLogs as heatBeatLogs } from "./heart.beat";

describe("FORWARDER SERVICE MOCK TEST", ()=> {

    // setDebugModeOn();
    const received:any[]=[];
    let server:http.Server;
    beforeAll(()=>{
        server = http.createServer((req, res) => {
            let body = "";
            req.on("data", chunk => (body += chunk));
            req.on("end", () => {
                received.push({
                    method: req.method,
                    url: req.url,
                    body,
                });
                res.statusCode = 200;
                res.end("ok");
            });
        });
    });

    afterAll(()=>{
        server.close();
    });

    test( "server should receive one request.", async()=>{
        await new Promise<void>(resolve => server.listen(9999, resolve));
        await forwarding("http://127.0.0.1:9999/hook", { hello: "world" });
        stdoutLogs();
        expect(received.length,).toBe(1);
    });

    test("should recive a post request.", ()=>{
        expect(received[0].method).toBe('POST');
    });

    test("should call the service to sample test url", ()=>{
        expect(received[0].url).toBe("/hook");
    });

});

describe("HEART BEAT SERVICE",()=>{

    // setDebugging();
    const received:any[]=[];
    let server:http.Server;
    beforeAll(()=>{
        server = http.createServer((req, res) => {
            let body = "";
            req.on("data", chunk => (body += chunk));
            req.on("end", () => {
                received.push({
                    method: req.method,
                    url: req.url,
                    body,
                });
                res.statusCode = 200;
                res.end("ok");
            });
        });
    });

    afterAll(()=>{
        server.close();
    });

    test( "server should receive one request.", async()=>{
        await new Promise<void>(resolve => server.listen(9998, resolve));
        await checkHeartBeat("http://127.0.0.1:9998/ping");
        heatBeatLogs();
        expect(received.length,).toBe(1);
    });

    test("should recive a get request.", ()=>{
        expect(received[0].method).toBe('GET');
    });

    test("should call the service to sample test url", ()=>{
        expect(received[0].url).toBe("/ping");
    });

})