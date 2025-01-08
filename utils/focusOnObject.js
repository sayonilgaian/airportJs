function focusOnObject(camera, controls, object) {
	// Calculate the bounding box of the object
	const box = new THREE.Box3().setFromObject(object);
	const center = box.getCenter(new THREE.Vector3());
	const size = box.getSize(new THREE.Vector3());

	// Calculate the desired distance to frame the object
	const distance = Math.max(size.x, size.y, size.z) * 2;
	const direction = new THREE.Vector3()
		.subVectors(camera.position, center)
		.normalize()
		.multiplyScalar(distance);

	// Calculate the new camera position
	const newPosition = new THREE.Vector3().addVectors(center, direction);

	// Animate the camera
	const animationDuration = 1000; // 1 second
	const start = {
		position: camera.position.clone(),
		target: controls.target.clone(),
	};
	const end = {
		position: newPosition,
		target: center,
	};

	let startTime = null;
	function animateCamera(timestamp) {
		if (!startTime) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / animationDuration, 1);

		// Interpolate the camera position and controls target
		camera.position.lerpVectors(start.position, end.position, progress);
		controls.target.lerpVectors(start.target, end.target, progress);
		controls.update();

		if (progress < 1) {
			requestAnimationFrame(animateCamera);
		}
	}

	requestAnimationFrame(animateCamera);
}

export default focusOnObject;
