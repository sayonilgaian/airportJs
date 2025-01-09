import { basicInfo, detailedInfo } from '../data/toolTipData/aircraft.js';

export default function addObjectData({ scene, sceneObjects = [] }) {
	if (!scene) {
		console.error('No GLTF scene provided');
		return;
	}
	if (sceneObjects.length > 0) {
		addPlanesData({ sceneObjects });
	}
}

function addPlanesData({ sceneObjects = [] }) {
	// Function to recursively add data to an object and its children
	function addDataRecursively(sceneObject) {
		// Add user data to the object itself
		sceneObject.userData.basicData = basicInfo;
		sceneObject.userData.detailedData = detailedInfo;

		// Recursively process each child
		if (sceneObject.children && sceneObject.children.length > 0) {
			sceneObject.children.forEach((child) => {
				addDataRecursively(child);
			});
		}
	}

	for (let i = 0; i < sceneObjects.length; i++) {
		if (!sceneObjects[i].userData.basicData) {
			addDataRecursively(sceneObjects[i]);
		}
	}
}
