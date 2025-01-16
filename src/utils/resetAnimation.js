export default function resetAnimation({
	isAnimating,
	airCraftPositions,
	flightPaths,
	aircraftObjects,
	renderer,
	scene,
	camera,
}) {
	if (!isAnimating) {
		return;
	}
	// airCraftPositions = new Array(flightPaths.length).fill(0);
    // Note: above line does not work because three js is refereing to original array address. So it has to be mutated
    airCraftPositions.fill(0);

	// Reset positions of aircraft
	if (aircraftObjects.length > 0) {
		for (
			let i = 0;
			i < Math.min(aircraftObjects.length, flightPaths.length);
			i++
		) {
			const startPosition = flightPaths[i][0]; // Starting point of flyPath
			aircraftObjects[0].position.copy(startPosition);
			aircraftObjects[0].rotation.set(0, Math.PI, 0); // Reset orientation
		}
	}

	// Re-render scene
	renderer.render(scene, camera);
}
