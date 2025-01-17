export default function resetAnimation({
	isAnimating,
	airCraftPositions,
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

	// Re-render scene
	renderer.render(scene, camera);
}
