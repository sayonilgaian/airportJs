import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';
import flyPlane from './utils/flyPlane.js';
import focusOnObject from './utils/focusOnObject.js';
import highlightObject from './utils/highlightObject.js';
import showInfo from './utils/showInfo.js';
import { flyPath } from './data/flyPaths.js';

let { scene, camera, renderer, controls } = createScene();

loadGltf(scene, 'model/updated-airport.glb');
loadGltf(scene, 'model/AIRPLANE.glb', (sc) => {
	flyPlane({
		airCraftObject: sc,
		delay: 2,
		offset: 0.1,
		speed: 150,
		rotateY: Math.PI,
	});
	// const clone = sc.clone();
	// scene.add(clone);
	// flyPlane({
	// 	airCraftObject: clone,
	// 	flyPath,
	// 	delay: 2,
	// 	offset: 0.1,
	// 	speed: 50,
	// });
	// const clone2 = sc.clone();
	// scene.add(clone2);
	// flyPlane({
	// 	airCraftObject: clone2,
	// 	flyPath: flyPath2,
	// 	delay: 2,
	// 	offset: 0.1,
	// 	speed: 50,
	// });
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
}

function onMouseClick(event) {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		console.log('Clicked on:', selectedObject?.name);

		// // Show info
		showInfo(selectedObject, camera);

		// Highlight object
		highlightObject(selectedObject);

		focusOnObject(camera, controls, selectedObject);
	}
}
