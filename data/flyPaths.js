import * as THREE from 'three';

const verticalOffset = 10;

const flyPath = [
	new THREE.Vector3(200, 3 + verticalOffset, -50), // Start point
	new THREE.Vector3(-40, 3 + verticalOffset, -50), // Take off point
	new THREE.Vector3(-200, 50, -50), // Mid-air
	new THREE.Vector3(-200, 50, 180), // Turn left
	new THREE.Vector3(230, 50, 180), // Turn Left
	new THREE.Vector3(230, 50, -50), // Turn Left
	new THREE.Vector3(200, 3 + verticalOffset, -50), // Start point
];
const flyPath2 = [
	new THREE.Vector3(150, 4 + verticalOffset, 20), // Start point
	new THREE.Vector3(-40, 4 + verticalOffset, 20), // Take off point
	new THREE.Vector3(-250, 80, 20), // Mid-air
	new THREE.Vector3(-250, 80, -250), // Turn right
	new THREE.Vector3(260, 80, -250), // Turn right
	new THREE.Vector3(260, 80, 20), // Turn right
	new THREE.Vector3(150, 4 + verticalOffset, 20), // Start point
];

export { flyPath, flyPath2 };
