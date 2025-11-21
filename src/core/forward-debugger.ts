

type ServiceName= string;
class ForwaderDebugger{
    private serviceName?:[ServiceName, Date];
    private payload?:[unknown, Date];
    private address?:[string, Date];

    setServiceName(serviceName:ServiceName){
        this.serviceName= [serviceName, new Date()];
    }   
    getServiceName(){
        return this.serviceName;
    }

    setPayload(payload: unknown){
        this.payload= [ payload, new Date() ]
    }
    getPayload(){
        return this.payload;
    }
    
    setAddress(address: string){
        this.address= [ address, new Date() ]
    }
    getAddress(){
        return this.address;
    }
}

export default ForwaderDebugger;