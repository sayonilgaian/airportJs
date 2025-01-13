export default function addAircraft({
	scene,
	aircraftObject,
	aircraftObjects,
}) {
	aircraftObject.position.y = -10; // temporary measure to hide unwanted plane parts
	scene.add(aircraftObject);
	aircraftObjects.push(aircraftObject);
}
