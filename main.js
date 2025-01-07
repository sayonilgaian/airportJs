// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { GLTFLoader } from 'loaders';

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Load GLTF File
const loader = new GLTFLoader();
loader.load(
	'./models/scene.gltf', // Replace with the actual path to your GLTF file
	(gltf) => {
		scene.add(gltf.scene);
		console.log('Model loaded successfully');
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	},
	(error) => {
		console.error('An error occurred while loading the model:', error);
	}
);

// Position the Camera
camera.position.z = 5;

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
