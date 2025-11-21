import ForwaderDebugger from "../core/forward-debugger";
import IncommingData from "../core/incomming-data";
import { ForwarderInboundPort, ForwardToAddressOutBoundPort } from "../ports/forwarder";

class Forwarder{
    private getLocalUrlAddressByServiceName;
    private forwardingService;
    debug= new ForwaderDebugger();
    constructor({ 
        getLocalUrlAddressByServiceName,
        forwardingService
    }: ForwarderInboundPort){
        this.getLocalUrlAddressByServiceName= getLocalUrlAddressByServiceName;
        this.forwardingService= forwardingService;
    }
    async forwordToAddress(requestPayload:{ headers: object, body: object, serviceName: string }){

        const forwardingMetaData= new IncommingData(requestPayload);
        this.debug.setPayload(
            JSON.stringify({
                body: forwardingMetaData.body,
                headers: forwardingMetaData.headers
            })
        );

        this.debug.setServiceName( forwardingMetaData.serviceName );

        const address= await this.getLocalUrlAddressByServiceName( forwardingMetaData.serviceName );
        this.debug.setAddress(address);
        
        await this.forwardingService(address, {forward: forwardingMetaData});
        return {
            serviceName: this.debug.getServiceName() ?? ['NA', new Date()],
            address: this.debug.getAddress() ?? ['NA', new Date()],
            payload: [
                JSON.stringify(this.debug.getPayload()?.[0]) ?? 'NA',
                this.debug.getPayload()?.[1] ?? new Date()
            ]
        } as ForwardToAddressOutBoundPort;

    }
}

export default Forwarder;
