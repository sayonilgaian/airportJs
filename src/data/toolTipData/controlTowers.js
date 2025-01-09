// Array of possible weather conditions
const weatherConditions = ['Clear', 'Cloudy', 'Rainy', 'Windy', 'Foggy'];

// Array of possible tower names
const towerNames = ['North Tower', 'South Tower', 'East Tower', 'West Tower'];

// Array of possible ATC team leads
const atcLeads = [
	'John Doe',
	'Alice Smith',
	'Bob Johnson',
	'Emily Davis',
	'Michael Brown',
];

// Generate basic control tower info
const towerBasicInfo = {
	TowerName: towerNames[parseInt(Math.random() * towerNames.length)], // Randomly choose a tower name
	ATCTeamLeadName: atcLeads[parseInt(Math.random() * atcLeads.length)], // Randomly choose ATC team lead
};

// Generate detailed control tower info by adding more dynamic values to the basic info
const towerDetailedInfo = {
	...towerBasicInfo,
	CurrentWeatherConditions:
		weatherConditions[parseInt(Math.random() * weatherConditions.length)], // Randomly choose weather
	Temperature: `${Math.floor(Math.random() * 40) + 15}°C`, // Random temperature between 15°C and 55°C
	NumberOfFlightsBeingControlled: parseInt(Math.random() * 100), // Random number of flights being controlled
	ATCStatus: ['Active', 'Inactive', 'Under Maintenance'][
		parseInt(Math.random() * 3)
	], // Random ATC status
	LastUpdateTime: new Date().toLocaleString(), // Time of the last update
};

export { towerBasicInfo, towerDetailedInfo };
