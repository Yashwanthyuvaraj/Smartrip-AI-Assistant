// auth.js - Authentication functions for the SmartTrip application

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const profileContainer = document.querySelector('.profile-container');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const notification = document.getElementById('notification');

    // Check if user is logged in on page load
    checkLoginStatus();

    // Event listeners
    loginBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
        showAuthForm('login');
    });

    signupBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
        showAuthForm('signup');
    });

    // Close modal
    closeModal.forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const authType = tab.getAttribute('data-auth');
            showAuthForm(authType);
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        api.login({ email, password })
            .then(response => {
                if (response.success) {
                    // Close modal
                    authModal.style.display = 'none';

                    // Use the user's name from the response
                    const displayName = response.user.name;

                    // Show success notification
                    showNotification(`Welcome back, ${displayName}!`, 'success');

                    // Update UI immediately
                    updateLoginUI(response.user);
                } else {
                    showNotification(response.message || 'Login failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('Login failed. Please check your credentials.', 'error');
                console.error('Login error:', error);
            });
    });

    // Signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;

        if (password !== confirm) {
            showNotification('Passwords do not match.', 'error');
            return;
        }

        api.signup({ name, email, password })
            .then(response => {
                if (response.success) {
                    // Close modal
                    authModal.style.display = 'none';

                    // Use the user's name from the response
                    const displayName = response.user.name;

                    // Show success notification
                    showNotification(`Account created successfully! Welcome, ${displayName}!`, 'success');

                    // Update UI immediately
                    updateLoginUI(response.user);
                } else {
                    showNotification(response.message || 'Signup failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification(error.message || 'Signup failed. Please try again.', 'error');
                console.error('Signup error:', error);
            });
    });

    // Check login status and update UI
    function checkLoginStatus() {
        const user = JSON.parse(localStorage.getItem('smarttrip_user'));

        if (user) {
            // User is logged in
            updateLoginUI(user);
        } else {
            // User is not logged in
            updateLogoutUI();
        }
    }

    // Update UI when user is logged in
    function updateLoginUI(user) {
        // Use the user's name for display
        const displayName = user.name;

        profileContainer.innerHTML = `
            <div class="profile-dropdown">
                <button class="profile-btn" id="profile-menu-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>${displayName}</span>
                </button>
                <div class="dropdown-content" id="profile-dropdown">
                    <a href="#" id="logout-btn">Logout</a>
                </div>
            </div>
        `;

        // Add event listener to profile dropdown
        document.getElementById('profile-menu-btn').addEventListener('click', toggleProfileDropdown);
        document.getElementById('logout-btn').addEventListener('click', handleLogout);

        // Hide login/signup buttons
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
    }

    // Update UI when user is logged out
    function updateLogoutUI() {
        profileContainer.innerHTML = `
            <a href="#" id="profile-btn"><i class="fas fa-user-circle"></i></a>
        `;

        // Add event listener to login button
        document.getElementById('profile-btn').addEventListener('click', () => {
            authModal.style.display = 'block';
            showAuthForm('login');
        });

        // Show login/signup buttons
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (signupBtn) signupBtn.style.display = 'inline-block';
    }

    // Toggle profile dropdown
    function toggleProfileDropdown(e) {
        e.preventDefault();
        const dropdown = document.getElementById('profile-dropdown');
        dropdown.classList.toggle('show');
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.profile-btn') && !e.target.matches('#profile-menu-btn')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });

    // Handle logout
    function handleLogout(e) {
        e.preventDefault();

        // Remove user from localStorage
        localStorage.removeItem('smarttrip_user');

        // Show notification
        showNotification('You have been logged out successfully.', 'success');

        // Update UI
        updateLogoutUI();
    }

    // Show auth form (login or signup)
    function showAuthForm(authType) {
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

    // Google Sign-In handler
    window.handleCredentialResponse = function(response) {
        // For demo purposes, we'll simulate a successful Google login
        const user = {
            id: 'google_' + Date.now(),
            name: 'Google User',
            email: 'user@gmail.com',
            picture: 'https://picsum.photos/seed/user/100/100.jpg'
        };

        // Save user to localStorage
        localStorage.setItem('smarttrip_user', JSON.stringify(user));

        // Use the user's name for display
        const displayName = user.name;

        // Show success notification
        showNotification(`Welcome, ${displayName}!`, 'success');

        // Close modal
        authModal.style.display = 'none';

        // Update UI
        updateLoginUI(user);
    };
});