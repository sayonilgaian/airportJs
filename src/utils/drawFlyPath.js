import * as THREE from 'three';

export default function drawFlyPath({
	scene,
	flyPath = [
		new THREE.Vector3(0, 0, 0), // Starting point
		new THREE.Vector3(50, 100, 0), // Midpoint
		new THREE.Vector3(100, 200, -50), // Destination
	],
	showFlightPath,
	flightPathLines,
}) {
	// if (flightPathLines.length > 0 && !showFlightPath) {
	// 	flightPathLines.forEach((line) => {
	// 		line.geometry.dispose();
	// 		line.material.dispose();
	// 		scene.remove(line);
	// 	});
	// 	flightPathLines = [];
	// 	return;
	// }

	// if (flightPathLines.length > 0 && showFlightPath) {
	// 	return;
	// }

	const curve = new THREE.CatmullRomCurve3(flyPath);
	const points = curve.getPoints(500);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineDashedMaterial({
		color: 0x00ff00,
		dashSize: 5, // Length of each dash
		gapSize: 3, // Gap between dashes
		linewidth: 1, // Width of the line (ignored on most browsers)
	});
	let line = new THREE.Line(geometry, material);

	if (
		showFlightPath &&
		flightPathLines.filter((flightLine) => flightLine?.uuid === line?.uuid)
			.length === 0
	) {
		flightPathLines.push(line);
		scene.add(line);
	}
}
