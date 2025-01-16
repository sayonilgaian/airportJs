import loadGltf from './loadGltf.js';

export default async function loadPlanes({
	scene,
	filePath = 'model/AIRPLANE.glb',
	planeCallback,
}) {
	await loadGltf({
		scene,
		filePath,
		callback: (sc) => {
			const clone = sc.clone();
			planeCallback(sc);
			planeCallback(clone);
		},
		addObject: false,
	});
}
