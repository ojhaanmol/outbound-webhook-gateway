import Forwarder from "./forwarder";
import ForwaderDebugger from "../core/forward-debugger";
import IncommingData from "../core/incomming-data";

async function mockGetLocalUrlAddressByServiceName(serviceName: string){
	return 'http://host/'
}

describe("UESCASE FORWARDER TESTS:",()=>{

	test( 'class Forwarder should be defined.', ()=>{
		expect(new Forwarder(
			{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=>{}
			}
		)).toBeDefined();
	});

	test( 'should accept a method that gets current local address.', ()=>{
		expect(new Forwarder(
			{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=>{}
			}
		)).toBeDefined();
	});

	test( 'a public debug should be present.', ()=>{
		expect(new Forwarder(
			{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=>{}
			}
		).debug as unknown instanceof ForwaderDebugger).toBeDefined();
	});

	test( 'should have a public functional property.',()=>{
		expect(typeof new Forwarder(
		{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=>{}
		}
	    ).forwordToAddress ).toBe( 'function');
	});

	test( 'a public debug should be called to register serviceName.',async()=>{
		const forwarder= new Forwarder(
			{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=>{}
			}
		);
		await forwarder.forwordToAddress({ body: {b:1}, headers: {h:1}, serviceName:'test-service-name'})
		expect(forwarder.debug.getServiceName()?.[0]).toBe( 'test-service-name');
	});

	test( 'a public debug should be called to register serviceName.',async()=>{
		const forwarder= new Forwarder(
			{
				getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
				forwardingService: async()=> {}
			}
		);
		await forwarder.forwordToAddress({ body: {b:1}, headers: {h:1}, serviceName: "some-random-service-name"})
		expect(forwarder.debug.getServiceName()?.[0] ).toBe( 'some-random-service-name');
	});

	const forwardToAddressTest= new Forwarder({
		getLocalUrlAddressByServiceName: mockGetLocalUrlAddressByServiceName,
		forwardingService: async()=> {}
	});

	test( 'forwardToAddressTest should be registered.',async()=>{
		await forwardToAddressTest.forwordToAddress({body:{},headers:{},serviceName: "s-s-n"});
		expect(forwardToAddressTest.debug.getAddress()?.[0]).toBe('http://host/');
	});


});

// (async function(){
//     const response= await forwardToAddressTest.forwordToAddress({
//         body: {},
//         headers: {}
//     });
//     Object.entries( response )
//     .forEach( ([key, [value, ts] ]) => {
//         console.log('[ INFO ]', { [key+':'+ts]: value });
//     })
// })();

// *****************************************************************************************************

import { RegisterListnerDebugger } from '../core/register-listner-debugger';
import { AuthToken } from '../core/registring-auth-token';
import RegisterListner from './register-listner';

describe('REGISTER LISTNER',()=>{

	let someRandomPassword= 'some-random-password';
	async function mockGetPasswordByUserName(username:string){
		return someRandomPassword;
	}
	async function mockGetPasswordByUserNameFailed(username: string):Promise<string>{
		throw new Error('getPassword by username is mocking failed senario.');
	}

	const pong= true;
	const pongFailed= false;
	async function mockPing(url: string) {
		return pong;
	}

	async function mockPingFailed(url: string) {
		return pongFailed;
	}

	async function mockRegisterUrl(url: string, serviceName: string){
		return;
	}

	async function mockRegisterUrlFailed(url: string, serviceName: string):Promise<void>{
		throw new Error('unable register url. This test is for mocking');
	}

	const options= {
		getPasswordByUserName: mockGetPasswordByUserName,
		checkHeartBeat: mockPing,
		registerUrl: mockRegisterUrl,
	}

	const mockGettingPasswordFailedOptions= {
		getPasswordByUserName: mockGetPasswordByUserNameFailed,
		checkHeartBeat: mockPing,
		registerUrl: mockRegisterUrl,
	}

	const mockPingingFailedOptions= {
		getPasswordByUserName: mockGetPasswordByUserName,
		checkHeartBeat: mockPingFailed,
		registerUrl: mockRegisterUrl,
	}

	const mockeStoringUrlFailedOptions= {
		getPasswordByUserName: mockGetPasswordByUserName,
		checkHeartBeat: mockPing,
		registerUrl: mockRegisterUrlFailed,
	}

	const serviceName= 'some-random-service-name';
	const tokenUser= 'some-random-user';
	const tokenPassword= 'some-random-password';
	const authToken= Buffer.from([tokenUser, tokenPassword].join(':')).toString('base64');
	const uri= 'https://localhost.com';


	const serviceNameForDebuggingTest= 'some-service-name';
	const tokenForDebuggingTest= authToken;
	const urlForDebuggingTest= 'https://url.com';


	const newRegistryListnerForDebuggingtest= new RegisterListner(options)
	newRegistryListnerForDebuggingtest.registerUrlForServiceName(
		serviceNameForDebuggingTest,
		tokenForDebuggingTest,
		urlForDebuggingTest
	);

	test('RegisterListner should be defined.' ,()=>{
		expect( new RegisterListner(options) ).toBeDefined();
	});

	test('Register oprions should be able to accept options.' ,()=>{
		expect( new RegisterListner(options) ).toBeDefined();
	});

	test('registerUrlForServiceName should be defined.' ,()=>{
		expect( new RegisterListner(options).registerUrlForServiceName ).toBeDefined();
	});

	test('registerUrlForServiceName should be defined as function.' ,()=>{
		expect( typeof new RegisterListner(options).registerUrlForServiceName  ).toBe( 'function' );
	});

	test('registerUrlForServiceName should be asynchronous.' ,()=>{
		 expect(new RegisterListner(options).registerUrlForServiceName(serviceName, authToken, uri) instanceof Promise ).toBeTruthy();
	});

	test('serviceName should set for logging.' , ()=>{
		expect( newRegistryListnerForDebuggingtest.debug.get('serviceName').data).toBe(serviceNameForDebuggingTest);
	});

	expect(
		async()=>{
		    const newRegistryListnerForServiceNameTest= new RegisterListner(options)
		    await newRegistryListnerForServiceNameTest.registerUrlForServiceName(
			'',
			tokenForDebuggingTest,
			urlForDebuggingTest
		    );
		},
	).rejects.toThrow(/serviceName is not defined./);

	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(options)
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName,
			Buffer.from(':password').toString('base64'),
			urlForDebuggingTest
		    );
		},
	).rejects.toThrow(/invalid token./);


	test('authTokenUser should set for logging.' ,async()=>{

		const newRegistryListnerForTokenTest= new RegisterListner(options);

		await newRegistryListnerForTokenTest.registerUrlForServiceName(
		    serviceName,
		    authToken,
		    urlForDebuggingTest
		);

		expect( newRegistryListnerForDebuggingtest.debug.get( 'authTokenUser' ).data ).toBe( tokenUser );

	});

	test('authTokenPassword should set for logging.' ,async()=>{

		const newRegistryListnerForTokenTest= new RegisterListner(options);

		await newRegistryListnerForTokenTest.registerUrlForServiceName(
		    serviceName,
		    authToken,
		    urlForDebuggingTest
		);

		expect( newRegistryListnerForDebuggingtest.debug.get( 'authTokenPassword' ).data ).toBe( tokenPassword );

	});

	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(options);
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName,
			authToken,
			""
		    );
		}
	).rejects.toThrow( /invalid uri./);



	test( 'registringUrl should set for logging.' , async()=>{

		const newRegistryListnerForTokenTest= new RegisterListner(options);

		await newRegistryListnerForTokenTest.registerUrlForServiceName(
		    serviceName,
		    authToken,
		    urlForDebuggingTest
		);

		expect( newRegistryListnerForDebuggingtest.debug.get('registringUrl').data   ).toBe(urlForDebuggingTest);
	});


	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(mockGettingPasswordFailedOptions);
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName,
			authToken,
			urlForDebuggingTest
		    );
		}
	).rejects.toThrow(/unable to fetch Password./);

	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(mockGettingPasswordFailedOptions);
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName,
			authToken,
			urlForDebuggingTest
		    );
		}
	).rejects.toThrow(/unable to fetch Password./);


	test('persisted password should be added fofr debugging.',async()=>{

		const newRegistryListnerForGetPasswordDebugTest= new RegisterListner(options);
		await newRegistryListnerForGetPasswordDebugTest.registerUrlForServiceName(
		    serviceName,
		    authToken,
		    urlForDebuggingTest
		);
		expect(newRegistryListnerForGetPasswordDebugTest.debug.get('registerdPassword').data  ).toBe(someRandomPassword);
	});


	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(mockPingingFailedOptions);
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName, authToken, urlForDebuggingTest);
		},
	).rejects.toThrow(/unable to ping to server./);


	expect(
		async()=>{
		    const newRegistryListnerForTokenTest= new RegisterListner(mockeStoringUrlFailedOptions);
		    await newRegistryListnerForTokenTest.registerUrlForServiceName(
			serviceName,
			authToken,
			urlForDebuggingTest
		    );
		},
	).rejects.toThrow(/unable to store url./);

});


// *****************************************************************************************************************************

describe('REGISTER LISTNER DEBUGGER:',()=>{

	const debug= new RegisterListnerDebugger();
	debug.register('key','value');

	test('RegisterListnerDebugger should be defined.' ,()=>{
		expect( new RegisterListnerDebugger() ).toBeDefined();
	});

	test('RegisterListnerDebugger should have property register.' ,()=>{
		expect( new RegisterListnerDebugger().register ).toBeDefined();
	});

	test('Property register should be a function.',()=>{ 
		expect( typeof new RegisterListnerDebugger().register ).toBe('function');
	});

	test('RegisterListnerDebugger should have property get.'   ,()=>{
		expect( new RegisterListnerDebugger().get ).toBeDefined()
	});

	test('RegisterListnerDebugger should callable.',()=>{
		expect( typeof new RegisterListnerDebugger().get).toBe('function');
	});

	expect(()=>{
		new RegisterListnerDebugger().get('kjxcvnxjc')
	}).toThrow(/key not registerd./);

	test('expecting a return object with data.' , ()=>{
	    expect( debug.get('key').data ).toBe('value');
	});

	test('expecting a return object with ts [Date].' , ()=>{
	    expect( debug.get('key').ts instanceof Date ).toBeTruthy();
	});
});

// ***************************************************************************************************************************

import { RegistringServiceName } from "../core/registring-service-name";
import { RegistringUri } from "../core/registring-uri"

describe("REGISTER SERVICE NAME ENTITY", ()=> {

	test( 'class registring ServiceName should be defined.',()=>{
	    expect(new RegistringServiceName('serviceName')).toBeDefined();
	});

	expect(
		()=>{
		    new RegistringServiceName("")
		},
	).toThrow(/serviceName is not defined./);

	let someRandomServiceName= 'some-random-service-name';
	test('service Registry should have a property serviceName.',()=>{
		expect( new RegistringServiceName( someRandomServiceName ).serviceName).toBe(someRandomServiceName);
	});

});

// ***********************************************************************************************

describe('AUTH TOKEN ENTITY', ()=>{

	const user= 'user';
	const pass= 'pass';
	const payload= user+':'+pass;
	const validTokenBase64Token= Buffer.from(payload).toString('base64');
	const missingUserPayload= ':pass';
	const missingUserToken= Buffer.from(missingUserPayload).toString('base64');
	const missingPasswordPayload= 'user:';
	const missingPasswordToken= Buffer.from(missingPasswordPayload).toString('base64');

	test('class AuthToken should be defined.',()=>{
		expect(new AuthToken(validTokenBase64Token)).toBeDefined();
	});

	expect(
		()=>{
			new AuthToken('jvxcvcx');
			new AuthToken(missingUserToken);
			new AuthToken(missingPasswordToken);
		},
	).toThrow(/invalid token./);

	test('should have property user.' ,()=>{
		expect( new AuthToken(validTokenBase64Token).user   ).toBe(user);
	});

	test('should have property password.' ,()=>{
		expect( new AuthToken(validTokenBase64Token).password   ).toBe(pass);
	});

});

// ***********************************************************************************************

describe("URL ENTITY",()=>{

	const someRandomInvalidUri= 'xcnvnxvm';
	const validUri= 'http://cjvxcjvnxk';

	test( 'class RegistringUri should be defined.',()=>{
	    expect(new RegistringUri('https://vc')).toBeDefined();
	});

	expect(
		()=>{
			new RegistringUri(someRandomInvalidUri)
		},
	).toThrow(/invalid uri./);

	test( 'class should have a uri property.',()=>{
		expect(new RegistringUri(validUri).uri).toBeDefined()
	});

})

// (async function(){


//     const serviceName= 'some-random-service-name';
//     const tokenUser= 'some-random-user';
//     const tokenPassword= 'some-random-password';
//     const authToken= Buffer.from([tokenUser, tokenPassword].join(':')).toString('base64');
//     const uri= 'https://localhost.com';

//     let someRandomPassword;
//     async function mockGetPasswordByUserName(username:string){
//         someRandomPassword= 'some-random-password';
//         return someRandomPassword;
//     }


//     const pong= true;
//     const pongFailed= false;
//     async function mockPing(url: string) {
//         return pong;
//     }

    
//     async function mockRegisterUrl(url: string, serviceName: string){
//         return;
//     }


//     const options= {
//         getPasswordByUserName: mockGetPasswordByUserName,
//         checkHeartBeat: mockPing,
//         registerUrl: mockRegisterUrl,
//     }

//     const newRegistryListnerForTokenTest= new RegisterListner(options);
//     await newRegistryListnerForTokenTest.registerUrlForServiceName(
//         serviceName,
//         authToken,
//         uri
//     );

//     console.log(newRegistryListnerForTokenTest.debug.registry);

// })()
