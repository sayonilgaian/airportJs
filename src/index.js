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
import addLoader from './utils/addLoader.js';

let isAnimating = true; // Animation state
let animationSpeed = 150;
let showFlightPath = false;

// Select buttons and add event listeners
const pauseButton = document.getElementById('toggle-button');
const resetButton = document.getElementById('reset-button');
const speedButton = document.getElementById('speed-button');
const flightPathBtn = document.getElementById('toggle-flight-path');
pauseButton.addEventListener('click', () => {
	isAnimating = !isAnimating;
	pauseButton.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
});
resetButton.addEventListener('click', () => resetAnimation());
speedButton.addEventListener('change', () => {
	animationSpeed = speedButton.value;
});
flightPathBtn.addEventListener('click', () => {
	showFlightPath = !showFlightPath;
	flightPathBtn.textContent = `${
		showFlightPath ? 'Hide' : ' Show'
	} Flight Path`;
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
let flightPathLines = [];

async function init() {
	// Create a loading text element
	const loadingElement = addLoader({ document });

	// Append the element to the document body
	document.body.appendChild(loadingElement);
	try {
		// Load airport GLTF asynchronously
		await loadGltf({
			scene,
			filePath: 'model/airport.glb',
			loading: (progress) => {
				loadingElement.style.boxShadow = `inset ${
					progress * loadingElement.offsetWidth
				}px 0 0 0 rgba(255, 255, 255, 0.5)`;
				loadingElement.textContent = `Loading... ${(progress * 100).toFixed(
					2
				)}%`;
			},
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
						// To select correct object for runway
						// runways.push(sceneObject?.children?.filter((childObject)=> childObject?.name === 'Plane018_1')[0]);
						runways.push(sceneObject);
					}
				});
			},
		});
		console.log('GLTF model loaded');

		// Remove loading text after loading is complete
		document.body.removeChild(loadingElement);

		// Load plane models
		setTimeout(async () => {
			await loadPlanes({
				scene,
				aircraftObjects
			});
			console.log('Plane models loaded');
		}, 1500);
	} catch (error) {
		console.error('Error initializing scene:', error);

		// Show an error message in the loading element
		loadingElement.textContent = 'Failed to load the model.';
	}
}

// Start animation
animate();

function resetAnimation() {
	if (!isAnimating) {
		return;
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

	if (aircraftObjects.length > 0) {
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
		console.log(aircraftObjects.length)
		// Update plane animations
		planeT1 = flyPlane({
			scene,
			airCraftObject: aircraftObjects[0],
			currentT: planeT1,
			deltaTime,
			speed: animationSpeed,
			flyPath: flyPath,
			rotateZ: Math.PI / 2,
			rotateX: Math.PI / 2,
			// rotateY: Math.PI,
			showFlightPath,
			flightPathLines,
		});
		planeT2 = flyPlane({
			scene,
			airCraftObject: aircraftObjects[1],
			currentT: planeT2,
			deltaTime,
			speed: animationSpeed,
			flyPath: flyPath2,
			rotateZ: Math.PI / 2,
			rotateX: Math.PI / 2,
			// rotateY: Math.PI,
			showFlightPath,
			flightPathLines,
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
