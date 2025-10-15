// trip-planner.js - Trip planner functionality for SmartTrip application

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const planRouteBtn = document.getElementById('plan-route-btn');
    const routeSource = document.getElementById('route-source');
    const routeDestination = document.getElementById('route-destination');
    const routeResult = document.querySelector('.route-result');
    const plannedDistance = document.getElementById('planned-distance');
    const plannedTime = document.getElementById('planned-time');
    const plannedTraffic = document.getElementById('planned-traffic');
    const hotelSelect = document.getElementById('hotel-select');
    const nightsInput = document.getElementById('nights');
    const accommodationCost = document.getElementById('accommodation-cost');
    const hotelCostDiv = document.querySelector('.hotel-cost');
    const mealsPerDay = document.getElementById('meals-per-day');
    const foodBudget = document.getElementById('food-budget');
    const foodCost = document.getElementById('food-cost');
    const foodCostDiv = document.querySelector('.food-cost');
    const summaryTransport = document.getElementById('summary-transport');
    const summaryAccommodation = document.getElementById('summary-accommodation');
    const summaryFood = document.getElementById('summary-food');
    const summaryAttractions = document.getElementById('summary-attractions');
    const summaryTotal = document.getElementById('summary-total');
    const bookTripBtn = document.getElementById('book-trip-btn');

    // Booking Modal Elements
    const bookingModal = document.getElementById('booking-modal');
    const bookingCity = document.getElementById('booking-city');
    const bookingTransport = document.getElementById('booking-transport');
    const bookingAccommodation = document.getElementById('booking-accommodation');
    const bookingFood = document.getElementById('booking-food');
    const bookingAttractions = document.getElementById('booking-attractions');
    const bookingTotal = document.getElementById('booking-total');
    const closeBookingBtn = document.getElementById('close-booking-btn');
    const viewBookingBtn = document.getElementById('view-booking-btn');

    // Trip cost data
    let tripCost = {
        transport: 0,
        accommodation: 0,
        food: 0,
        attractions: 0
    };

    // Initialize trip planner
    function initTripPlanner() {
        // Event listeners
        planRouteBtn.addEventListener('click', planRoute);
        hotelSelect.addEventListener('change', updateAccommodationCost);
        nightsInput.addEventListener('input', updateAccommodationCost);
        mealsPerDay.addEventListener('change', updateFoodCost);
        foodBudget.addEventListener('input', updateFoodCost);
        bookTripBtn.addEventListener('click', bookTrip);

        // Close booking modal
        closeBookingBtn.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });

        // View booking details (placeholder)
        viewBookingBtn.addEventListener('click', () => {
            showNotification('Booking details feature coming soon!', 'success');
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    }

    // Plan route
    function planRoute() {
        const source = routeSource.value.trim();
        const destination = routeDestination.value.trim();

        if (!source || !destination) {
            showNotification('Please enter both source and destination.', 'error');
            return;
        }

        // Simulate route planning (in a real app, this would use a mapping API)
        const distance = Math.floor(Math.random() * 500) + 50; // Random distance between 50-550 km
        const time = Math.floor(distance / 40 * 60); // Estimate time based on 40 km/h average speed
        const trafficConditions = ['Light', 'Moderate', 'Heavy'];
        const traffic = trafficConditions[Math.floor(Math.random() * trafficConditions.length)];

        // Update UI
        plannedDistance.textContent = `Distance: ${distance} km`;
        plannedTime.textContent = `Time: ${Math.floor(time / 60)}h ${time % 60}m`;
        plannedTraffic.textContent = `Traffic: ${traffic}`;

        // Show route result
        routeResult.classList.remove('hidden');

        // Update transport cost (simplified calculation)
        tripCost.transport = Math.floor(distance * 5); // ₹5 per km
        updateTripSummary();
    }

    // Update accommodation cost
    function updateAccommodationCost() {
        const hotelData = hotelSelect.value;
        const nights = parseInt(nightsInput.value) || 0;

        if (hotelData && nights > 0) {
            const hotel = JSON.parse(hotelData);
            const cost = hotel.price * nights;

            accommodationCost.textContent = `₹${cost}`;
            hotelCostDiv.classList.remove('hidden');

            tripCost.accommodation = cost;
        } else {
            hotelCostDiv.classList.add('hidden');
            tripCost.accommodation = 0;
        }

        updateTripSummary();
    }

    // Update food cost
    function updateFoodCost() {
        const meals = parseInt(mealsPerDay.value) || 0;
        const budget = parseInt(foodBudget.value) || 0;
        const nights = parseInt(nightsInput.value) || 0;

        if (meals > 0 && budget > 0 && nights > 0) {
            // Assuming we're staying for nights+1 days
            const days = nights + 1;
            const cost = meals * budget * days;

            foodCost.textContent = `₹${cost}`;
            foodCostDiv.classList.remove('hidden');

            tripCost.food = cost;
        } else {
            foodCostDiv.classList.add('hidden');
            tripCost.food = 0;
        }

        updateTripSummary();
    }

    // Update trip summary
    function updateTripSummary() {
        // Estimate attractions cost (simplified)
        tripCost.attractions = Math.floor(Math.random() * 1000) + 500; // Random between 500-1500

        // Update UI
        summaryTransport.textContent = `₹${tripCost.transport}`;
        summaryAccommodation.textContent = `₹${tripCost.accommodation}`;
        summaryFood.textContent = `₹${tripCost.food}`;
        summaryAttractions.textContent = `₹${tripCost.attractions}`;

        const total = tripCost.transport + tripCost.accommodation + tripCost.food + tripCost.attractions;
        summaryTotal.textContent = `₹${total}`;
    }

    // Book trip
    function bookTrip() {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('smarttrip_user'));

        if (!user) {
            showNotification('Please login to book a trip.', 'error');
            document.getElementById('auth-modal').style.display = 'block';
            showAuthForm('login');
            return;
        }

        // Check if route is planned
        if (tripCost.transport === 0) {
            showNotification('Please plan a route first.', 'error');
            return;
        }

        // Prepare booking data
        const bookingData = {
            userId: user.id,
            city: document.getElementById('city-name').textContent,
            route: {
                source: routeSource.value,
                destination: routeDestination.value
            },
            accommodation: hotelSelect.value ? JSON.parse(hotelSelect.value) : null,
            nights: parseInt(nightsInput.value) || 0,
            meals: parseInt(mealsPerDay.value) || 0,
            foodBudget: parseInt(foodBudget.value) || 0,
            cost: tripCost
        };

        // Create booking
        api.createBooking(bookingData)
            .then(response => {
                if (response.success) {
                    // Show booking confirmation modal
                    showBookingConfirmation(bookingData);
                    showNotification('Trip booked successfully!', 'success');
                } else {
                    showNotification('Error booking trip. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('Error booking trip. Please try again.', 'error');
                console.error('Error booking trip:', error);
            });
    }

    // Show booking confirmation modal
    function showBookingConfirmation(bookingData) {
        // Update booking modal content
        bookingCity.textContent = bookingData.city;
        bookingTransport.textContent = `₹${bookingData.cost.transport}`;
        bookingAccommodation.textContent = `₹${bookingData.cost.accommodation}`;
        bookingFood.textContent = `₹${bookingData.cost.food}`;
        bookingAttractions.textContent = `₹${bookingData.cost.attractions}`;

        const total = bookingData.cost.transport +
                     bookingData.cost.accommodation +
                     bookingData.cost.food +
                     bookingData.cost.attractions;
        bookingTotal.textContent = `₹${total}`;

        // Show booking modal
        bookingModal.style.display = 'block';
    }

    // Initialize trip planner
    initTripPlanner();
});