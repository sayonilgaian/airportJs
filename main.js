import createScene from './utils/createScene.js';
import loadGltf from './utils/loadGltf.js';

const { scene, camera, controls , renderer} = createScene();

const airportModel = loadGltf('./models/airport1/scene.gltf', scene);
// const airportModel = loadGltf('./models/airport2/scene.gltf')
// const airportModel = loadGltf('./models/airport3/scene.gltf')

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
