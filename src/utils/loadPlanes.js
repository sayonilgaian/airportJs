import loadGltf from './loadGltf.js';

export default async function loadPlanes({
	scene,
	filePath = 'model/AIRPLANE.glb',
	planeCallback = () => {},
	aircraftObjects,
	numberOfAircrafts,
	loading
}) {
	await loadGltf({
		scene,
		filePath,
		callback: (sc) => {
			sc.position.z = -10; // temporary measure to hide unwanted plane parts
			const clone = sc.clone();
			aircraftObjects.push(sc?.children[0]);
			planeCallback(sc);
			for (let i = 1; i < numberOfAircrafts; i++) {
				aircraftObjects.push(clone?.children[0]);
				planeCallback(clone);
			}
		},
		addObject: false,
		loading
	});
}
