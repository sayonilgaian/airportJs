import * as THREE from "three";

export default function flyPlane({
	airCraftObject,
	speed = 100, // Units per second
	flyPath = [
		new THREE.Vector3(120, 3, -20), // Start point
		new THREE.Vector3(-40, 3, -20), // Take off point
		new THREE.Vector3(-200, 50, -20), // Mid-air
		new THREE.Vector3(-200, 50, 180), // Turn left
		new THREE.Vector3(230, 50, 180), // Turn Left
		new THREE.Vector3(230, 50, -20), // Turn Left
		new THREE.Vector3(120, 3, -20), // Start point
	],
	delay = 0, // Delay in seconds before the plane starts flying
	offset = 0, // Offset along the curve (normalized 0 to 1)
}) {
	if (!airCraftObject) {
		console.error("airCraftObject is undefined.");
		return;
	}

	if (!Array.isArray(flyPath) || flyPath.length < 2) {
		console.error("flyPath must be an array with at least two points.");
		return;
	}

	const clock = new THREE.Clock();
	const curve = new THREE.CatmullRomCurve3(flyPath, false); // 'false' makes it a non-looping path
	const curveLength = curve.getLength();
	let t = offset; // Initial normalized position along the curve
	let delayElapsed = 0; // Tracks delay time

	function animate() {
		const delta = clock.getDelta();

		// Handle delay before starting animation
		if (delayElapsed < delay) {
			delayElapsed += delta;
			requestAnimationFrame(animate);
			return;
		}

		t += (delta * speed) / curveLength; // Increment 't' based on speed and time
		if (t > 1) t -= 1; // Reset 't' when it exceeds 1 (restart from the beginning)

		// Get the current and next positions
		const position = curve.getPointAt(t);
		const nextT = (t + 0.01) % 1; // Slightly ahead of 't'
		const nextPosition = curve.getPointAt(nextT);

		// Update position
		airCraftObject.position.copy(position);

		// Update orientation to face the direction of travel
		const lookAtMatrix = new THREE.Matrix4();
		lookAtMatrix.lookAt(position, nextPosition, new THREE.Vector3(0, 1, 0));
		airCraftObject.quaternion.setFromRotationMatrix(lookAtMatrix);

		// Adjust initial orientation for specific axis alignment
		airCraftObject.rotateX(Math.PI / 2);
		airCraftObject.rotateZ(Math.PI / 2);

		// Continue the animation
		requestAnimationFrame(animate);
	}

	animate();
}
