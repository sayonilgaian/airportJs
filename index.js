import * as THREE from "three";
import loadGltf from "./utils/loadGltf.js";
import createScene from "./utils/createScene.js";
import focusOnObject from "./utils/focusOnObject.js";
import loadPlanes from "./utils/loadPlanes.js";
import addObjectData from "./utils/addObjectData.js";
import updateToolTip from "./utils/updateToolTip.js";
import { debounce } from "./helpers/index.js";

let { scene, camera, renderer, controls } = createScene();

loadGltf({
	scene,
	filePath: "model/airport.glb",
	callback: addObjectData,
	loading: (loadStatus) => {
		if (loadStatus < 1) return;
		loadPlanes({ scene });
	},
});

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", debounce(onMouseMove, 100), false);
window.addEventListener("click", onMouseClick, false);
// window.addEventListener("click", onMouseClick, false);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	updateToolTip(camera, raycaster, mouse, scene);
}

function onMouseClick(event) {
	updateToolTip(camera, raycaster, mouse, scene, (obj) =>
		focusOnObject(camera, controls, obj)
	);
}
