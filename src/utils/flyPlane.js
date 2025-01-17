import * as THREE from 'three';
import drawFlyPath from './drawFlyPath.js';

export default function flyPlane({
	scene,
	airCraftObject,
	speed = 100, // Units per second
	flyPath = [
		new THREE.Vector3(0, 10, 0),
		new THREE.Vector3(0, 10, 50),
		new THREE.Vector3(50, 10, 50),
	],
	currentT = 0, // Initial normalized position
	deltaTime, // Time delta from the main loop
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	showFlightPath,
	flightPathLines,
}) {
	if (!airCraftObject) {
		console.error('airCraftObject is undefined.');
		return currentT; // Return the current value of 't' so animation continues smoothly
	}

	if (!Array.isArray(flyPath) || flyPath.length < 2) {
		console.error('flyPath must be an array with at least two points.');
		return currentT; // Same as above
	}

	// Step 1: Create a Group if it doesn't already exist
	let group;
	if (!airCraftObject.parent || !(airCraftObject.parent instanceof THREE.Group)) {
		group = new THREE.Group();
		scene.add(group); // Add the group to the scene

		// Compute the aircraft's center
		const boundingBox = new THREE.Box3().setFromObject(airCraftObject);
		const objectCenter = new THREE.Vector3();
		boundingBox.getCenter(objectCenter);

		// Offset the plane so that the group's center is aligned to the object's center
		airCraftObject.position.sub(objectCenter);

		// Add the plane to the group
		group.add(airCraftObject);
	} else {
		group = airCraftObject.parent; // Use the existing group
	}

	// Step 2: Define the curve and get its length
	const curve = new THREE.CatmullRomCurve3(flyPath, false); // 'false' makes it a non-looping path
	const curveLength = curve.getLength();

	// Step 3: Update 't' based on deltaTime and speed
	currentT += (deltaTime * speed) / curveLength;
	if (currentT > 1) currentT -= 1; // Loop back when reaching the end of the curve

	// Get the current and next positions
	const position = curve.getPointAt(currentT);
	const nextT = (currentT + 0.01) % 1;
	const nextPosition = curve.getPointAt(nextT);

	// Step 4: Move the group along the path
	group.position.copy(position);

	// Step 5: Update orientation to face the direction of travel
	const lookAtMatrix = new THREE.Matrix4();
	lookAtMatrix.lookAt(position, nextPosition, new THREE.Vector3(0, 1, 0));
	group.quaternion.setFromRotationMatrix(lookAtMatrix);

	// Adjust initial orientation for specific axis alignment
	group.rotateX(rotateX);
	group.rotateY(rotateY);
	group.rotateZ(rotateZ);

	// Step 6: Draw the flight path if necessary
	drawFlyPath({ scene, flyPath, showFlightPath, flightPathLines });

	return currentT;
}
