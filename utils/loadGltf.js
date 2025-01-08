import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function loadGltf({
	scene,
	filePath,
	callback = null,
	loading = null,
}) {
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

			if (callback) {
				callback(gltf.scene);
			}
		},
		function (xhr) {
			// console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			if (loading) {
				loading(xhr.loaded / xhr.total);
			}
		},
		function (error) {
			console.error('An error happened', error);
		}
	);

	return loader;
}
