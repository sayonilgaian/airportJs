import loadGltf from './loadGltf.js';

export default function loadPlanes({
	scene,
	filePath = 'model/AIRPLANE.glb',
	planeCallback,
}) {
	loadGltf({
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
