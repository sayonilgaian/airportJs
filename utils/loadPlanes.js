import loadGltf from './loadGltf.js';

export default function loadPlanes({ scene, filePath = 'model/AIRPLANE.glb' }) {
	loadGltf({
		scene,
		filePath,
		callback: (sc) => {
			const clone = sc.clone();
			scene.add(clone);
		},
	});
}
