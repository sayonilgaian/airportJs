import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';
import focusOnObject from './utils/focusOnObject.js';
import loadPlanes from './utils/loadPlanes.js';
import addObjectData from './utils/addObjectData.js';
import updateToolTip from './utils/updateToolTip.js';
import { debounce } from './helpers/index.js';
import flyPlane from './utils/flyPlane.js';
import { flyPath, flyPath2 } from './data/flyPaths.js';
import addAircraft from './utils/addAircraft.js';

let isAnimating = true; // Animation state
const airCraftNumber = 7;
let animationSpeed = 150

// Select buttons and add event listeners
const pauseButton = document.getElementById('toggle-button');
const resetButton = document.getElementById('reset-button');
const speedButton = document.getElementById('speed-button');
pauseButton.addEventListener('click', () => {
	isAnimating = !isAnimating;
	pauseButton.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
});
resetButton.addEventListener('click', () => resetAnimation());
speedButton.addEventListener('change', () => {
	animationSpeed = speedButton.value
});

let { scene, camera, renderer, controls, floor } = createScene();

let aircraftObjects = [];
let towerObjects = [];
let terminals = [];
let runways = [];
let gates = [];
let parkingZones = [];

// Track the plane's normalized position along the curve
let planeT1 = 0;
let planeT2 = 0;
const clock = new THREE.Clock();

async function init() {
	try {
		// Load airport GLTF asynchronously
		await loadGltf({
			scene,
			filePath: 'model/airport.glb',
			callback: (scene) => {
				// Add static scene objects
				scene?.traverse((sceneObject) => {
					if (sceneObject?.name?.includes('Airplane')) {
						aircraftObjects.push(sceneObject);
					}
					if (sceneObject?.name?.includes('Tower')) {
						towerObjects.push(sceneObject);
					}
					if (sceneObject?.name?.includes('Airport-Building')) {
						terminals.push(sceneObject);
					}
					if (sceneObject?.name?.includes('airport-ground')) {
						runways.push(sceneObject);
					}
				});
			},
		});
		console.log('GLTF model loaded');

		// Load plane models
		setTimeout(async () => {
			await loadPlanes({
				scene,
				planeCallback: (aircraftObject) =>
					addAircraft({ scene, aircraftObject, aircraftObjects }),
			});
			console.log('Plane models loaded');
		}, 1500);
	} catch (error) {
		console.error('Error initializing scene:', error);
	}
}

// Start animation
animate();

function resetAnimation() {
	if (!isAnimating) {
		return
	}
	planeT1 = 0;
	planeT2 = 0;

	// Reset positions of aircraft
	if (aircraftObjects.length > 0) {
		const startPosition1 = flyPath[0]; // Starting point of flyPath
		const startPosition2 = flyPath2[0]; // Starting point of flyPath2

		aircraftObjects[0].position.copy(startPosition1);
		aircraftObjects[0].rotation.set(0, Math.PI, 0); // Reset orientation

		aircraftObjects[1].position.copy(startPosition2);
		aircraftObjects[1].rotation.set(0, Math.PI, 0); // Reset orientation
	}

	// Re-render scene
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);

	if (aircraftObjects.length === airCraftNumber) {
		addObjectData({ scene, sceneObjects: aircraftObjects, type: 'aircraft' });
	}
	if (towerObjects.length > 0) {
		addObjectData({ scene, sceneObjects: towerObjects, type: 'tower' });
	}
	if (terminals.length > 0) {
		addObjectData({ scene, sceneObjects: terminals, type: 'terminal' });
	}
	if (runways.length > 0) {
		addObjectData({ scene, sceneObjects: runways, type: 'runway' });
	}
	if (gates.length > 0) {
		addObjectData({ scene, sceneObjects: gates, type: 'gates' });
	}
	if (parkingZones.length > 0) {
		addObjectData({ scene, sceneObjects: runways, type: 'parkingZone' });
	}

	const deltaTime = clock.getDelta(); // Time since last frame

	if (isAnimating && aircraftObjects.length > 0) {
		// Update plane animations
		planeT1 = flyPlane({
			airCraftObject: aircraftObjects[0],
			currentT: planeT1,
			deltaTime,
			speed: animationSpeed,
			flyPath: flyPath,
			rotateZ: Math.PI / 2,
			rotateX: Math.PI / 2,
		});
		planeT2 = flyPlane({
			airCraftObject: aircraftObjects[1],
			currentT: planeT2,
			deltaTime,
			speed: animationSpeed,
			flyPath: flyPath2,
			rotateZ: Math.PI / 2,
			rotateX: Math.PI / 2,
		});
	}

	controls.update();
	renderer.render(scene, camera);
}

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', debounce(onMouseMove, 100), false);
window.addEventListener('click', onMouseClick, false);
window.addEventListener('dblclick', onMouseDblClick, false);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	updateToolTip({ camera, raycaster, mouse, scene });
}

function onMouseClick(event) {
	updateToolTip({
		camera,
		raycaster,
		mouse,
		scene,
		callback: null,
		showDetails: true,
	});
}

function onMouseDblClick(event) {
	updateToolTip({
		camera,
		raycaster,
		mouse,
		scene,
		callback: (obj) => focusOnObject(camera, controls, obj),
		showDetails: true,
	});
}

// Initialize the scene
init();
