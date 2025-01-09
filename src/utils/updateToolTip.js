import highlightObject from "./highlightObject.js";
import showInfo from "./showInfo.js";

function updateToolTip(camera, raycaster, mouse, scene, callback = null, showDetails = false) {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		// console.log('===',selectedObject)

		// Show info
		showInfo(selectedObject, camera, showDetails);

		// Highlight object
		highlightObject(selectedObject);
		if (callback) {
			callback(selectedObject);
		}
	}
}

export default updateToolTip;
