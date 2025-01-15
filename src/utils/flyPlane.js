import * as THREE from 'three';
import drawFlyPath from './drawFlyPath.js';

export default function flyPlane({
	scene,
	airCraftObject,
	speed = 100, // Units per second
	flyPath,
	currentT = 0, // Initial normalized position
	deltaTime, // Time delta from the main loop
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	showFlightPath,
	flightPathLines
}) {
	if (!airCraftObject) {
		console.error('airCraftObject is undefined.');
		return currentT; // Return the current value of 't' so animation continues smoothly
	}

	if (!Array.isArray(flyPath) || flyPath.length < 2) {
		console.error('flyPath must be an array with at least two points.');
		return currentT; // Same as above
	}

	// Define the curve and get its length
	const curve = new THREE.CatmullRomCurve3(flyPath, false); // 'false' makes it a non-looping path
	const curveLength = curve.getLength();

	// Update 't' based on deltaTime and speed
	currentT += (deltaTime * speed) / curveLength;
	if (currentT > 1) currentT -= 1; // Loop back when reaching the end of the curve

	// Get the current and next positions
	const position = curve.getPointAt(currentT);
	const nextT = (currentT + 0.01) % 1;
	const nextPosition = curve.getPointAt(nextT);

	// Update the aircraft's position
	airCraftObject.position.copy(position);

	// Update orientation to face the direction of travel
	const lookAtMatrix = new THREE.Matrix4();
	lookAtMatrix.lookAt(position, nextPosition, new THREE.Vector3(0, 1, 0));
	airCraftObject.quaternion.setFromRotationMatrix(lookAtMatrix);

	// Adjust initial orientation for specific axis alignment
	airCraftObject.rotateX(rotateX);
	airCraftObject.rotateY(rotateY);
	airCraftObject.rotateZ(rotateZ);

	// TODO: removing flight path pending
	drawFlyPath({ scene, flyPath, showFlightPath, flightPathLines });

	return currentT;
}
