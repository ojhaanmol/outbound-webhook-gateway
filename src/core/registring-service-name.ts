export class RegistringServiceName {
    serviceName;
    serviceRegx = /\w+/;
    constructor(serviceName: string) {
        if (!serviceName && this.serviceRegx)
            throw new Error('serviceName is not defined.');
        this.serviceName = serviceName;
    }
}
