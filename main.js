import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

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

// Load GLTF Model
const loader = new GLTFLoader();
let model;
loader.load(
    // './models/airport1/scene.gltf', // Replace with your model path
    // './models/airport2/scene.gltf', // Replace with your model path
    './models/airport3/scene.gltf', // Replace with your model path
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Add overlay points after model is loaded
        addTextOverlays([
            { position: new THREE.Vector3(0, 1, 0), text: 'Point 1', info: 'Info about Point 1' },
            { position: new THREE.Vector3(2, 1.5, -1), text: 'Point 2', info: 'Info about Point 2' },
        ]);
    },
    undefined,
    (error) => console.error(error)
);

// Camera Position
camera.position.set(0, 5, 10);
controls.update();

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Render the scene
    controls.update();
    renderer.render(scene, camera);
}

animate();
