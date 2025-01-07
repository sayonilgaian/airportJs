export default function removePlanes(airCraftModels) {
	airCraftModels.forEach((airplane) => {
		airplane.parent.remove(airplane); // Remove from parent
		if (airplane.isMesh) {
			airplane.geometry.dispose();
			if (Array.isArray(airplane.material)) {
				airplane.material.forEach((mat) => mat.dispose());
			} else {
				airplane.material.dispose();
			}
		}
	});
}
