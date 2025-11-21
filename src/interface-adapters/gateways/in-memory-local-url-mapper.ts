type ServiceName= string;
type Uri= string;

const maps:Record<ServiceName,Uri>={
    'zoho-mail': 'http://localhost:3000'
}

class UrlMapper{
    static async getUrlByServiceName(serviceName: ServiceName){
        if(!maps[serviceName])
            throw new Error('serviceName not registerd.');
        return maps[serviceName] as Uri;
    }
    static async setUrlForServiceName(uri: Uri, serviceName: ServiceName){
        maps[serviceName]= uri;
        console.log('[ INMEMORY LOCAL URL MAPPER ]', new Date().toISOString(), {keys: JSON.stringify(Object.keys(maps))});
    }
}

export default UrlMapper;