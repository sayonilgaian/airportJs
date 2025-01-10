// List of possible operations and statuses
const operations = ['Takeoff', 'Landing', 'Taxiing'];
const statuses = ['Active', 'Inactive'];

// Generate basic information
const basicRunwayInfo = {
	Runway_Number: `Runway ${String(parseInt(Math.random() * 30)).padStart(
		2,
		'0'
	)}${['L', 'R'][parseInt(Math.random() * 2)]}`, // e.g., Runway 09R
	Status: statuses[parseInt(Math.random() * statuses.length)], // Random active/inactive status
};

// Generate detailed information
const detailedRunwayInfo = {
	...basicRunwayInfo,
	Length: parseInt(Math.random() * (4000 - 2000) + 2000), // Random length between 2000 and 4000 meters
	Current_Operation: operations[parseInt(Math.random() * operations.length)], // Random operation type
	Flights_Scheduled_In_Next_Hour: parseInt(Math.random() * 10) + 1, // Random number of flights scheduled between 1 and 10
};

export { basicRunwayInfo, detailedRunwayInfo };
