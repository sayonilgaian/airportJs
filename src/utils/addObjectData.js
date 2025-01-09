import { basicInfo, detailedInfo } from '../data/toolTipData/aircraft.js';

export default async function addObjectData(gltfScene) {
	if (!gltfScene) {
		console.error('No GLTF scene provided');
		return;
	}

	// Function to recursively add data to an object and its children
	async function addDataRecursively(object) {
		// Add user data to the object itself
		object.userData.basicData = basicInfo;
		object.userData.detailedData = detailedInfo;

		// Recursively process each child
		if (object.children && object.children.length > 0) {
			object.children.forEach((child) => {
				addDataRecursively(child);
			});
		}
	}

	// Traverse the scene and process matching objects
	await gltfScene.traverse(async (object) => {
		if (
			object.name &&
			!object.userData.basicData &&
			(object.name.includes('Airplane') || object.name.includes('American'))
		) {
			await addDataRecursively(object);
		}
	});
}
