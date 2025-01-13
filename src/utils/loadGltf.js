import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function loadGltf({
	scene,
	filePath,
	callback = null,
	loading = null,
	addObject = true,
}) {
	return new Promise((resolve, reject) => {
		// Load the GLTF model
		const loader = new GLTFLoader();
		loader.load(
			filePath,
			function (gltf) {
				// Fix materials and shadows
				gltf.scene.traverse((object) => {
					if (object.isMesh) {
						object.material.needsUpdate = true;
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});

				// Add the model to the scene
				if (addObject) {
					scene.add(gltf.scene);
				}

				// Execute the callback if provided
				if (callback) {
					callback(gltf.scene);
				}

				// Resolve the promise with the loaded scene
				resolve(gltf.scene);
			},
			function (xhr) {
				// Track loading progress
				console.log(filePath + ": " + (xhr.loaded / xhr.total) * 100 + "% loaded");
				if (loading) {
					loading(xhr.loaded / xhr.total);
				}
			},
			function (error) {
				// Reject the promise in case of an error
				console.error("An error happened", error);
				reject(error);
			}
		);
	});
}
