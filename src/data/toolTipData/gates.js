// Basic info
const airlines = [
	'Air India',
	'Lufthansa',
	'Emirates',
	'Qatar Airways',
	'American Airlines',
];
const destinations = [
	'New York (JFK)',
	'London Heathrow',
	'Dubai',
	'Paris Charles de Gaulle',
	'Sydney',
];
const flightStatus = ['Active', 'Delayed', 'Boarding', 'Departed'];

const gatesBasicInfo = {
	GateNumber: `Gate ${parseInt(Math.random() * 30) + 1}`, // Random gate number between 1 and 30
	AssignedFlight: `AI${parseInt(Math.random() * 900) + 100}`, // Random flight number from AI100 to AI999
	Airline: airlines[parseInt(Math.random() * airlines.length)], // Random airline
};

// Detailed info
const gatesDetailedInfo = {
	...gatesBasicInfo,
	Destination: destinations[parseInt(Math.random() * destinations.length)], // Random destination
	BoardingStatus: flightStatus[parseInt(Math.random() * flightStatus.length)], // Random boarding status
	NextFlightTiming: `${parseInt(Math.random() * 12) + 5}:${parseInt(
		Math.random() * 60
	)}0`, // Random next flight time (5 to 17 hours)
};

// Generating the data
const gateData = {
	gatesBasicInfo,
	gatesDetailedInfo,
};

console.log(gateData);

export { gatesBasicInfo, gatesDetailedInfo };
