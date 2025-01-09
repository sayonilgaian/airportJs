const terminalNames = [
	'Terminal 1',
	'Terminal 2',
	'Terminal 3',
	'Terminal 4',
	'Terminal 5',
];

const getRandomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const generateAmenities = () => {
	const lounges = getRandomInteger(1, 5); // Random number of lounges (1-5)
	const foodOutlets = getRandomInteger(5, 20); // Random number of food outlets (5-20)
	const shops = getRandomInteger(10, 30); // Random number of shops (10-30)

	return `${lounges} Lounges, ${foodOutlets} Food Outlets, ${shops} Shops`;
};

const terminalName =
	terminalNames[getRandomInteger(0, terminalNames.length - 1)];
const numberOfGates = getRandomInteger(10, 50); // Random number of gates (10-50)
const totalFlightsToday = getRandomInteger(50, 200); // Random total flights today (50-200)
const passengerCapacity = getRandomInteger(5000, 20000); // Random passenger capacity (5000-20000)

const amenities = generateAmenities();

const terminalBasicInfo = {
	TerminalName: terminalName,
	NumberOfGates: `${numberOfGates} Gates`,
};

const terminalDetailedInfo = {
	...terminalBasicInfo,
	TotalFlightsToday: totalFlightsToday,
	PassengerCapacity: passengerCapacity,
	Amenities: amenities,
};

export { terminalBasicInfo, terminalDetailedInfo };
