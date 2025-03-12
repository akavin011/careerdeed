// Router class to handle navigation
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentPath = '';
        
        // Handle initial load and navigation
        window.addEventListener('popstate', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
                e.preventDefault();
                const link = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
                this.navigateTo(link.href);
            }
        });
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const queryParams = window.location.search;
        this.currentPath = path;
        
        // Find matching route
        let matchedRoute = null;
        let params = {};
        
        for (const route of this.routes) {
            // Check if route is a string path
            if (typeof route.path === 'string') {
                // Check for exact match
                if (route.path === path) {
                    matchedRoute = route;
                    break;
                }
                
                // Check for dynamic route with parameters
                if (route.path.includes(':')) {
                    const routeParts = route.path.split('/');
                    const pathParts = path.split('/');
                    
                    if (routeParts.length === pathParts.length) {
                        let isMatch = true;
                        const routeParams = {};
                        
                        for (let i = 0; i < routeParts.length; i++) {
                            if (routeParts[i].startsWith(':')) {
                                // This is a parameter
                                const paramName = routeParts[i].substring(1);
                                routeParams[paramName] = pathParts[i];
                            } else if (routeParts[i] !== pathParts[i]) {
                                // Not a match
                                isMatch = false;
                                break;
                            }
                        }
                        
                        if (isMatch) {
                            matchedRoute = route;
                            params = routeParams;
                            break;
                        }
                    }
                }
            } else if (route.path instanceof RegExp) {
                // Check for regex match
                const match = path.match(route.path);
                if (match) {
                    matchedRoute = route;
                    params = match.groups || {};
                    break;
                }
            }
        }
        
        // If no route matched, use the wildcard route
        if (!matchedRoute) {
            matchedRoute = this.routes.find(route => route.path === '*');
        }

        // Render the component
        const root = document.getElementById('root');
        root.innerHTML = matchedRoute.component(params);
        
        // Initialize any scripts that need to run after rendering
        if (matchedRoute.init) {
            matchedRoute.init();
        }
        
        // Call any component-specific initialization functions
        const initFunctions = root.querySelectorAll('[data-init]');
        initFunctions.forEach(element => {
            const initFunction = element.getAttribute('data-init');
            if (window[initFunction] && typeof window[initFunction] === 'function') {
                window[initFunction]();
            }
        });
        
        // Scroll to top on navigation
        window.scrollTo(0, 0);
    }
    
    init() {
        this.handleRoute();
    }
}

export { Router }; 