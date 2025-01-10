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

function showInfo(object, camera, showDetails = false) {
	// Clear any existing tooltip
	if (activeTooltip) {
		activeTooltip.destroy();
		activeTooltip = null;
	}

	// Create separate tooltips for basic data and detailed data
	let basicDataString = '';
	let detailedDataString = '';
	if (object?.parent?.userData?.basicData) {
		basicDataString = Object.keys(object?.parent?.userData?.basicData)
			.map(
				(key) =>
					`${key.split('_').join(' ')}: ${
						object?.parent?.userData?.basicData[key]
					}`
			)
			.join('<br/>');
	}
	if (object?.parent?.userData?.detailedData) {
		detailedDataString = Object.keys(object?.parent?.userData?.detailedData)
			.map(
				(key) =>
					`${key.split('_').join(' ')}: ${
						object?.parent?.userData?.detailedData[key]
					}`
			)
			.join('<br/>');
	}

	// Create tooltip content
	const tooltipContent = `
	<style>
		.tippy-box {
			background-color: transparent !important;
			bottom: 40px;
		}
		.tippy-arrow {
			z-index: 1;
		}
		.tippy-arrow:before {
			color: #ffffffe6;
			bottom: -39px !important;
			left: 5px !important;
			border-width: 40px 2px 0 !important;
		}
		.tooltip {
			background-color: rgb(2, 1, 46, 0.9); 
			color: white;
			font-family: Arial, sans-serif;
			font-size: 14px;
			padding: 15px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 30px;
			border: 1px solid white;
		}
		.tippy-content {
			padding: 0 !important;
		}
	</style>
	<div class="tooltip">
		<div>
			<strong>Info:</strong><br/>
			${showDetails ? detailedDataString : basicDataString}
		</div>
	</div>
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

	// Initialize Tippy.js on the temporary element with a slight delay
	activeTooltip = tippy(tooltipElement, {
		content: tooltipContent,
		trigger: 'manual', // Manual trigger to control visibility
		placement: 'top', // Default placement
		animation: 'scale', // Smooth scaling animation
		theme: 'light-border',
		duration: [300, 200],
		allowHTML: true, // Allow HTML content to be rendered
	});

	// show tooltip only when baisc and detailed data are available
	object?.parent?.userData?.basicData && activeTooltip.show();
}

export default showInfo;
