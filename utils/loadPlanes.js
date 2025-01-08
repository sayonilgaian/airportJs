import { flyPath2 } from "../data/flyPaths.js";
import flyPlane from "./flyPlane.js";
import loadGltf from "./loadGltf.js";

export default function loadPlanes({scene, filePath='model/AIRPLANE.glb'}) {
	loadGltf({
		scene,
		filePath,
		callback: (sc) => {
			flyPlane({
				airCraftObject: sc,
				delay: 2,
				offset: 0.1,
				speed: 150,
				rotateY: Math.PI,
			});
			const clone = sc.clone();
			scene.add(clone);
			flyPlane({
				airCraftObject: clone,
				flyPath: flyPath2,
				delay: 2,
				offset: 0.1,
				speed: 200,
				rotateY: Math.PI,
			});
			// const clone2 = sc.clone();
			// scene.add(clone2);
			// flyPlane({
			// 	airCraftObject: clone2,
			// 	flyPath: flyPath2,
			// 	delay: 2,
			// 	offset: 0.1,
			// 	speed: 50,
			// });
		},
	});
}
