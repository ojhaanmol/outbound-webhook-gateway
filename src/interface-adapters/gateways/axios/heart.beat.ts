import { CheckHeartBeat } from "../../../ports/registering-Listner"
import axios from "axios";

type RequestUrl= string;

let debug=false;

function setDebugging(){
    debug= true;
}

function unsetDebugging(){
    debug= false;
}

const logs:[string, any][]=[];
function log(data:any){
    logs.push( [new Date().toISOString(), JSON.stringify(data)] );
}

function stdoutLogs(){
    debug && console.info( logs.map( log=> ['[ INFO PING ]', ...log].join(' ') ).join('\n') );
}

async function checkHeartBeat(url:RequestUrl){
    try {

        log( {url} );

        await axios.get( url );
        return true;
    } catch (error) {
        return false;
    }
}

export { setDebugging, unsetDebugging, stdoutLogs }

export default checkHeartBeat as CheckHeartBeat;