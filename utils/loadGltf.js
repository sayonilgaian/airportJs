import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import flyPlane from './flyPlane.js';
import removePlanes from './removePlanes.js';

export default function loadGltf(scene, filePath) {
	// Load the GLTF model
	const loader = new GLTFLoader();
	loader.load(
		filePath,
		function (gltf) {
			// console.log(gltf.scene); // Debug the model

			// Fix materials and shadows
			gltf.scene.traverse((object) => {
				if (object.isMesh) {
					object.material.needsUpdate = true;
					object.castShadow = true;
					object.receiveShadow = true;
				}
			});

			// Add the model to the scene
			scene.add(gltf.scene);

			let airCraftModels = [];
			let groundObject = [];
			gltf.scene.traverse((childObject) => {
				if (childObject.name?.includes('Airplane-Lufthansa-Boing')) {
					airCraftModels.push(childObject);
				}
				if (childObject.name?.includes('Ground001')) {
					groundObject.push(childObject);
				}
			});

			// for testing individual planes
			let chosenPlane = 8;
			flyPlane(airCraftModels[chosenPlane]);
			airCraftModels.splice(chosenPlane, 1);
			removePlanes(airCraftModels);
			removePlanes(groundObject); // to remove massive ground outside air port
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		function (error) {
			console.error('An error happened', error);
		}
	);

	return loader;
}
