import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	return { scene, camera, renderer, controls };
}
