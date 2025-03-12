// Show loading spinner
export const showLoading = () => {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(spinner);
};

// Hide loading spinner
export const hideLoading = () => {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
};

// Show toast notification
export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    const container = document.querySelector('.toast-container') || (() => {
        const div = document.createElement('div');
        div.className = 'toast-container';
        document.body.appendChild(div);
        return div;
    })();

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
            container.remove();
        }
    }, 3000);
};

// Form validation
export const validateForm = (formData) => {
    const errors = {};

    // Email validation
    if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    // Password validation
    if (formData.password) {
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
    }

    // Name validation
    if (formData.name) {
        if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Format date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Local storage helpers
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// Analytics tracking
export const trackPageViews = () => {
    // Track page views
    const trackPageView = () => {
        const path = window.location.pathname;
        console.log(`Page view: ${path}`);
        
        // In a real application, you would send this data to an analytics service
        // Example: sendToAnalyticsService('pageView', { path });
    };
    
    // Track initial page view
    trackPageView();
    
    // Track page views on navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
        originalPushState.apply(this, arguments);
        trackPageView();
    };
    
    // Track page views on browser navigation (back/forward)
    window.addEventListener('popstate', trackPageView);
};

// Track user events
export const trackEvent = (category, action, label = null, value = null) => {
    console.log(`Event: ${category} - ${action}${label ? ` - ${label}` : ''}${value ? ` - ${value}` : ''}`);
    
    // In a real application, you would send this data to an analytics service
    // Example: sendToAnalyticsService('event', { category, action, label, value });
};

// Calculate user progress
export const calculateProgress = (completedItems, totalItems) => {
    if (!totalItems) return 0;
    return Math.round((completedItems / totalItems) * 100);
};

// Generate a unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format time (seconds to MM:SS)
export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 