import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

export default function createScene() {
	// Scene, Camera, Renderer
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

	// Orbit Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Light
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(10, 10, 10);
	scene.add(light);

	return { scene, camera, controls, renderer };
}
