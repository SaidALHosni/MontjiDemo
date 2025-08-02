// Sample data for the demo
const offers = [
    {
        id: 1,
        title: "Mandi Chicken (Large)",
        business: "Al Said Family",
        price: "5.500 OMR",
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Kabsa Rice with Lamb",
        business: "Omani Taste Shop",
        price: "7.000 OMR",
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Fattah (Egyptian Dish)",
        business: "Fatima's Kitchen",
        price: "4.500 OMR",
        discount: "10% OFF",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

const advertisements = [
    {
        id: 1,
        name: "Al Mashriq Food Shop",
        specialty: "Omani & Yemeni Cuisine",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        link: "search.html?business=1"
    },
    {
        id: 2,
        name: "Fatima's Kitchen",
        specialty: "Homemade Egyptian Food",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        link: "search.html?business=2"
    },
    {
        id: 3,
        name: "Al Batinah Restaurant",
        specialty: "Traditional Omani Dishes",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        link: "search.html?business=3"
    }
];

const dishes = [
    {
        id: 1,
        name: "Mandi Chicken",
        description: "Traditional Yemeni dish with fragrant rice and tender chicken",
        price: "5.500 OMR",
        business: "Al Said Family",
        cuisine: "arabic",
        location: "muscat",
        deliveryOptions: ["pickup", "shop", "delivery"],
        rating: 4.5,
        reviews: 24,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        inShop: true
    },
    {
        id: 2,
        name: "Kabsa with Lamb",
        description: "Authentic Saudi dish with spiced rice and lamb",
        price: "7.000 OMR",
        business: "Omani Taste Shop",
        cuisine: "arabic",
        location: "muscat",
        deliveryOptions: ["shop", "delivery"],
        rating: 4.8,
        reviews: 32,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        inShop: true
    },
    {
        id: 3,
        name: "Fattah",
        description: "Egyptian dish with rice, bread, and meat in garlic tomato sauce",
        price: "4.500 OMR",
        business: "Fatima's Kitchen",
        cuisine: "egyptian",
        location: "salalah",
        deliveryOptions: ["pickup", "delivery"],
        rating: 4.2,
        reviews: 18,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        inShop: false
    },
    {
        id: 4,
        name: "Shuwa",
        description: "Traditional Omani slow-cooked lamb",
        price: "6.000 OMR",
        business: "Al Batinah Restaurant",
        cuisine: "omani",
        location: "suhar",
        deliveryOptions: ["pickup", "shop"],
        rating: 4.7,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        inShop: true
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('montjiCart')) || [];

// Function to populate offers
function populateOffers() {
    const offerContainer = document.querySelector('.offer-cards');
    if (!offerContainer) return;
    
    offers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.className = 'card';
        offerCard.innerHTML = `
            <img src="${offer.image}" alt="${offer.title}">
            <div class="card-content">
                <h3>${offer.title}</h3>
                <p>By ${offer.business}</p>
                <div class="price">
                    <span class="original-price">${offer.price}</span>
                    <span class="discount">${offer.discount}</span>
                </div>
                <button class="add-to-cart" data-id="${offer.id}">Add to Cart</button>
            </div>
        `;
        offerContainer.appendChild(offerCard);
    });
}

// Function to populate ads
function populateAds() {
    const adContainer = document.querySelector('.ad-cards');
    if (!adContainer) return;
    
    advertisements.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.className = 'card';
        adCard.innerHTML = `
            <img src="${ad.image}" alt="${ad.name}">
            <div class="card-content">
                <h3>${ad.name}</h3>
                <p>${ad.specialty}</p>
                <a href="${ad.link}" class="view-business">View Dishes</a>
            </div>
        `;
        adContainer.appendChild(adCard);
    });
}

// Function to populate search results
function populateSearchResults() {
    const resultContainer = document.querySelector('.result-cards');
    if (!resultContainer) return;
    
    // Get URL parameters for filtering
    const urlParams = new URLSearchParams(window.location.search);
    const cuisine = urlParams.get('cuisine');
    const business = urlParams.get('business');
    const location = urlParams.get('location');
    
    let filteredDishes = dishes;
    
    if (cuisine) {
        filteredDishes = filteredDishes.filter(dish => dish.cuisine === cuisine);
    }
    
    if (business) {
        filteredDishes = filteredDishes.filter(dish => dish.businessId == business);
    }
    
    if (location) {
        filteredDishes = filteredDishes.filter(dish => dish.location === location);
    }
    
    if (filteredDishes.length === 0) {
        resultContainer.innerHTML = '<p class="no-results">No dishes found matching your criteria.</p>';
        return;
    }
    
    filteredDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'card';
        
        const deliveryOptions = dish.deliveryOptions.map(option => {
            if (option === 'pickup') return 'Pickup from Home';
            if (option === 'shop') return 'Pickup from Shop';
            if (option === 'delivery') return 'Home Delivery';
            return option;
        }).join(', ');
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="card-content">
                <h3>${dish.name}</h3>
                <p class="business">${dish.business}</p>
                <p class="description">${dish.description}</p>
                <div class="delivery-options">
                    <strong>Delivery Options:</strong> ${deliveryOptions}
                </div>
                <div class="price-rating">
                    <span class="price">${dish.price}</span>
                    <span class="rating">★ ${dish.rating} (${dish.reviews})</span>
                </div>
                <button class="add-to-cart" data-id="${dish.id}">Add to Cart</button>
                <button class="view-details" data-id="${dish.id}">View Details</button>
            </div>
        `;
        resultContainer.appendChild(dishCard);
    });
}

// Function to handle tab switching in registration
function setupRegistrationTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-form`).classList.add('active');
        });
    });
}

// Function to handle adding items to cart
function setupAddToCartButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const dishId = parseInt(e.target.getAttribute('data-id'));
            const dish = dishes.find(d => d.id === dishId) || offers.find(o => o.id === dishId);
            
            if (dish) {
                // Check if item already in cart
                const existingItem = cart.find(item => item.id === dish.id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: dish.id,
                        name: dish.name || dish.title,
                        price: dish.price,
                        business: dish.business,
                        image: dish.image,
                        quantity: 1
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('montjiCart', JSON.stringify(cart));
                
                // Show notification
                showNotification(`${dish.name || dish.title} added to cart!`);
            }
        }
    });
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Function to setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const userType = document.getElementById('login-type').value;
        
        // For demo purposes, just redirect to appropriate dashboard
        if (email && password) {
            switch(userType) {
                case 'admin':
                    window.location.href = 'dashboard/admin.html';
                    break;
                case 'business':
                    window.location.href = 'dashboard/businessman.html';
                    break;
                case 'family':
                    window.location.href = 'dashboard/family.html';
                    break;
                case 'delivery':
                    window.location.href = 'dashboard/delivery.html';
                    break;
                case 'employee':
                    window.location.href = 'dashboard/employee.html';
                    break;
                default:
                    window.location.href = 'dashboard/customer.html';
            }
        } else {
            alert('Please enter both email and password');
        }
    });
}

// Function to setup price range filter
function setupPriceRangeFilter() {
    const priceRange = document.querySelector('input[type="range"]');
    if (!priceRange) return;
    
    const priceRangeValue = document.getElementById('price-range-value');
    priceRange.addEventListener('input', function() {
        priceRangeValue.textContent = `Up to ${this.value} OMR`;
    });
}

// Function to setup apply filters button
function setupApplyFilters() {
    const applyButton = document.querySelector('.apply-filters');
    if (!applyButton) return;
    
    applyButton.addEventListener('click', function() {
        const cuisineCheckboxes = document.querySelectorAll('input[name="cuisine"]:checked');
        const deliveryCheckboxes = document.querySelectorAll('input[name="delivery"]:checked');
        const locationSelect = document.querySelector('select');
        const priceRange = document.querySelector('input[type="range"]');
        
        const selectedCuisines = Array.from(cuisineCheckboxes).map(cb => cb.value);
        const selectedDelivery = Array.from(deliveryCheckboxes).map(cb => cb.value);
        const selectedLocation = locationSelect.value;
        const maxPrice = priceRange.value;
        
        // For demo, just reload with query parameters
        let queryParams = [];
        
        if (selectedCuisines.length > 0) {
            queryParams.push(`cuisine=${selectedCuisines[0]}`); // Simplified for demo
        }
        
        if (selectedLocation) {
            queryParams.push(`location=${selectedLocation}`);
        }
        
        window.location.search = queryParams.join('&');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateOffers();
    populateAds();
    populateSearchResults();
    setupRegistrationTabs();
    setupAddToCartButtons();
    setupLoginForm();
    setupPriceRangeFilter();
    setupApplyFilters();
    
    // Set active tab based on URL for registration page
    const urlParams = new URLSearchParams(window.location.search);
    const registerType = urlParams.get('type');
    if (registerType) {
        const tabButton = document.querySelector(`.tab-button[data-tab="${registerType}"]`);
        if (tabButton) tabButton.click();
    }
});