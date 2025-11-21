
import ForwaderDebugger from "./forward-debugger";
import IncommingData from "./incomming-data";

describe("FORWARD DEBUGGING", ()=>{

	const objReturnTest= new ForwaderDebugger()
	objReturnTest.setServiceName('cjxhvb')

	const memoServiceNameTest= 'some-random-serviceName';
	const memoServicenameDebugger= new ForwaderDebugger();
	memoServicenameDebugger.setServiceName(memoServiceNameTest)

	const memoServiceNameTimestampTest= 'some-random-servicename-test';
	const serviceNameTimestampTest= new ForwaderDebugger();
	serviceNameTimestampTest.setServiceName(memoServiceNameTimestampTest);

	const getPayloadGetterSetterTest= new ForwaderDebugger();
	const getPayloadGetterSetterTestSubject= 'skjvnxckjv'

	getPayloadGetterSetterTest.setPayload( getPayloadGetterSetterTestSubject );

	const getAddressGetterSetterTest= new ForwaderDebugger();
	const getAddressGetterSetterTestSubject= 'skjvnxckjv'

	getAddressGetterSetterTest.setAddress(getAddressGetterSetterTestSubject);

	const mockIncommingData= {
	    body: {payload: ""},
	    headers: {rec: ""},
		serviceName: "some-random-serviceName"
	};
	const invalidIncommingData= "";
	const missingBody= { headers: mockIncommingData.headers, serviceName: mockIncommingData.serviceName };
	const missingHeader= { body: mockIncommingData.body , serviceName: mockIncommingData.serviceName };
	const missingServiceName= { body: mockIncommingData.body ,headers: mockIncommingData.headers, }

	test( 'new ForwederDebugger should be defined.', ()=>{
		expect(new ForwaderDebugger())
		.toBeDefined();
	});

	test( 'setServiceName should be defined.', ()=>{
		expect(typeof new ForwaderDebugger().setServiceName)
		.toBe('function');
	});

	test( 'get serviceName should retuen a object.', ()=>{
		expect(typeof objReturnTest.getServiceName())
		.toBe( 'object')
	});

	test( 'getServicename should reture a string.', ()=>{
		expect(typeof objReturnTest.getServiceName()?.[0])
		.toBe( 'string');
	});

	test( 'serviceName should be properly set.', ()=>{
		expect(memoServicenameDebugger.getServiceName()?.[0])
		.toBe( memoServiceNameTest);
	});

	test( 'serviceName should be timestamped', ()=>{
		expect(serviceNameTimestampTest.getServiceName()?.[1] instanceof Date)
		.toBe(true);
	});

	test( 'setPayload should be defined.', ()=>{
		expect(typeof new ForwaderDebugger().setPayload)
		.toBe( 'function');
	});

	test( 'getPayload Should be a function.', ()=>{
		expect(typeof new ForwaderDebugger().getPayload)
		.toBe( 'function');
	});

	test( 'type should match for what was set and what is getting.', ()=>{
		expect(typeof getPayloadGetterSetterTestSubject)
		.toBe(typeof getPayloadGetterSetterTest.getPayload()?.[0]);
	});

	test( 'timestamp test for getPayload.', ()=>{
		expect(getPayloadGetterSetterTest.getPayload()?.[0])
		.toBe(getPayloadGetterSetterTestSubject);
	});

	test( 'setAddress should be defined.', ()=>{
		expect(typeof new ForwaderDebugger().setAddress)
		.toBe( 'function');
	});

	test( 'getAddress Should be a function.', ()=>{
		expect(typeof new ForwaderDebugger().getAddress)
		.toBe( 'function');
	});

	test('type should match for what was set and what is getting.', ()=>{
		expect(typeof  getAddressGetterSetterTestSubject)
		.toBe(typeof getAddressGetterSetterTest.getAddress()?.[0]);
	});

	test( 'timestamp test for getAddress.', ()=>{
		expect(getAddressGetterSetterTest.getAddress()?.[1] instanceof Date)
		.toBe(true);
	});

	test( 'class new IncommingData should be defined', ()=>{
		expect(new IncommingData({body:1,headers:{},serviceName:'some-random-service-name'}))
		.toBeDefined();
	});


	test('class should throw error on missing body.', ()=>{
	    expect(()=>{new IncommingData(missingBody)})
		.toThrow( /missing body./);
	});


	test('class should throw error on missing header field.', ()=>{
	    expect(()=>{new IncommingData(missingHeader)})
		.toThrow( /missing headers./);
	});

	test('class should throw error on missing serviceName field.', ()=>{
	    expect(()=>{new IncommingData(missingServiceName)})
		.toThrow( /missing serviceName./);
	});

	test( 'data should have property body.', ()=>{
		expect(new IncommingData(mockIncommingData).body)
		.toBeDefined();
	});

	test( 'data should have property headers.', ()=>{
		expect(new IncommingData(mockIncommingData).headers)
		.toBeDefined();
	});

	test( 'data should have property serviceName.', ()=>{
		// @ts-ignore
		expect(new IncommingData(mockIncommingData).serviceName)
		.toBeDefined();
	});

});
