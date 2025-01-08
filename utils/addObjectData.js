import { basicInfo, detailedInfo } from '../data/toolTipData/aircraft.js';

export default function addObjectData(gltfScene) {
	gltfScene?.traverse((object) => {
		// add planes data
		if (
			object?.name?.includes('Airplane') ||
			object?.name?.includes('American+Airlines')
		) {
			object.userData.basicData = basicInfo;
			object.userData.detailedData = detailedInfo;
		}
	});
}
