import loadGltf from './loadGltf.js';

export default async function loadPlanes({
	scene,
	filePath = 'model/AIRPLANE.glb',
	planeCallback = () => {},
	aircraftObjects,
}) {
	await loadGltf({
		scene,
		filePath,
		callback: (sc) => {
			sc.position.y = -10; // temporary measure to hide unwanted plane parts
			const clone = sc.clone();
			planeCallback(sc);
			planeCallback(clone);
			// aircraftObjects.push(sc?.children[0]);
			// aircraftObjects.push(clone?.children[0]);
		},
		addObject: true,
	});
}
