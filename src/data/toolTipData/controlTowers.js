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
	Tower_Name: towerNames[parseInt(Math.random() * towerNames.length)], // Randomly choose a tower name
	ATC_Team_Lead_Name: atcLeads[parseInt(Math.random() * atcLeads.length)], // Randomly choose ATC team lead
};

// Generate detailed control tower info by adding more dynamic values to the basic info
const towerDetailedInfo = {
	...towerBasicInfo,
	Current_Weather_Conditions:
		weatherConditions[parseInt(Math.random() * weatherConditions.length)], // Randomly choose weather
	Temperature: `${Math.floor(Math.random() * 40) + 15}°C`, // Random temperature between 15°C and 55°C
	Number_Of_Flights_Being_Controlled: parseInt(Math.random() * 100), // Random number of flights being controlled
	ATC_Status: ['Active', 'Inactive', 'Under Maintenance'][
		parseInt(Math.random() * 3)
	], // Random ATC status
	Last_Update_Time: new Date().toLocaleString(), // Time of the last update
};

export { towerBasicInfo, towerDetailedInfo };
