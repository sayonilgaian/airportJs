const destinations = ['Sydney', 'LA', 'California', 'Dubai', 'London'];

const basicInfo = {
	FlightNumber: `LUF-${parseInt(Math.random() * 1000)}`,
	AirlineName: 'Lufthansa',
	Gate: `G${parseInt(Math.random() * 10)}`,
};

const detailedInfo = {
	...basicInfo,
	Destination: destinations[parseInt(Math.random() * destinations.length - 1)],
	ScheduledTime: Date.now(),
	ActualTime: Date.now(),
	PassengerCount: parseInt(Math.random() * 500),
	Status: ['Boarding', 'Departed', 'Delayed'][parseInt(Math.random() * 3)],
};

export { basicInfo, detailedInfo };
