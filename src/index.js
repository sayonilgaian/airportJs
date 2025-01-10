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

// Select the button and add event listener
const button = document.getElementById('toggle-button');
button.addEventListener('click', () => {
	isAnimating = !isAnimating;
	button.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
});

let { scene, camera, renderer, controls, floor } = createScene();

let aircraftObjects = [];
let towerObjects = [];
let terminals = [];
let runways = [];
let gates = [];
let parkingZones = [];

loadGltf({
	scene,
	filePath: 'model/airport.glb',
	callback: (scene) => {
		// add static scene objects which are part of gltf file
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
			// TODO: when these objects are added in gltf, uncomment this
			// if (sceneObject?.name?.includes('parking')) {
			// 	gates.push(sceneObject);
			// }
			// if (sceneObject?.name?.includes('gates')) {
			// 	parkingZones.push(sceneObject);
			// }
		});
	},
	loading: (loadStatus) => {
		if (loadStatus < 1) return;
		loadPlanes({
			scene,
			planeCallback: (aircraftObject) =>
				addAircraft({ scene, aircraftObject, aircraftObjects }),
		});
	},
});

// Track the plane's normalized position along the curve
let planeT1 = 0;
let planeT2 = 0;
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);
	if (aircraftObjects.length == airCraftNumber) {
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

	if (isAnimating) {
		if (aircraftObjects.length > 0) {
			// Update plane animations
			planeT1 = flyPlane({
				airCraftObject: aircraftObjects[0],
				currentT: planeT1,
				deltaTime,
				speed: 150,
				flyPath: flyPath,
				rotateY: Math.PI,
			});
			planeT2 = flyPlane({
				airCraftObject: aircraftObjects[1],
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
