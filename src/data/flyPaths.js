import * as THREE from 'three';

const verticalOffset = 10;
const zOffset = 28;

const flyPath = [
	new THREE.Vector3(200, 3 + verticalOffset, -50 + zOffset), // Start point
	new THREE.Vector3(-40, 3 + verticalOffset, -50 + zOffset), // Take off point
	new THREE.Vector3(-200, 50, -50 + zOffset), // Mid-air
	new THREE.Vector3(-200, 50, 180 + zOffset), // Turn left
	new THREE.Vector3(230, 50, 180 + zOffset), // Turn Left
	new THREE.Vector3(230, 50, -50 + zOffset), // Turn Left
	new THREE.Vector3(200, 3 + verticalOffset, -50 + zOffset), // Start point
];
const flyPath2 = [
	new THREE.Vector3(150, 4 + verticalOffset, 20 + zOffset), // Start point
	new THREE.Vector3(-40, 4 + verticalOffset, 20 + zOffset), // Take off point
	new THREE.Vector3(-250, 80, 20 + zOffset), // Mid-air
	new THREE.Vector3(-250, 80, -250 + zOffset), // Turn right
	new THREE.Vector3(260, 80, -250 + zOffset), // Turn right
	new THREE.Vector3(260, 80, 20 + zOffset), // Turn right
	new THREE.Vector3(150, 4 + verticalOffset, 20 + zOffset), // Start point
];

export { flyPath, flyPath2 };
