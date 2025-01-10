const towerData = [
	{
		Tower_Name: 'North Tower',
		ATC_Team_Lead_Name: 'John Doe',
		Current_Weather_Conditions: 'Clear',
		Temperature: '25°C',
		Number_Of_Flights_Being_Controlled: 75,
		ATC_Status: 'Active',
		Last_Update_Time: '1/8/2025, 4:35:23 PM',
	},
	{
		Tower_Name: 'South Tower',
		ATC_Team_Lead_Name: 'Alice Smith',
		Current_Weather_Conditions: 'Cloudy',
		Temperature: '30°C',
		Number_Of_Flights_Being_Controlled: 45,
		ATC_Status: 'Inactive',
		Last_Update_Time: '1/8/2025, 4:35:23 PM',
	},
	{
		Tower_Name: 'East Tower',
		ATC_Team_Lead_Name: 'Bob Johnson',
		Current_Weather_Conditions: 'Rainy',
		Temperature: '20°C',
		Number_Of_Flights_Being_Controlled: 55,
		ATC_Status: 'Under Maintenance',
		Last_Update_Time: '1/8/2025, 4:35:23 PM',
	},
	{
		Tower_Name: 'West Tower',
		ATC_Team_Lead_Name: 'Emily Davis',
		Current_Weather_Conditions: 'Windy',
		Temperature: '35°C',
		Number_Of_Flights_Being_Controlled: 65,
		ATC_Status: 'Active',
		Last_Update_Time: '1/8/2025, 4:35:23 PM',
	},
	{
		Tower_Name: 'North Tower',
		ATC_Team_Lead_Name: 'Michael Brown',
		Current_Weather_Conditions: 'Foggy',
		Temperature: '18°C',
		Number_Of_Flights_Being_Controlled: 25,
		ATC_Status: 'Inactive',
		Last_Update_Time: '1/8/2025, 4:35:23 PM',
	},
];

// Map the tower data into a formatted structure
const towerFormattedData = towerData.map((data) => {
	return {
		basicInfo: {
			Tower_Name: data.Tower_Name,
			ATC_Team_Lead_Name: data.ATC_Team_Lead_Name,
		},
		detailedInfo: data,
	};
});

export default towerFormattedData;

