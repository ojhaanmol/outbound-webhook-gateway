class IncommingData{
    body;
    headers;
    serviceName;
    constructor(data: unknown){
        if(typeof data !== 'object')
            throw new Error('invalid data entry.');
        if(!(data as Record<string, any>).body)
            throw new Error('missing body.')
        if(!(data as Record<string, any>).headers)
            throw new Error('missing headers.');
        if(!(data as Record<string, any>).serviceName)
            throw new Error('missing serviceName.')
        this.body= (data as Record<string, any>).body;
        this.headers= (data as Record<string, any>).headers;
        this.serviceName= (data as Record<string, any>).serviceName
    }
}

export default IncommingData;