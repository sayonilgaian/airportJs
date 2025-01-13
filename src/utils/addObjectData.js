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
	});
}

function addSceneObjectsData({ sceneObjects = [], formattedData }) {
	// Function to recursively add data to an object and its children
	function addDataRecursively(sceneObject, data) {
		// Add user data to the object itself
		sceneObject.userData.basicData = data.basicInfo;
		sceneObject.userData.detailedData = data.detailedInfo;

		// Recursively process each child
		if (sceneObject.children && sceneObject.children.length > 0) {
			sceneObject.children.forEach((child) => {
				addDataRecursively(child, data);
			});
		}
	}

	for (
		let i = 0;
		i < Math.min(sceneObjects.length, formattedData.length);
		i++
	) {
		if (!sceneObjects[i]?.userData?.basicData) {
			addDataRecursively(sceneObjects[i], formattedData[i]);
		}
	}
}
