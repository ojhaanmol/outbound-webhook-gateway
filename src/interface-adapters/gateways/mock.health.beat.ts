type RequestUrl= string;
export default async function(url:RequestUrl){
    try {
        console.log("[ MOCKING PING ]")
        return true;
    } catch (error) {
        return false;
    }
}