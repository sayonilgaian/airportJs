import airCraftFormattedData from '../data/toolTipData/aircraft.js';
import towerFormattedData from '../data/toolTipData/controlTowers.js';
import gatesFormattedData from '../data/toolTipData/gates.js';
import parkingFormattedData from '../data/toolTipData/parking.js';
import formattedRunwayData from '../data/toolTipData/runways.js';
import formattedTerminalData from '../data/toolTipData/terminals.js';

export default function addObjectData({ scene, sceneObjects = [], type }) {
	const objectDataInsertion = {
		aircraft: airCraftFormattedData,
		tower: towerFormattedData,
		terminal: formattedTerminalData,
		runway: formattedRunwayData,
		parkingZone: parkingFormattedData,
		gates: gatesFormattedData,
	};

	if (!scene) {
		console.error('No GLTF scene provided');
		return;
	}

	addSceneObjectsData({
		sceneObjects,
		formattedData: objectDataInsertion[type],
		objectDataInsertion,
		type,
	});
}

function addSceneObjectsData({
	sceneObjects = [],
	formattedData,
	objectDataInsertion,
	type,
}) {
	// Function to recursively add data to an object and its children
	function addDataRecursively(sceneObject, index) {
		// Add user data to the object itself
		if (!index) {
			return;
		}
		sceneObject.userData.basicData = formattedData[index].basicInfo;
		sceneObject.userData.detailedData = formattedData[index].detailedInfo;

		// Recursively process each child
		if (sceneObject.children && sceneObject.children.length > 0) {
			sceneObject.children.forEach((child) => {
				addDataRecursively(child);
			});
		}
	}

	for (
		let i = 0;
		i < Math.max(sceneObjects.length, objectDataInsertion[type].length);
		i++
	) {
		if (!sceneObjects[i]?.userData?.basicData && i) {
			addDataRecursively(sceneObjects[i], i);
		}
	}
}
