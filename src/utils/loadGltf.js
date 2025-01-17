import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export default function loadGltf({
	scene,
	filePath,
	callback = null,
	loading = null,
	addObject = true,
	mergeStaticGeometries = false, // Add this flag to toggle merging
}) {
	return new Promise((resolve, reject) => {
		// Load the GLTF model
		const loader = new GLTFLoader();
		loader.load(
			filePath,
			function (gltf) {
				if (mergeStaticGeometries) {
					// Arrays to store geometries grouped by material
					const geometriesByMaterial = new Map();

					// Traverse the scene to collect mesh geometries
					gltf.scene.traverse((object) => {
						if (object.isMesh) {
							object.material.needsUpdate = true;
							object.castShadow = true;
							object.receiveShadow = true;

							// Group geometries by material
							const materialKey = object.material.uuid;
							if (!geometriesByMaterial.has(materialKey)) {
								geometriesByMaterial.set(materialKey, {
									material: object.material,
									geometries: [],
								});
							}
							const group = geometriesByMaterial.get(materialKey);
							group.geometries.push(
								object.geometry.clone().applyMatrix4(object.matrixWorld)
							);
						}
					});

					// Merge geometries for each material group
					geometriesByMaterial.forEach((group) => {
						const mergedGeometry = mergeGeometries(
							group.geometries,
							false // Do not merge groups
						);

						// Create a single mesh for the merged geometry
						const mergedMesh = new THREE.Mesh(mergedGeometry, group.material);
						mergedMesh.castShadow = true;
						mergedMesh.receiveShadow = true;

						// Add the merged mesh to the scene
						scene.add(mergedMesh);
					});
				} else {
					// Add the original GLTF scene to the main scene
					if (addObject) {
						scene.add(gltf.scene);
					}
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
				if (loading) {
					loading(xhr.loaded / xhr.total);
				}
			},
			function (error) {
				// Reject the promise in case of an error
				console.error('An error happened', error);
				reject(error);
			}
		);
	});
}
