import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

export default function loadGltf(filePath = '', scene) {
	// Load GLTF Model
	const loader = new GLTFLoader();
	let model;
	loader.load(
		filePath,
		(gltf) => {
			model = gltf.scene;
			scene.add(model);
		},
		undefined,
		(error) => console.error(error)
	);
}
