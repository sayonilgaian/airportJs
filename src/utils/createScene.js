import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

export default function createScene() {
	// Scene setup
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(100, 150, 300);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Lighting
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 5, 5).normalize();
	directionalLight.castShadow = true;
	scene.add(directionalLight);

	// Load texture for the floor
	const textureLoader = new THREE.TextureLoader();
	const floorTexture = textureLoader.load(
		'../../model/background/wireframe.png'
	);

	// Repeat and wrap the texture infinitely
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(100, 100); // Adjust tiling; higher values for denser repeat

	// Create a plane for the floor
	const floorGeometry = new THREE.PlaneGeometry(10000, 10000); // Large plane to simulate infinity
	const floorMaterial = new THREE.MeshBasicMaterial({
		map: floorTexture,
		side: THREE.DoubleSide,
	});

	// Floor mesh
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2; // Rotate to lie flat on the XZ plane
	floor.position.y = 0; // Position at y = 0
	floor.userData.type = 'floor';

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.maxDistance = 500; // Maximum zoom-out distance
	controls.minDistance = 50; // Optional: Minimum zoom-in distance
	// Prevent camera from rotating below the horizontal plane (positive Y)
	controls.maxPolarAngle = (85 * Math.PI) / 180; // 85 degrees
	controls.update();

	return { scene, camera, renderer, controls, floor };
}
