import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
directionalLight.castShadow = true;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
	"model/airport.glb",
	function (gltf) {
		console.log(gltf.scene); // Debug the model

		// Fix materials and shadows
		gltf.scene.traverse((object) => {
			if (object.isMesh) {
				object.material.needsUpdate = true;
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});

		// Add the model to the scene
		scene.add(gltf.scene);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	function (error) {
		console.error("An error happened", error);
	}
);

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
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick, false);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick() {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0) {
		const selectedObject = intersects[0].object;
		console.log("Clicked on:", selectedObject);

		// Show info
		showInfo(selectedObject);

		// Highlight object
		highlightObject(selectedObject);

		focusOnObject(selectedObject);
	}
}

function showInfo(object) {
	const info = document.getElementById("info");
	info.style.display = "block";
	info.style.left = `${event.clientX}px`;
	info.style.top = `${event.clientY}px`;
	info.innerHTML = `
    <strong>From Click</strong>
    <strong>${object.name || "Unnamed Object"}</strong><br>
    <em>${object.userData?.description || "No description available"}</em>
  `;
}

function highlightObject(object) {
	if (object.material) {
		object.material = object.material.clone();
		object.material.emissive = new THREE.Color(0x4444ff); // Highlight color
	}
}

function focusOnObject(object) {
	// Calculate the bounding box of the object
	const box = new THREE.Box3().setFromObject(object);
	const center = box.getCenter(new THREE.Vector3());
	const size = box.getSize(new THREE.Vector3());

	// Calculate the desired distance to frame the object
	const distance = Math.max(size.x, size.y, size.z) * 2;
	const direction = new THREE.Vector3()
		.subVectors(camera.position, center)
		.normalize()
		.multiplyScalar(distance);

	// Calculate the new camera position
	const newPosition = new THREE.Vector3().addVectors(center, direction);

	// Animate the camera
	const animationDuration = 1000; // 1 second
	const start = {
		position: camera.position.clone(),
		target: controls.target.clone(),
	};
	const end = {
		position: newPosition,
		target: center,
	};

	let startTime = null;
	function animateCamera(timestamp) {
		if (!startTime) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / animationDuration, 1);

		// Interpolate the camera position and controls target
		camera.position.lerpVectors(start.position, end.position, progress);
		controls.target.lerpVectors(start.target, end.target, progress);
		controls.update();

		if (progress < 1) {
			requestAnimationFrame(animateCamera);
		}
	}

	requestAnimationFrame(animateCamera);
}
