// // Basic info
// const airlines = [
// 	'Air India',
// 	'Lufthansa',
// 	'Emirates',
// 	'Qatar Airways',
// 	'American Airlines',
// ];
// const destinations = [
// 	'New York (JFK)',
// 	'London Heathrow',
// 	'Dubai',
// 	'Paris Charles de Gaulle',
// 	'Sydney',
// ];
// const flightStatus = ['Active', 'Delayed', 'Boarding', 'Departed'];

// const gatesBasicInfo = {
// 	Gate_Number: `Gate ${parseInt(Math.random() * 30) + 1}`, // Random gate number between 1 and 30
// 	Assigned_Flight: `AI${parseInt(Math.random() * 900) + 100}`, // Random flight number from AI100 to AI999
// 	Airline: airlines[parseInt(Math.random() * airlines.length)], // Random airline
// };

// // Detailed info
// const gatesDetailedInfo = {
// 	...gatesBasicInfo,
// 	Destination: destinations[parseInt(Math.random() * destinations.length)], // Random destination
// 	Boarding_Status: flightStatus[parseInt(Math.random() * flightStatus.length)], // Random boarding status
// 	Next_Flight_Timing: `${parseInt(Math.random() * 12) + 5}:${parseInt(
// 		Math.random() * 60
// 	)}0`, // Random next flight time (5 to 17 hours)
// };

// // Generating the data
// const gateData = {
// 	gatesBasicInfo,
// 	gatesDetailedInfo,
// };

// export { gatesBasicInfo, gatesDetailedInfo };

// Static data (Already generated)
const gatesData = [
	{
		Gate_Number: 'Gate 3',
		Assigned_Flight: 'AI101',
		Airline: 'Air India',
		Destination: 'New York (JFK)',
		Boarding_Status: 'Active',
		Next_Flight_Timing: '6:30',
	},
	{
		Gate_Number: 'Gate 7',
		Assigned_Flight: 'LH505',
		Airline: 'Lufthansa',
		Destination: 'London Heathrow',
		Boarding_Status: 'Boarding',
		Next_Flight_Timing: '9:00',
	},
	{
		Gate_Number: 'Gate 15',
		Assigned_Flight: 'QR207',
		Airline: 'Qatar Airways',
		Destination: 'Dubai',
		Boarding_Status: 'Departed',
		Next_Flight_Timing: '12:00',
	},
	{
		Gate_Number: 'Gate 22',
		Assigned_Flight: 'AA320',
		Airline: 'American Airlines',
		Destination: 'Paris Charles de Gaulle',
		Boarding_Status: 'Delayed',
		Next_Flight_Timing: '14:15',
	},
	{
		Gate_Number: 'Gate 18',
		Assigned_Flight: 'AI205',
		Airline: 'Air India',
		Destination: 'Sydney',
		Boarding_Status: 'Active',
		Next_Flight_Timing: '16:00',
	},
];

// Refactored data structure
const gatesFormattedData = gatesData.map((data) => {
	return {
		basicInfo: {
			Gate_Number: data.Gate_Number,
			Assigned_Flight: data.Assigned_Flight,
			Airline: data.Airline,
		},
		detailedInfo: {
			...data,
		},
	};
});

export default gatesFormattedData;

