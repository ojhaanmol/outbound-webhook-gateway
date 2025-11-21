type Payload= object;
type Address= string;
async function mockForwarding(address:Address, payload: Payload){
    console.log('[ FORWARDING MOCK INFO ]', new Date().toISOString(), {address});
    console.log('[ FORWARDING MOCK INFO ]', new Date().toISOString(), {payload: JSON.stringify(payload)});
}

export default mockForwarding;