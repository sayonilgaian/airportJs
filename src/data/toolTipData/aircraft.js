const destinations = ['Sydney', 'LA', 'California', 'Dubai', 'London'];
const airlines = [
	'Air India',
	'Emirates',
	'Lufthansa',
	'Qatar Airways',
	'Singapore Airlines',
];

let randomAirline = airlines[parseInt(Math.random() * (airlines.length - 1))];

const aircraftBasicInfo = {
	Flight_Number: `${randomAirline}-${parseInt(Math.random() * 1000)}`,
	Airline_Name: randomAirline,
	Gate: `G${parseInt(Math.random() * 10)}`,
};

let randomTime = new Date(Date.now()).toString();

const aircraftDetailedInfo = {
	...aircraftBasicInfo,
	Destination: destinations[parseInt(Math.random() * destinations.length - 1)],
	Scheduled_Time: randomTime,
	Actual_Time: randomTime,
	Passenger_Count: parseInt(Math.random() * 500),
	Status: ['Boarding', 'Departed', 'Delayed'][parseInt(Math.random() * 3)],
};

export { aircraftBasicInfo, aircraftDetailedInfo };
