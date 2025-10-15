// api.js - API functions for the SmartTrip application

// Sample data for cities
const cities = [
    {
        id: 1,
        name: "Delhi",
        state: "National Capital Territory",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "India's capital territory, a massive metropolitan area with rich history and culture.",
        rating: 4.5,
        category: "heritage",
        region: "north",
        weather: {
            temperature: 32,
            condition: "Sunny"
        },
        languages: ["Hindi", "English", "Punjabi"],
        attractions: [
            {
                id: 101,
                name: "Red Fort",
                image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Historic fort in Old Delhi, a symbol of India's rich history.",
                rating: 4.7,
                category: "historical",
                entryFee: 50
            },
            {
                id: 102,
                name: "India Gate",
                image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "War memorial located astride the Rajpath, on the eastern edge of New Delhi.",
                rating: 4.6,
                category: "historical",
                entryFee: 0
            }
        ],
        hotels: [
            {
                id: 1001,
                name: "The Imperial Hotel",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Luxury hotel with colonial architecture in the heart of Delhi.",
                rating: 4.8,
                price: 12000
            },
            {
                id: 1002,
                name: "Taj Palace Hotel",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Elegant hotel with modern amenities and excellent service.",
                rating: 4.7,
                price: 10000
            }
        ],
        food: [
            {
                id: 2001,
                name: "Parathe Wali Gali",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Famous street for delicious parathas in Old Delhi.",
                rating: 4.5,
                type: "Street Food",
                avgPrice: 100
            },
            {
                id: 2002,
                name: "Indian Accent",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Fine dining restaurant serving modern Indian cuisine.",
                rating: 4.8,
                type: "Fine Dining",
                avgPrice: 3000
            }
        ],
        transport: [
            {
                type: "Metro",
                icon: "subway",
                description: "Extensive metro network connecting all parts of the city",
                cost: "₹10-60"
            },
            {
                type: "Bus",
                icon: "bus",
                description: "DTC buses covering all routes",
                cost: "₹5-25"
            },
            {
                type: "Auto Rickshaw",
                icon: "taxi",
                description: "Three-wheeler vehicles for short distances",
                cost: "₹25-100"
            }
        ],
        safetyTips: [
            "Avoid isolated areas at night",
            "Keep your valuables secure in crowded places",
            "Use licensed taxis or ride-sharing apps",
            "Drink bottled water only"
        ]
    },
    {
        id: 2,
        name: "Mumbai",
        state: "Maharashtra",
        image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "Financial capital of India, known for Bollywood, bustling markets, and coastal charm.",
        rating: 4.6,
        category: "modern",
        region: "west",
        weather: {
            temperature: 30,
            condition: "Partly Cloudy"
        },
        languages: ["Marathi", "Hindi", "English"],
        attractions: [
            {
                id: 201,
                name: "Gateway of India",
                image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Iconic monument overlooking the Arabian Sea.",
                rating: 4.7,
                category: "historical",
                entryFee: 0
            },
            {
                id: 202,
                name: "Marine Drive",
                image: "https://images.unsplash.com/photo-1624535968114-3c9bfcf5d5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "3.6-kilometer-long boulevard in South Mumbai.",
                rating: 4.5,
                category: "modern",
                entryFee: 0
            }
        ],
        hotels: [
            {
                id: 2001,
                name: "Taj Mahal Palace",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Iconic luxury hotel overlooking the Arabian Sea.",
                rating: 4.8,
                price: 15000
            },
            {
                id: 2002,
                name: "The Oberoi Mumbai",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Luxury hotel with stunning views of the city skyline.",
                rating: 4.7,
                price: 13000
            }
        ],
        food: [
            {
                id: 2101,
                name: "Street Food at Chowpatty",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Famous for pav bhaji, bhel puri and other Mumbai street food.",
                rating: 4.6,
                type: "Street Food",
                avgPrice: 150
            },
            {
                id: 2102,
                name: "Mahesh Lunch Home",
                image: "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Legendary seafood restaurant serving authentic Mangalorean cuisine.",
                rating: 4.7,
                type: "Seafood",
                avgPrice: 800
            }
        ],
        transport: [
            {
                type: "Local Train",
                icon: "train",
                description: "Lifeline of Mumbai, connecting all suburbs",
                cost: "₹5-20"
            },
            {
                type: "Bus",
                icon: "bus",
                description: "BEST buses covering all routes",
                cost: "₹5-50"
            },
            {
                type: "Taxi",
                icon: "taxi",
                description: "Black and yellow taxis and app-based cabs",
                cost: "₹50-300"
            }
        ],
        safetyTips: [
            "Be cautious in crowded local trains",
            "Avoid displaying expensive items",
            "Use only licensed taxis",
            "Stay alert in tourist areas"
        ]
    },
    {
        id: 3,
        name: "Jaipur",
        state: "Rajasthan",
        image: "https://images.unsplash.com/photo-1477587458883-4717ed3edc3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "The Pink City, known for its majestic forts, palaces, and vibrant culture.",
        rating: 4.7,
        category: "heritage",
        region: "west",
        weather: {
            temperature: 35,
            condition: "Sunny"
        },
        languages: ["Hindi", "Rajasthani", "English"],
        attractions: [
            {
                id: 301,
                name: "Amber Fort",
                image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Magnificent fort located on a hilltop overlooking Maota Lake.",
                rating: 4.8,
                category: "historical",
                entryFee: 100
            },
            {
                id: 302,
                name: "Hawa Mahal",
                image: "https://images.unsplash.com/photo-1593692674566-2d2b4e3b4c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Palace made of red and pink sandstone with 953 windows.",
                rating: 4.6,
                category: "historical",
                entryFee: 50
            }
        ],
        hotels: [
            {
                id: 3001,
                name: "Rambagh Palace",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Former residence of the Maharaja of Jaipur, now a luxury hotel.",
                rating: 4.9,
                price: 20000
            },
            {
                id: 3002,
                name: "Samode Haveli",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Heritage hotel with traditional Rajasthani architecture.",
                rating: 4.7,
                price: 8000
            }
        ],
        food: [
            {
                id: 3101,
                name: "Laxmi Mishthan Bhandar",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Famous for ghewar and other traditional Rajasthani sweets.",
                rating: 4.5,
                type: "Sweets",
                avgPrice: 100
            },
            {
                id: 3102,
                name: "Chokhi Dhani",
                image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Village-themed restaurant serving authentic Rajasthani cuisine.",
                rating: 4.6,
                type: "Thali",
                avgPrice: 600
            }
        ],
        transport: [
            {
                type: "Auto Rickshaw",
                icon: "taxi",
                description: "Most common mode of transport",
                cost: "₹20-150"
            },
            {
                type: "Bus",
                icon: "bus",
                description: "RSRTC buses connecting all parts of the city",
                cost: "₹5-30"
            },
            {
                type: "Taxi",
                icon: "taxi",
                description: "App-based cabs and traditional taxis",
                cost: "₹50-300"
            }
        ],
        safetyTips: [
            "Beware of touts at tourist sites",
            "Negotiate auto rickshaw fares beforehand",
            "Dress modestly when visiting religious sites",
            "Stay hydrated in the hot climate"
        ]
    },
    {
        id: 4,
        name: "Goa",
        state: "Goa",
        image: "https://images.unsplash.com/photo-1512343877844-d8dec8d2d4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "Beach paradise known for Portuguese architecture, seafood, and vibrant nightlife.",
        rating: 4.8,
        category: "nature",
        region: "west",
        weather: {
            temperature: 28,
            condition: "Sunny"
        },
        languages: ["Konkani", "Marathi", "Hindi", "English"],
        attractions: [
            {
                id: 401,
                name: "Baga Beach",
                image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Popular beach in North Goa known for water sports and nightlife.",
                rating: 4.5,
                category: "natural",
                entryFee: 0
            },
            {
                id: 402,
                name: "Basilica of Bom Jesus",
                image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "UNESCO World Heritage Site housing the remains of St. Francis Xavier.",
                rating: 4.7,
                category: "religious",
                entryFee: 0
            }
        ],
        hotels: [
            {
                id: 4001,
                name: "Taj Fort Aguada Resort & Spa",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Luxury resort built on the ramparts of a 16th-century Portuguese fort.",
                rating: 4.8,
                price: 18000
            },
            {
                id: 4002,
                name: "W Goa",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Stylish beachfront resort with multiple pools and vibrant nightlife.",
                rating: 4.7,
                price: 12000
            }
        ],
        food: [
            {
                id: 4101,
                name: "Fish Curry Rice",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Goa's signature dish with coconut-based curry and fresh fish.",
                rating: 4.7,
                type: "Seafood",
                avgPrice: 300
            },
            {
                id: 4102,
                name: "Bebinca",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Traditional Goan dessert with multiple layers of egg and coconut milk.",
                rating: 4.6,
                type: "Dessert",
                avgPrice: 150
            }
        ],
        transport: [
            {
                type: "Scooter Rental",
                icon: "motorcycle",
                description: "Most popular way to explore Goa",
                cost: "₹300-600/day"
            },
            {
                type: "Taxi",
                icon: "taxi",
                description: "App-based cabs and local taxis",
                cost: "₹100-500"
            },
            {
                type: "Bus",
                icon: "bus",
                description: "Kadamba buses connecting major towns",
                cost: "₹10-50"
            }
        ],
        safetyTips: [
            "Be cautious when swimming in the sea",
            "Avoid isolated beaches at night",
            "Keep your valuables safe on the beach",
            "Respect local customs and traditions"
        ]
    },
    {
        id: 5,
        name: "Varanasi",
        state: "Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1593692634427-cb4a8c0a8d7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "Spiritual capital of India, known for its ghats along the Ganges River.",
        rating: 4.6,
        category: "spiritual",
        region: "north",
        weather: {
            temperature: 34,
            condition: "Sunny"
        },
        languages: ["Hindi", "Bhojpuri", "English"],
        attractions: [
            {
                id: 501,
                name: "Dashashwamedh Ghat",
                image: "https://images.unsplash.com/photo-1593692634427-cb4a8c0a8d7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Main ghat in Varanasi, known for its evening Ganga Aarti.",
                rating: 4.7,
                category: "spiritual",
                entryFee: 0
            },
            {
                id: 502,
                name: "Kashi Vishwanath Temple",
                image: "https://images.unsplash.com/photo-1593692634427-cb4a8c0a8d7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
                rating: 4.8,
                category: "religious",
                entryFee: 0
            }
        ],
        hotels: [
            {
                id: 5001,
                name: "Taj Ganges Hotel",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Luxury hotel with stunning views of the Ganges River.",
                rating: 4.7,
                price: 9000
            },
            {
                id: 5002,
                name: "Brijrama Palace",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Heritage hotel housed in a 200-year-old palace.",
                rating: 4.8,
                price: 12000
            }
        ],
        food: [
            {
                id: 5101,
                name: "Kachori Sabzi",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Popular breakfast dish in Varanasi, spicy fried lentil balls with potato curry.",
                rating: 4.5,
                type: "Street Food",
                avgPrice: 50
            },
            {
                id: 5102,
                name: "Banarasi Paan",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Betel leaf preparation with various fillings, a specialty of Varanasi.",
                rating: 4.6,
                type: "Specialty",
                avgPrice: 30
            }
        ],
        transport: [
            {
                type: "Auto Rickshaw",
                icon: "taxi",
                description: "Most common mode of transport",
                cost: "₹20-100"
            },
            {
                type: "Cycle Rickshaw",
                icon: "bicycle",
                description: "Eco-friendly option for short distances",
                cost: "₹10-50"
            },
            {
                type: "Boat",
                icon: "ship",
                description: "Boat rides on the Ganges River",
                cost: "₹100-500"
            }
        ],
        safetyTips: [
            "Respect religious sentiments and rituals",
            "Be cautious of touts near temples",
            "Avoid taking photographs during cremation ceremonies",
            "Dress modestly when visiting religious sites"
        ]
    },
    {
        id: 6,
        name: "Kerala Backwaters",
        state: "Kerala",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "Network of interconnected canals, rivers, lakes and inlets, a unique ecosystem.",
        rating: 4.9,
        category: "nature",
        region: "south",
        weather: {
            temperature: 29,
            condition: "Rainy"
        },
        languages: ["Malayalam", "English", "Hindi"],
        attractions: [
            {
                id: 601,
                name: "Alleppey Backwaters",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Famous for houseboat cruises and serene landscapes.",
                rating: 4.8,
                category: "natural",
                entryFee: 0
            },
            {
                id: 602,
                name: "Kumarakom Bird Sanctuary",
                image: "https://images.unsplash.com/photo-1593692634427-cb4a8c0a8d7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Paradise for bird watchers with migratory birds.",
                rating: 4.6,
                category: "natural",
                entryFee: 100
            }
        ],
        hotels: [
            {
                id: 6001,
                name: "Kumarakom Lake Resort",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Luxury resort on the banks of Vembanad Lake with traditional Kerala architecture.",
                rating: 4.8,
                price: 15000
            },
            {
                id: 6002,
                name: "Coconut Lagoon",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Heritage resort accessible only by boat, offering an authentic backwater experience.",
                rating: 4.7,
                price: 13000
            }
        ],
        food: [
            {
                id: 6101,
                name: "Kerala Sadya",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Traditional feast served on a banana leaf with a variety of vegetarian dishes.",
                rating: 4.9,
                type: "Thali",
                avgPrice: 400
            },
            {
                id: 6102,
                name: "Karimeen Pollichathu",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Pearl spot fish marinated in spices and wrapped in banana leaf, then grilled.",
                rating: 4.8,
                type: "Seafood",
                avgPrice: 500
            }
        ],
        transport: [
            {
                type: "Houseboat",
                icon: "ship",
                description: "Traditional way to experience backwaters",
                cost: "₹5000-15000/day"
            },
            {
                type: "Ferry",
                icon: "ship",
                description: "Public ferries connecting islands",
                cost: "₹10-50"
            },
            {
                type: "Auto Rickshaw",
                icon: "taxi",
                description: "For local transportation",
                cost: "₹20-100"
            }
        ],
        safetyTips: [
            "Choose registered houseboat operators",
            "Carry insect repellent",
            "Be cautious during monsoon season",
            "Respect local customs and traditions"
        ]
    }
];

// API functions
const api = {
    // City API
    getCities: () => {
        return Promise.resolve(cities);
    },

    getCityById: (id) => {
        const city = cities.find(city => city.id === parseInt(id));
        return Promise.resolve(city);
    },

    searchCities: (params) => {
        const { query, region, category } = params;

        const filteredCities = cities.filter(city => {
            const matchesSearch = !query ||
                city.name.toLowerCase().includes(query.toLowerCase()) ||
                city.state.toLowerCase().includes(query.toLowerCase()) ||
                city.description.toLowerCase().includes(query.toLowerCase());
            const matchesRegion = !region || city.region === region;
            const matchesCategory = !category || city.category === category;

            return matchesSearch && matchesRegion && matchesCategory;
        });

        return Promise.resolve(filteredCities);
    },

    // Hotel API
    getHotelsByCity: (cityId) => {
        const city = cities.find(city => city.id === parseInt(cityId));
        return Promise.resolve(city ? city.hotels : []);
    },

    // Food API
    getFoodsByCity: (cityId) => {
        const city = cities.find(city => city.id === parseInt(cityId));
        return Promise.resolve(city ? city.food : []);
    },

    // Booking API
    createBooking: (bookingData) => {
        // In a real app, this would send a request to the server
        // For demo purposes, we'll simulate a successful booking
        return Promise.resolve({
            success: true,
            message: 'Booking created successfully',
            booking: {
                ...bookingData,
                id: Date.now(),
                status: 'confirmed',
                createdAt: new Date().toISOString()
            }
        });
    },

    // Auth API
    login: (credentials) => {
        // In a real app, this would send a request to the server
        // For demo purposes, we'll simulate a successful login
        const { email, password } = credentials;

        if (email && password) {
            // Check if user exists in localStorage (simulating a database)
            const users = JSON.parse(localStorage.getItem('smarttrip_users') || '[]');
            const existingUser = users.find(user => user.email === email);

            // If user exists, use their stored name
            // If not, extract from email as fallback
            const name = existingUser ? existingUser.name : email.split('@')[0];

            const user = {
                id: existingUser ? existingUser.id : Date.now(),
                name: name,
                email: email,
                displayName: name
            };

            localStorage.setItem('smarttrip_user', JSON.stringify(user));

            return Promise.resolve({
                success: true,
                message: 'Login successful',
                user
            });
        } else {
            return Promise.reject(new Error('Invalid credentials'));
        }
    },

    signup: (userData) => {
        // In a real app, this would send a request to the server
        // For demo purposes, we'll simulate a successful signup
        const { name, email, password } = userData;

        if (name && email && password) {
            // Store user in "database" (localStorage)
            const users = JSON.parse(localStorage.getItem('smarttrip_users') || '[]');

            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return Promise.reject(new Error('User with this email already exists'));
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password // In a real app, this would be hashed
            };

            // Add to "database"
            users.push(newUser);
            localStorage.setItem('smarttrip_users', JSON.stringify(users));

            // Create user object for response (without password)
            const user = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                displayName: newUser.name
            };

            localStorage.setItem('smarttrip_user', JSON.stringify(user));

            return Promise.resolve({
                success: true,
                message: 'Signup successful',
                user
            });
        } else {
            return Promise.reject(new Error('Invalid user data'));
        }
    },

    googleLogin: (tokenId) => {
        // In a real app, this would send a request to the server
        // For demo purposes, we'll simulate a successful Google login
        // The tokenId would be verified on the server

        // For demo, we'll create a user with Google data
        const user = {
            id: Date.now(),
            name: 'Google User',
            email: 'user@gmail.com',
            displayName: 'Google User',
            googleId: tokenId
        };

        localStorage.setItem('smarttrip_user', JSON.stringify(user));

        return Promise.resolve({
            success: true,
            message: 'Google login successful',
            user
        });
    }
};

// Export the API functions
window.api = api;