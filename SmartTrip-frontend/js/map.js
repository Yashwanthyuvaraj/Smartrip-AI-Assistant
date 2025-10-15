// map.js - Map functionality for SmartTrip application

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const getRouteBtn = document.getElementById('get-route-btn');
    const routeStart = document.getElementById('route-start');
    const routeEnd = document.getElementById('route-end');
    const routeInfo = document.querySelector('.route-info');
    const routeDistance = document.getElementById('route-distance');
    const routeTime = document.getElementById('route-time');
    const routeTraffic = document.getElementById('route-traffic');
    const mapContainer = document.getElementById('map-container');
    const mapImage = document.getElementById('map-image');
    const routeCanvas = document.getElementById('route-canvas');

    // Event listener for Get Route button
    if (getRouteBtn) {
        getRouteBtn.addEventListener('click', function() {
            const source = routeStart.value.trim();
            const destination = routeEnd.value.trim();

            if (!source || !destination) {
                showNotification('Please enter both source and destination.', 'error');
                return;
            }

            // Draw the route on the map
            drawRoute(source, destination);

            // Simulate route details
            const distance = Math.floor(Math.random() * 100) + 50; // Random distance between 50-150 km
            const time = Math.floor(distance / 40 * 60); // Estimate time based on 40 km/h average speed
            const trafficConditions = ['Light', 'Moderate', 'Heavy'];
            const traffic = trafficConditions[Math.floor(Math.random() * trafficConditions.length)];

            // Update UI
            routeDistance.textContent = `Distance: ${distance} km`;
            routeTime.textContent = `Time: ${Math.floor(time / 60)}h ${time % 60}m`;
            routeTraffic.textContent = `Traffic: ${traffic}`;

            // Show route info
            if (routeInfo) {
                routeInfo.classList.remove('hidden');
            }
        });
    }

    // Function to draw the route on the map
    function drawRoute(source, destination) {
        if (!mapImage || !routeCanvas) {
            console.error('Map image or canvas not found');
            return;
        }

        // Set canvas size to match the image
        routeCanvas.width = mapImage.clientWidth;
        routeCanvas.height = mapImage.clientHeight;

        const ctx = routeCanvas.getContext('2d');

        // Clear any previous route
        ctx.clearRect(0, 0, routeCanvas.width, routeCanvas.height);

        // Define the positions (as percentages of the image dimensions) for the cities
        const positions = {
            'erode': { x: 0.3, y: 0.5 },
            'karur': { x: 0.7, y: 0.5 },
            'coimbatore': { x: 0.25, y: 0.6 },
            'salem': { x: 0.5, y: 0.4 },
            'trichy': { x: 0.6, y: 0.6 },
            'madurai': { x: 0.65, y: 0.8 }
        };

        // Get the positions for the source and destination
        const sourcePos = positions[source.toLowerCase()];
        const destPos = positions[destination.toLowerCase()];

        if (!sourcePos || !destPos) {
            showNotification('City not found in the map. Try Erode, Karur, Coimbatore, Salem, Trichy, or Madurai.', 'error');
            return;
        }

        // Calculate actual pixel positions
        const startX = sourcePos.x * routeCanvas.width;
        const startY = sourcePos.y * routeCanvas.height;
        const endX = destPos.x * routeCanvas.width;
        const endY = destPos.y * routeCanvas.height;

        // Draw the route line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#FF5722';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw markers for the cities
        // Source marker
        ctx.beginPath();
        ctx.arc(startX, startY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#1565C0';
        ctx.fill();

        // Destination marker
        ctx.beginPath();
        ctx.arc(endX, endY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();

        // Add city labels
        ctx.font = '14px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';

        // Source label
        ctx.fillText(source.charAt(0).toUpperCase() + source.slice(1), startX, startY - 15);

        // Destination label
        ctx.fillText(destination.charAt(0).toUpperCase() + destination.slice(1), endX, endY - 15);
    }

    // Handle window resize to redraw the route
    window.addEventListener('resize', function() {
        if (routeStart.value && routeEnd.value) {
            drawRoute(routeStart.value, routeEnd.value);
        }
    });
});