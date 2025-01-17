import * as THREE from 'three';

export default function addLoader({ document }) {
	// Create the loading text element (HTML overlay)
	const loadingElement = document.createElement('div');
	loadingElement.id = 'loading-text';
	loadingElement.style.position = 'absolute';
	loadingElement.style.top = '50%';
	loadingElement.style.left = '50%';
	loadingElement.style.transform = 'translate(-50%, -50%)';
	loadingElement.style.color = '#ffffff';
	loadingElement.style.fontSize = '20px';
	loadingElement.style.fontFamily = 'Arial, sans-serif';
	loadingElement.style.textAlign = 'center';
	loadingElement.style.padding = '20px 40px';
	loadingElement.style.border = '2px solid #ffffff'; // White border
	loadingElement.style.background = 'rgba(0, 0, 0, 0.8)'; // Semi-transparent black background
	loadingElement.style.zIndex = '100';
	loadingElement.textContent = 'Loading... 0%';
	loadingElement.style.width = '350px';

	// Update the loading progress
	loadingElement.updateProgress = (progress) => {
		loadingElement.textContent = `Loading... ${(progress * 100).toFixed(2)}%`;
	};

	// Remove the loader when done
	loadingElement.removeLoader = () => {
		document.body.removeChild(loadingElement);
	};

	return loadingElement;
}
