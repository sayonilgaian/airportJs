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
			sc.position.y = 15
			planeCallback(sc);
			planeCallback(clone);
		},
		addObject: false,
	});
}
