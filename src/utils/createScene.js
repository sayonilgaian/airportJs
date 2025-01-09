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

	// Load environment texture
	const textureLoader = new THREE.CubeTextureLoader();
	const environmentTexture = textureLoader.load([
		'../../model/background/wireframe.png',
		'../../model/background/wireframe.png',
		'../../model/background/wireframe.png',
		'../../model/background/wireframe.png',
		'../../model/background/wireframe.png',
		'../../model/background/wireframe.png',
	]);

	scene.environment = environmentTexture; // Apply as environment
	scene.background = environmentTexture; // Apply as background

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.maxDistance = 500; // Maximum zoom-out distance
    controls.minDistance = 50;  // Optional: Minimum zoom-in distance
	// Prevent camera from rotating below the horizontal plane (positive Y)
    controls.maxPolarAngle = Math.PI / 2; // 90 degrees (horizontal plane)
	controls.update();

	return { scene, camera, renderer, controls };
}
