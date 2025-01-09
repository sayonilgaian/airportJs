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
	// Create tooltip content
	const tooltipContent = `
	<style>
		.tippy-box {
			background-color: transparent !important;
		}
		.tippy-arrow {
			z-index: 1;
		}
		.tippy-arrow:before {
			color: rgb(2, 1, 46, 0.9);
		}
		.tooltip {
			background-color: rgb(2, 1, 46, 0.9); 
			color: white;
			font-family: Arial, sans-serif;
			font-size: 14px;
			padding: 15px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 20px;
			border: 1px solid white;
		}
		.tippy-content {
			padding: 0 !important;
		}
	</style>
	<div class="tooltip">
		<div>
			<strong>Info:</strong><br/>
			${
				object?.parent?.userData?.basicData
					? `Flight number: ${
							object?.parent?.userData?.detailedData?.FlightNumber
					  } <br/>
					Airline Name: ${object?.parent?.userData?.detailedData?.AirlineName} <br/>
					Gate: ${object?.parent?.userData?.detailedData?.Gate}
					${
						showDetails &&
						`
					Destination:${object?.parent?.userData?.detailedData?.Destination} <br/>
					Scheduled Time:${object?.parent?.userData?.detailedData?.ScheduledTime} <br/>
					Actual Time:${object?.parent?.userData?.detailedData?.ActualTime} <br/>
					Passenger Count:${object?.parent?.userData?.detailedData?.PassengerCount} <br/>
					Status:${object?.parent?.userData?.detailedData?.Status} <br/>
					`
					}
					`
					: 'No description available'
			}
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

	activeTooltip.show();
}

export default showInfo;
