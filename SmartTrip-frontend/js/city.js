// city.js - City-related functionality for SmartTrip application

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const citySearch = document.getElementById('city-search');
    const regionFilter = document.getElementById('region-filter');
    const categoryFilter = document.getElementById('category-filter');
    const citiesGrid = document.querySelector('.cities-grid');
    const cityDashboard = document.getElementById('city-dashboard');
    const citiesSection = document.getElementById('cities');
    const backToCitiesBtn = document.getElementById('back-to-cities');
    const cityTabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const attractionsFilter = document.querySelectorAll('.filter-btn');
    const attractionsGrid = document.querySelector('.attractions-grid');

    // Current city data
    let currentCity = null;

    // Initialize cities page
    function initCitiesPage() {
        loadCities();

        // Event listeners
        citySearch.addEventListener('input', debounce(filterCities, 300));
        regionFilter.addEventListener('change', filterCities);
        categoryFilter.addEventListener('change', filterCities);
        backToCitiesBtn.addEventListener('click', showCitiesList);

        // Tab switching
        cityTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // Attractions filter
        attractionsFilter.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterAttractions(filter);

                // Update active button
                attractionsFilter.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Load and display cities
    function loadCities() {
        api.getCities()
            .then(cities => {
                displayCities(cities);
            })
            .catch(error => {
                showNotification('Error loading cities. Please try again.', 'error');
                console.error('Error loading cities:', error);
            });
    }

    // Display cities in grid
    function displayCities(cities) {
        citiesGrid.innerHTML = '';

        if (cities.length === 0) {
            citiesGrid.innerHTML = '<p class="no-results">No cities found. Try different filters.</p>';
            return;
        }

        cities.forEach(city => {
            const cityCard = document.createElement('div');
            cityCard.className = 'city-card';
            cityCard.innerHTML = `
                <div class="city-card-image">
                    <img src="${city.image}" alt="${city.name}">
                </div>
                <div class="city-card-content">
                    <h3>${city.name}</h3>
                    <p>${city.state}</p>
                    <div class="city-card-meta">
                        <div class="city-card-rating">
                            <i class="fas fa-star"></i>
                            <span>${city.rating}</span>
                        </div>
                        <span class="city-card-category">${city.category}</span>
                    </div>
                </div>
            `;

            cityCard.addEventListener('click', () => showCityDashboard(city));
            citiesGrid.appendChild(cityCard);
        });
    }

    // Filter cities based on search and filters
    function filterCities() {
        const query = citySearch.value.trim();
        const region = regionFilter.value;
        const category = categoryFilter.value;

        api.searchCities({ query, region, category })
            .then(cities => {
                displayCities(cities);
            })
            .catch(error => {
                showNotification('Error filtering cities. Please try again.', 'error');
                console.error('Error filtering cities:', error);
            });
    }

    // Show city dashboard
    function showCityDashboard(city) {
        currentCity = city;

        // Update city dashboard content
        document.getElementById('city-image').src = city.image;
        document.getElementById('city-image').alt = city.name;
        document.getElementById('city-name').textContent = city.name;
        document.getElementById('city-location').textContent = `${city.state}, India`;
        document.getElementById('city-temp').textContent = `${city.weather.temperature}°C`;
        document.getElementById('city-name-overview').textContent = city.name;
        document.getElementById('city-description').textContent = city.description;
        document.getElementById('city-languages').textContent = city.languages.join(', ');

        // Load attractions
        loadCityAttractions(city.id);

        // Load hotels
        loadCityHotels(city.id);

        // Load food
        loadCityFood(city.id);

        // Load transport options
        loadTransportOptions(city);

        // Load safety tips
        loadSafetyTips(city);

        // Reset to overview tab
        switchTab('overview');

        // Show city dashboard, hide cities list
        citiesSection.classList.add('hidden');
        cityDashboard.classList.remove('hidden');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Show cities list
    function showCitiesList() {
        citiesSection.classList.remove('hidden');
        cityDashboard.classList.add('hidden');
    }

    // Switch tab in city dashboard
    function switchTab(tabId) {
        // Update active tab button
        cityTabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show active tab pane
        tabPanes.forEach(pane => {
            if (pane.id === tabId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    // Load city attractions
    function loadCityAttractions(cityId) {
        api.getCityById(cityId)
            .then(city => {
                const attractionsGrid = document.querySelector('#attractions .attractions-grid');
                attractionsGrid.innerHTML = '';

                city.attractions.forEach(attraction => {
                    const attractionCard = document.createElement('div');
                    attractionCard.className = 'attraction-card';
                    attractionCard.innerHTML = `
                        <div class="attraction-image">
                            <img src="${attraction.image}" alt="${attraction.name}">
                        </div>
                        <div class="attraction-content">
                            <h3>${attraction.name}</h3>
                            <p>${attraction.description}</p>
                            <div class="attraction-meta">
                                <div class="attraction-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${attraction.rating}</span>
                                </div>
                                <span class="attraction-category">Entry: ₹${attraction.entryFee}</span>
                            </div>
                        </div>
                    `;
                    attractionsGrid.appendChild(attractionCard);
                });
            })
            .catch(error => {
                showNotification('Error loading attractions. Please try again.', 'error');
                console.error('Error loading attractions:', error);
            });
    }

    // Load city hotels
    function loadCityHotels(cityId) {
        api.getHotelsByCity(cityId)
            .then(hotels => {
                const hotelsGrid = document.querySelector('#hotels .hotels-grid');
                hotelsGrid.innerHTML = '';

                // Update hotel select in trip planner
                const hotelSelect = document.getElementById('hotel-select');
                hotelSelect.innerHTML = '<option value="">Select a hotel</option>';

                hotels.forEach(hotel => {
                    // Add to hotels grid
                    const hotelCard = document.createElement('div');
                    hotelCard.className = 'hotel-card';
                    hotelCard.innerHTML = `
                        <div class="hotel-image">
                            <img src="${hotel.image}" alt="${hotel.name}">
                        </div>
                        <div class="hotel-content">
                            <h3>${hotel.name}</h3>
                            <p>${hotel.description}</p>
                            <div class="hotel-meta">
                                <div class="hotel-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${hotel.rating}</span>
                                </div>
                                <span class="hotel-price">₹${hotel.price}/night</span>
                            </div>
                        </div>
                    `;
                    hotelsGrid.appendChild(hotelCard);

                    // Add to hotel select
                    const option = document.createElement('option');
                    option.value = JSON.stringify(hotel);
                    option.textContent = `${hotel.name} - ₹${hotel.price}/night`;
                    hotelSelect.appendChild(option);
                });
            })
            .catch(error => {
                showNotification('Error loading hotels. Please try again.', 'error');
                console.error('Error loading hotels:', error);
            });
    }

    // Load city food
    function loadCityFood(cityId) {
        api.getFoodsByCity(cityId)
            .then(foods => {
                const foodGrid = document.querySelector('#food .food-grid');
                foodGrid.innerHTML = '';

                foods.forEach(food => {
                    const foodCard = document.createElement('div');
                    foodCard.className = 'food-card';
                    foodCard.innerHTML = `
                        <div class="food-image">
                            <img src="${food.image}" alt="${food.name}">
                        </div>
                        <div class="food-content">
                            <h3>${food.name}</h3>
                            <p>${food.description}</p>
                            <div class="food-meta">
                                <div class="food-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${food.rating}</span>
                                </div>
                                <span class="food-type">${food.type}</span>
                            </div>
                        </div>
                    `;
                    foodGrid.appendChild(foodCard);
                });
            })
            .catch(error => {
                showNotification('Error loading food options. Please try again.', 'error');
                console.error('Error loading food options:', error);
            });
    }

    // Load transport options
    function loadTransportOptions(city) {
        const transportOptions = document.querySelector('#transport .transport-options');
        transportOptions.innerHTML = '';

        city.transport.forEach(option => {
            const transportOption = document.createElement('div');
            transportOption.className = 'transport-option';
            transportOption.innerHTML = `
                <i class="fas fa-${option.icon}"></i>
                <div class="transport-option-content">
                    <h4>${option.type}</h4>
                    <p>${option.description}</p>
                    <p><strong>Cost:</strong> ${option.cost}</p>
                </div>
            `;
            transportOptions.appendChild(transportOption);
        });
    }

    // Load safety tips
    function loadSafetyTips(city) {
        const safetyTips = document.querySelector('#safety .safety-tips');
        safetyTips.innerHTML = '';

        city.safetyTips.forEach(tip => {
            const safetyTip = document.createElement('div');
            safetyTip.className = 'safety-tip';
            safetyTip.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <div class="safety-tip-content">
                    <h4>Safety Tip</h4>
                    <p>${tip}</p>
                </div>
            `;
            safetyTips.appendChild(safetyTip);
        });
    }

    // Filter attractions in city dashboard
    function filterAttractions(filter) {
        if (!currentCity) return;

        const attractionsGrid = document.querySelector('#attractions .attractions-grid');
        attractionsGrid.innerHTML = '';

        let filteredAttractions = currentCity.attractions;

        if (filter !== 'all') {
            filteredAttractions = currentCity.attractions.filter(
                attraction => attraction.category === filter
            );
        }

        filteredAttractions.forEach(attraction => {
            const attractionCard = document.createElement('div');
            attractionCard.className = 'attraction-card';
            attractionCard.innerHTML = `
                <div class="attraction-image">
                    <img src="${attraction.image}" alt="${attraction.name}">
                </div>
                <div class="attraction-content">
                    <h3>${attraction.name}</h3>
                    <p>${attraction.description}</p>
                    <div class="attraction-meta">
                        <div class="attraction-rating">
                            <i class="fas fa-star"></i>
                            <span>${attraction.rating}</span>
                        </div>
                        <span class="attraction-category">Entry: ₹${attraction.entryFee}</span>
                    </div>
                </div>
            `;
            attractionsGrid.appendChild(attractionCard);
        });
    }

    // Initialize cities page
    initCitiesPage();
});