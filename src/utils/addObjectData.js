import {
	aircraftBasicInfo,
	aircraftDetailedInfo,
} from '../data/toolTipData/aircraft.js';
import {
	towerBasicInfo,
	towerDetailedInfo,
} from '../data/toolTipData/controlTowers.js';
import {
	gatesBasicInfo,
	gatesDetailedInfo,
} from '../data/toolTipData/gates.js';
import {
	parkingBasicInfo,
	parkingDetailedInfo,
} from '../data/toolTipData/parking.js';
import {
	basicRunwayInfo,
	detailedRunwayInfo,
} from '../data/toolTipData/runways.js';
import {
	terminalBasicInfo,
	terminalDetailedInfo,
} from '../data/toolTipData/terminals.js';

export default function addObjectData({ scene, sceneObjects = [], type }) {
	const objectDataInsertion = {
		aircraft: {
			basicInfo: aircraftBasicInfo,
			detailedInfo: aircraftDetailedInfo,
		},
		tower: {
			basicInfo: towerBasicInfo,
			detailedInfo: towerDetailedInfo,
		},
		terminal: {
			basicInfo: terminalBasicInfo,
			detailedInfo: terminalDetailedInfo,
		},
		runway: {
			basicInfo: basicRunwayInfo,
			detailedInfo: detailedRunwayInfo,
		},
		parkingZone: {
			basicInfo: parkingBasicInfo,
			detailedInfo: parkingDetailedInfo,
		},
		gates: {
			basicInfo: gatesBasicInfo,
			detailedInfo: gatesDetailedInfo,
		},
	};

	if (!scene) {
		console.error('No GLTF scene provided');
		return;
	}

	addSceneObjectsData({
		sceneObjects,
		basicInfo: objectDataInsertion[type].basicInfo,
		detailedInfo: objectDataInsertion[type].detailedInfo,
	});
}

function addSceneObjectsData({ sceneObjects = [], basicInfo, detailedInfo }) {
	// Function to recursively add data to an object and its children
	function addDataRecursively(sceneObject) {
		// Add user data to the object itself
		sceneObject.userData.basicData = basicInfo;
		sceneObject.userData.detailedData = detailedInfo;

		// Recursively process each child
		if (sceneObject.children && sceneObject.children.length > 0) {
			sceneObject.children.forEach((child) => {
				addDataRecursively(child);
			});
		}
	}

	for (let i = 0; i < sceneObjects.length; i++) {
		if (!sceneObjects[i].userData.basicData) {
			addDataRecursively(sceneObjects[i]);
		}
	}
}
