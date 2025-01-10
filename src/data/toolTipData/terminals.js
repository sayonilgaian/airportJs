const terminalData = [
	{
		Terminal_Name: 'Terminal 1',
		Number_Of_Gates: '25 Gates',
		Total_Flights_Today: 120,
		Passenger_Capacity: 15000,
		Amenities: '3 Lounges, 12 Food Outlets, 20 Shops',
	},
	{
		Terminal_Name: 'Terminal 2',
		Number_Of_Gates: '30 Gates',
		Total_Flights_Today: 95,
		Passenger_Capacity: 12000,
		Amenities: '2 Lounges, 8 Food Outlets, 15 Shops',
	},
	{
		Terminal_Name: 'Terminal 3',
		Number_Of_Gates: '15 Gates',
		Total_Flights_Today: 75,
		Passenger_Capacity: 8000,
		Amenities: '1 Lounge, 5 Food Outlets, 10 Shops',
	},
	{
		Terminal_Name: 'Terminal 4',
		Number_Of_Gates: '40 Gates',
		Total_Flights_Today: 150,
		Passenger_Capacity: 18000,
		Amenities: '4 Lounges, 18 Food Outlets, 25 Shops',
	},
	{
		Terminal_Name: 'Terminal 5',
		Number_Of_Gates: '50 Gates',
		Total_Flights_Today: 200,
		Passenger_Capacity: 20000,
		Amenities: '5 Lounges, 20 Food Outlets, 30 Shops',
	},
];

const formattedTerminalData = terminalData.map((data) => {
	return {
		basicInfo: {
			Terminal_Name: data.Terminal_Name,
			Number_Of_Gates: data.Number_Of_Gates,
		},
		detailedInfo: data,
	};
});

export default formattedTerminalData;
