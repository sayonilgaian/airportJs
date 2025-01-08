let lastHighlighted = null; // To store the last highlighted object and its original material

function highlightObject(object) {
	// If there is a previously highlighted object, revert it to its original material
	if (lastHighlighted) {
		lastHighlighted.object.material = lastHighlighted.originalMaterial;
		lastHighlighted = null; // Reset last highlighted
	}

	// Highlight the new object
	if (object.material) {
		// Store the original material
		const originalMaterial = object.material.clone();
		lastHighlighted = { object, originalMaterial };

		// Set the new material with emissive highlight
		object.material = object.material.clone();
		object.material.emissive = new THREE.Color(0x4444ff); // Highlight color
	}
}

export default highlightObject;
