import * as THREE from 'three';

const flightPaths = []
const verticalOffset = 4;
const zOffset = 4;
// const verticalOffset = 0;
// const zOffset = 0;

const flyPath = [
	new THREE.Vector3(130, 3 + verticalOffset, -50 + zOffset), // Start point
	new THREE.Vector3(-40, 3 + verticalOffset, -50 + zOffset), // Take off point
	new THREE.Vector3(-200, 50, -50 + zOffset), // Mid-air
	new THREE.Vector3(-200, 50, 180 + zOffset), // Turn left
	new THREE.Vector3(270, 50, 180 + zOffset), // Turn Left
	new THREE.Vector3(270, 50, -50 + zOffset), // Turn Left
	new THREE.Vector3(130, 3 + verticalOffset, -50 + zOffset), // Start point
];
const flyPath2 = [
	new THREE.Vector3(130, 4 + verticalOffset, 20 + zOffset), // Start point
	new THREE.Vector3(-40, 4 + verticalOffset, 20 + zOffset), // Take off point
	new THREE.Vector3(-250, 80, 20 + zOffset), // Mid-air
	new THREE.Vector3(-250, 80, -250 + zOffset), // Turn right
	new THREE.Vector3(280, 80, -250 + zOffset), // Turn right
	new THREE.Vector3(280, 80, 20 + zOffset), // Turn right
	new THREE.Vector3(130, 4 + verticalOffset, 20 + zOffset), // Start point
];

flightPaths.push(flyPath,flyPath2)

export default flightPaths;
