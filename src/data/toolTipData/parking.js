const parkingData = [
	{
		Zone_Name: 'Zone A',
		Occupancy_Status: '70% Full',
		Occupancy_Percentage: 70,
		Number_Of_Airplanes_Parked: 15,
		Airline_Breakdown: {
			'Air India': 5,
			'Emirates': 2,
			'Lufthansa': 3,
			'Qatar Airways': 1,
			'Singapore Airlines': 4,
		},
	},
	{
		Zone_Name: 'Zone B',
		Occupancy_Status: '50% Full',
		Occupancy_Percentage: 50,
		Number_Of_Airplanes_Parked: 12,
		Airline_Breakdown: {
			'Air India': 3,
			'Emirates': 1,
			'Lufthansa': 2,
			'Qatar Airways': 2,
			'Singapore Airlines': 4,
		},
	},
	{
		Zone_Name: 'Zone C',
		Occupancy_Status: '85% Full',
		Occupancy_Percentage: 85,
		Number_Of_Airplanes_Parked: 25,
		Airline_Breakdown: {
			'Air India': 6,
			'Emirates': 7,
			'Lufthansa': 4,
			'Qatar Airways': 3,
			'Singapore Airlines': 5,
		},
	},
	{
		Zone_Name: 'Zone D',
		Occupancy_Status: '60% Full',
		Occupancy_Percentage: 60,
		Number_Of_Airplanes_Parked: 18,
		Airline_Breakdown: {
			'Air India': 4,
			'Emirates': 3,
			'Lufthansa': 5,
			'Qatar Airways': 2,
			'Singapore Airlines': 4,
		},
	},
	{
		Zone_Name: 'Zone E',
		Occupancy_Status: '95% Full',
		Occupancy_Percentage: 95,
		Number_Of_Airplanes_Parked: 28,
		Airline_Breakdown: {
			'Air India': 8,
			'Emirates': 6,
			'Lufthansa': 4,
			'Qatar Airways': 5,
			'Singapore Airlines': 5,
		},
	},
];

// Now map the data to format it as `basicInfo` and `detailedInfo`
const parkingFormattedData = parkingData.map((data) => {
	return {
		basicInfo: {
			Zone_Name: data.Zone_Name,
			Occupancy_Status: data.Occupancy_Status,
		},
		detailedInfo: data,
	};
});

export default parkingFormattedData;
