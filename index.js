import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';
import focusOnObject from './utils/focusOnObject.js';
import highlightObject from './utils/highlightObject.js';
import showInfo from './utils/showInfo.js';
import loadPlanes from './utils/loadPlanes.js';
import addObjectData from './utils/addObjectData.js';

let { scene, camera, renderer, controls } = createScene();

loadGltf({
	scene,
	filePath: 'model/updated-airport.glb',
	callback: addObjectData,
	loading: (loadStatus) => {
		if (loadStatus < 1) return;
		loadPlanes({ scene });
	},
});

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

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		if (
			selectedObject?.name?.includes('Airplane') ||
			selectedObject?.parent?.name?.includes('Airplane')
		) {
		}
	}
}

function onMouseClick(event) {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		console.log('Clicked on:', selectedObject?.name);

		// Show info
		showInfo(selectedObject, camera);

		// Highlight object
		highlightObject(selectedObject);

		focusOnObject(camera, controls, selectedObject);
	}
}
