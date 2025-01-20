import * as THREE from 'three';
import loadGltf from './utils/loadGltf.js';
import createScene from './utils/createScene.js';
import focusOnObject from './utils/focusOnObject.js';
import loadPlanes from './utils/loadPlanes.js';
import addObjectData from './utils/addObjectData.js';
import updateToolTip from './utils/updateToolTip.js';
import { debounce } from './helpers/index.js';
import flyPlane from './utils/flyPlane.js';
import flightPaths from './data/flyPaths.js';
import addLoader from './utils/addLoader.js';
import resetAnimation from './utils/resetAnimation.js';

let isAnimating = true; // Animation state
let animationSpeed = 150;
let showFlightPath = false;
let aircraftObjects = [];
let towerObjects = [];
let terminals = [];
let runways = [];
let gates = [];
let parkingZones = [];
// Track the plane's normalized position along the curve
let airCraftPositions = new Array(flightPaths.length).fill(0);
const clock = new THREE.Clock();
let flightPathLines = [];
const numberOfAircrafts = 2;
let { scene, camera, renderer, controls, floor } = createScene();

// Select buttons and add event listeners
const pauseButton = document.getElementById('toggle-button');
const resetButton = document.getElementById('reset-button');
const speedButton = document.getElementById('speed-button');
const flightPathBtn = document.getElementById('toggle-flight-path');

// initially all buttons are disabled, until 3d models are loaded
pauseButton.disabled = true;
resetButton.disabled = true;
speedButton.disabled = true;
flightPathBtn.disabled = true;

// adding event listerners
pauseButton.addEventListener('click', () => {
	isAnimating = !isAnimating;
	resetButton.disabled = !isAnimating;
	pauseButton.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
});
resetButton.addEventListener('click', () => {
	resetAnimation({
		isAnimating,
		airCraftPositions,
		renderer,
		scene,
		camera,
	});
});
speedButton.addEventListener('change', () => {
	animationSpeed = speedButton.value;
});
flightPathBtn.addEventListener('click', () => {
	showFlightPath = !showFlightPath;
	flightPathBtn.textContent = `${
		showFlightPath ? 'Hide' : ' Show'
	} Flight Path`;
});

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
				// airport takes 95% time to load
				loadingElement.style.boxShadow = `inset ${
					progress * 0.95 * loadingElement.offsetWidth * 0.9
				}px 0 0 0 rgba(255, 255, 255, 0.5)`;
				loadingElement.textContent = `Loading... ${(progress * 95).toFixed(
					0
				)}%`;
			},
			callback: (scene) => {
				// Add static scene objects
				scene?.traverse((sceneObject) => {
					if (sceneObject?.name?.includes('Tower')) {
						towerObjects.push(sceneObject);
					}
					if (sceneObject?.name?.includes('Airport-Building')) {
						terminals.push(sceneObject);
					}
					if (sceneObject?.name?.includes('airport-ground')) {
						// To select correct object for runway
						runways.push(
							sceneObject?.children?.filter(
								(childObject) => childObject?.name === 'Plane018_1'
							)[0]
						);
						// runways.push(sceneObject);
					}
				});
			},
		});
		console.log('GLTF model loaded');

		scene.add(floor);

		// Load plane models
		await loadPlanes({
			scene,
			aircraftObjects,
			numberOfAircrafts,
			loading: (progress) => {
				// aircraft takes 5% time to load
				loadingElement.style.boxShadow = `inset ${
					(0.95 + progress * 0.05) * loadingElement.offsetWidth
				}px 0 0 0 rgba(255, 255, 255, 0.5)`;
				loadingElement.textContent = `Loading... ${(95 + progress * 5).toFixed(
					0
				)}%`;
			},
		});

		// add static plane models which are part of airport model
		scene.traverse((sceneObject)=>{
			if (sceneObject?.name?.includes("Airplane-Lufthansa")) {
				aircraftObjects.push(sceneObject)
			}
		})

		for (let i = 0; i < aircraftObjects.length; i++) {
			scene.add(aircraftObjects[i]);
		}
		console.log('Plane models loaded');

		// Remove loading text after loading is complete
		loadingElement.removeLoader();

		// enable all interaction buttons
		pauseButton.disabled = false;
		resetButton.disabled = false;
		speedButton.disabled = false;
		flightPathBtn.disabled = false;
	} catch (error) {
		console.error('Error initializing scene:', error);

		// Show an error message in the loading element
		loadingElement.textContent = 'Failed to load the model. Retrying...';

		// Reload window after 1.5 sec
		setTimeout(() => {
			window.location.reload();
		}, 1500);
	}
}

// Start animation
animate();

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
		// Update plane animations

		for (
			let i = 0;
			i < Math.min(aircraftObjects.length, flightPaths.length);
			i++
		) {
			let airCraftPosition = flyPlane({
				scene,
				airCraftObject: aircraftObjects[i],
				currentT: airCraftPositions[i],
				deltaTime,
				speed: animationSpeed,
				flyPath: flightPaths[i],
				// rotateZ: Math.PI / 2,
				// rotateX: Math.PI / 2,
				rotateY: Math.PI,
				showFlightPath,
				flightPathLines,
			});
			airCraftPositions[i] = airCraftPosition;
		}
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
