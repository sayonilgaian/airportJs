import * as THREE from 'three';

const flyPath = [
	new THREE.Vector3(200, 3, -20), // Start point
	new THREE.Vector3(-40, 3, -20), // Take off point
	new THREE.Vector3(-200, 50, -20), // Mid-air
	new THREE.Vector3(-200, 50, 180), // Turn left
	new THREE.Vector3(230, 50, 180), // Turn Left
	new THREE.Vector3(230, 50, -20), // Turn Left
	new THREE.Vector3(120, 3, -20), // Start point
];
const flyPath2 = [
	new THREE.Vector3(250, 3, -20), // Start point
	new THREE.Vector3(-40, 3, -20), // Take off point
	new THREE.Vector3(-200, 50, -20), // Mid-air
	new THREE.Vector3(-200, 50, 180), // Turn left
	new THREE.Vector3(230, 50, 180), // Turn Left
	new THREE.Vector3(230, 50, -20), // Turn Left
	new THREE.Vector3(120, 3, -20), // Start point
];

export { flyPath, flyPath2 };
