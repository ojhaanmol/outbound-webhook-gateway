export type RegisterdServiceUrl= string;
export type ServiceName= string;

export type GetLocalUrlAddressByServiceName = (serviceName: ServiceName) => Promise<RegisterdServiceUrl>;

export type ForwardingGateway= (address: string, Payload: object)=> Promise<void>;

export type ForwarderInboundPort= {
    getLocalUrlAddressByServiceName: GetLocalUrlAddressByServiceName;
    forwardingService: ForwardingGateway;
}

export type ForwardToAddressOutBoundPort= {
    serviceName: [string,Date];
    address: [string,Date];
    payload: [string,Date];
}
