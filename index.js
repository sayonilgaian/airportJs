import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';

let { scene, camera, renderer, controls } = createScene();

loadGltf(scene, 'model/airport.glb');

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick() {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		console.log('Clicked on:', selectedObject?.name);

		// // Show info
		// showInfo(selectedObject);

		// Highlight object
		// highlightObject(selectedObject);

		// focusOnObject(selectedObject);
	}
}

function showInfo(object) {
	const info = document.getElementById('info');
	info.style.display = 'block';
	info.style.left = `${event.clientX}px`;
	info.style.top = `${event.clientY}px`;
	info.innerHTML = `
    <strong>From Click</strong>
    <strong>${object.name || 'Unnamed Object'}</strong><br>
    <em>${object.userData?.description || 'No description available'}</em>
  `;
}

function highlightObject(object) {
	if (object.material) {
		object.material = object.material.clone();
		object.material.emissive = new THREE.Color(0x4444ff); // Highlight color
	}
}

function focusOnObject(object) {
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
