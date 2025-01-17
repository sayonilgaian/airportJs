import * as THREE from 'three';
import flightPaths from '../data/flyPaths.js';

export default function drawFlyPath({
	scene,
	flyPath = [
		new THREE.Vector3(0, 0, 0), // Starting point
		new THREE.Vector3(50, 100, 0), // Midpoint
		new THREE.Vector3(100, 200, -50), // Destination
	],
	showFlightPath,
	flightPathLines = [],
	offsetZ = 0,
	offsetY = 0,
	offsetX = 0,
}) {
	// Make any corrections to fly
	let updatedFlyPath = flyPath.map((path) => {
		let temp = new THREE.Vector3(path?.x, path?.y, path?.z);
		temp.x += offsetX;
		temp.y += offsetY;
		temp.z += offsetZ;
		return temp;
	});
	if (!showFlightPath) {
		let temp = [...flightPathLines];
		// must mutate original array for three js to detect change
		for (let i = 0; i < temp.length; i++) {
			scene.remove(temp[i]);
			flightPathLines.shift();
			// to free GPU from unused assets
			temp[i]?.geometry.dispose();
			temp[i]?.material.dispose();
		}
		return;
	}

	const curve = new THREE.CatmullRomCurve3(updatedFlyPath);
	const points = curve.getPoints(500);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineDashedMaterial({
		color: '#ffffff',
		dashSize: 5, // Length of each dash
		gapSize: 3, // Gap between dashes
		linewidth: 1, // Width of the line (ignored on most browsers)
	});
	let line = new THREE.Line(geometry, material);

	if (showFlightPath && flightPaths.length > flightPathLines.length) {
		flightPathLines.push(line);
		scene.add(line);
	}
}
