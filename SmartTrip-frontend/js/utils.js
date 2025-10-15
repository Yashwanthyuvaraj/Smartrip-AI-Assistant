// utils.js - Utility functions for the SmartTrip application

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;

    // Show notification
    setTimeout(() => {
        notification.classList.remove('hidden');
    }, 10);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Show auth form (login or signup)
function showAuthForm(authType) {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Update tabs
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-auth') === authType) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update forms
    authForms.forEach(form => {
        if (form.id === `${authType}-form`) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Export utility functions
window.showNotification = showNotification;
window.showAuthForm = showAuthForm;
window.formatCurrency = formatCurrency;
window.debounce = debounce;