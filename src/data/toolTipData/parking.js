const zoneNames = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
const airlines = [
	'Air India',
	'Emirates',
	'Lufthansa',
	'Qatar Airways',
	'Singapore Airlines',
];

// Basic Info: Zone Name and Occupancy Status
const parkingBasicInfo = {
	ZoneName: zoneNames[parseInt(Math.random() * zoneNames.length)],
	OccupancyStatus: `${parseInt(Math.random() * 100)}% Full`,
};

// Detailed Info: Zone Name, Occupancy Percentage, Number of Airplanes Parked, and Airline Breakdown
const parkingDetailedInfo = {
	...parkingBasicInfo,
	OccupancyPercentage: parseInt(Math.random() * 100), // Random occupancy percentage
	NumberOfAirplanesParked: parseInt(Math.random() * 30), // Random number of airplanes parked
	AirlineBreakdown: airlines.reduce((breakdown, airline) => {
		breakdown[airline] = parseInt(Math.random() * 10); // Random number of airplanes for each airline
		return breakdown;
	}, {}),
};

export { parkingBasicInfo, parkingDetailedInfo };
