const runwayData = [
	{
		Runway_Number: "Runway 09L",
		Status: "Active",
		Length: 3500,
		Current_Operation: "Takeoff",
		Flights_Scheduled_In_Next_Hour: 5,
	},
	{
		Runway_Number: "Runway 11R",
		Status: "Inactive",
		Length: 3200,
		Current_Operation: "Landing",
		Flights_Scheduled_In_Next_Hour: 2,
	},
	{
		Runway_Number: "Runway 15L",
		Status: "Active",
		Length: 2800,
		Current_Operation: "Taxiing",
		Flights_Scheduled_In_Next_Hour: 7,
	},
	{
		Runway_Number: "Runway 23R",
		Status: "Inactive",
		Length: 3900,
		Current_Operation: "Takeoff",
		Flights_Scheduled_In_Next_Hour: 4,
	},
	{
		Runway_Number: "Runway 01L",
		Status: "Active",
		Length: 2500,
		Current_Operation: "Landing",
		Flights_Scheduled_In_Next_Hour: 3,
	},
	{
		Runway_Number: "Runway 27R",
		Status: "Active",
		Length: 3300,
		Current_Operation: "Taxiing",
		Flights_Scheduled_In_Next_Hour: 8,
	},
	{
		Runway_Number: "Runway 09R",
		Status: "Inactive",
		Length: 3000,
		Current_Operation: "Landing",
		Flights_Scheduled_In_Next_Hour: 1,
	},
	{
		Runway_Number: "Runway 18L",
		Status: "Active",
		Length: 3100,
		Current_Operation: "Takeoff",
		Flights_Scheduled_In_Next_Hour: 6,
	},
	{
		Runway_Number: "Runway 36R",
		Status: "Inactive",
		Length: 3700,
		Current_Operation: "Taxiing",
		Flights_Scheduled_In_Next_Hour: 2,
	},
	{
		Runway_Number: "Runway 14L",
		Status: "Active",
		Length: 2600,
		Current_Operation: "Takeoff",
		Flights_Scheduled_In_Next_Hour: 5,
	},
];

const formattedRunwayData = runwayData.map((data) => {
	return {
		basicInfo: {
			Runway_Number: data.Runway_Number,
			Status: data.Status,
		},
		detailedInfo: data,
	};
});

export default formattedRunwayData;
