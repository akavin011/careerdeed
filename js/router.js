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
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        this.currentPath = path;
        
        // Find matching route
        const route = this.routes.find(route => {
            if (typeof route.path === 'string') {
                return route.path === path;
            }
            return route.path.test(path);
        }) || this.routes.find(route => route.path === '*');

        // Render the component
        const root = document.getElementById('root');
        root.innerHTML = route.component();
    }
}

export { Router }; 