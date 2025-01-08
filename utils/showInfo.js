import tippy from 'https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/+esm';
import * as THREE from 'three';

// Utility to convert 3D position to 2D screen coordinates
function toScreenPosition(obj, camera) {
	const vector = new THREE.Vector3();
	vector.setFromMatrixPosition(obj.matrixWorld); // Get object's world position
	vector.project(camera); // Convert to normalized device coordinates (NDC)

	const widthHalf = window.innerWidth / 2;
	const heightHalf = window.innerHeight / 2;

	return {
		x: vector.x * widthHalf + widthHalf,
		y: -vector.y * heightHalf + heightHalf,
	};
}

// Tooltip reference to manage cleanup
let activeTooltip = null;

function showInfo(object, camera) {
	console.log('object', object);
	// Clear any existing tooltip
	if (activeTooltip) {
		activeTooltip.destroy();
		activeTooltip = null;
	}

	// Create tooltip content
	const tooltipContent = `
		<strong>Info:</strong><br/>
		<em>${
			object?.parent?.userData?.basicData
				? `Flight number: ${object?.parent?.userData?.basicData?.FlightNumber} <br/>
				Airline Name: ${object?.parent?.userData?.basicData?.AirlineName} <br/>
				Gate: ${object?.parent?.userData?.basicData?.Gate}`
				: 'No description available'
		}</em>
	`;

	// Convert 3D object position to 2D screen position
	const { x, y } = toScreenPosition(object, camera);

	// Create a temporary element to attach the tooltip
	const tooltipElement = document.createElement('div');
	tooltipElement.style.position = 'absolute';
	tooltipElement.style.left = `${x}px`;
	tooltipElement.style.top = `${y}px`;
	tooltipElement.style.pointerEvents = 'none'; // Avoid blocking scene interactions
	document.body.appendChild(tooltipElement);

	// Initialize Tippy.js on the temporary element
	activeTooltip = tippy(tooltipElement, {
		content: tooltipContent,
		trigger: 'manual', // Manual trigger to control visibility
		placement: 'top', // Default placement
		animation: 'scale', // Smooth scaling animation
		theme: 'light-border',
		duration: [300, 200],
		allowHTML: true, // Allow HTML content to be rendered
	});

	activeTooltip.show();

	// Clean up tooltip on next interaction
	// window.addEventListener("mousemove", () => {
	// 	if (activeTooltip) {
	// 		activeTooltip.destroy();
	// 		activeTooltip = null;
	// 		tooltipElement.remove();
	// 	}
	// });
}

export default showInfo;
