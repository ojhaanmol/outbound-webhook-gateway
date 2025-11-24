import axios from "axios";
import { ForwardingGateway } from "../../../ports/forwarder";

let debug= false;
const debuggingLogs:[string,any][]= [];

type Payload= object;
type Address= string;

function setDebugModeOn(){
    debug= true;
}

function setDebugModeOff(){
    debug= false;
}

function log(data:any){
    debuggingLogs.push( [ new Date().toISOString(), JSON.stringify(data) ] );
}

function stdoutLogs(){
    debug && console.info( debuggingLogs.map( (log)=> ['[ INFO FORWARDING SERVICE ]', ...log].join(' ')).join('\n') );
}

async function forwarding(address:Address, payload: Payload){    

    log({address});
    log({payload: JSON.stringify(payload)});

    {
        try {
            await axios.post( address, payload );
            return;
        } catch (error) {
            throw new Error('[ AXIOS ERROR ]'+ error)
        }
    }
}

export { stdoutLogs, setDebugModeOff, setDebugModeOn }

export default forwarding as ForwardingGateway;