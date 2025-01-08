import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';
import focusOnObject from './utils/focusOnObject.js';
import highlightObject from './utils/highlightObject.js';
import showInfo from './utils/showInfo.js';
import loadPlanes from './utils/loadPlanes.js';
import addObjectData from './utils/addObjectData.js';
import flyPlane from './utils/flyPlane.js';
import { flyPath, flyPath2 } from './data/flyPaths.js';

let isAnimating = true; // Animation state

// Select the button and add event listener
const button = document.getElementById('toggle-button');
button.addEventListener('click', () => {
	isAnimating = !isAnimating;
	button.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
});

let { scene, camera, renderer, controls } = createScene();

loadGltf({
	scene,
	filePath: 'model/updated-airport.glb',
	callback: addObjectData,
	loading: (loadStatus) => {
		if (loadStatus < 1) return;
		loadPlanes({ scene, planeCallback:(planeObject)=> {
			planeObject.position.y = -10 // temporary measure to hide unwanted plane parts
			scene.add(planeObject)
		} });
	},
});

// Track the plane's normalized position along the curve
let planeT1 = 0;
let planeT2 = 0;
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);

	const deltaTime = clock.getDelta(); // Time since last frame

	if (isAnimating) {
		let planes = [];
		scene.traverse((object) => {
			if (object?.name?.includes('American+Airlines')) {
				planes.push(object);
			}
		});
		if (planes.length > 0) {
			// Update plane animations
			planeT1 = flyPlane({
				airCraftObject: planes[0],
				currentT: planeT1,
				deltaTime,
				speed: 150,
				flyPath: flyPath,
				rotateY: Math.PI,
			});
			planeT2 = flyPlane({
				airCraftObject: planes[1],
				currentT: planeT2,
				deltaTime,
				speed: 200,
				flyPath: flyPath2,
				rotateY: Math.PI,
			});
		}
	}

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
