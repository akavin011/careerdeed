import { Router } from './router.js';
import { Dashboard } from './dashboard.js';
import { CourseDetails } from './course-details.js';
import { validateForm, showToast, storage } from './utils.js';

// Navigation Component
const Navigation = () => {
    return `
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="/" data-link>CareerDeed</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/courses" data-link>Courses</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/categories" data-link>Categories</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about" data-link>About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-outline-light ms-2" href="/login" data-link>Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
};

// Hero Section Component
const HeroSection = () => {
    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('courseSearch').value;
        if (searchTerm.trim()) {
            window.location.href = `/courses?search=${encodeURIComponent(searchTerm)}`;
        }
    };

    return `
        <section class="hero-section">
            <div class="container">
                <h1 class="display-4 mb-4">Unlock Your Potential with CareerDeed</h1>
                <p class="lead mb-4">Join our comprehensive aptitude training program led by expert instructor Mohan Rajamani</p>
                <div class="search-bar">
                    <form onsubmit="(${handleSearch.toString()})(event)">
                        <div class="input-group">
                            <input type="text" class="form-control" id="courseSearch" 
                                placeholder="Search for courses..." aria-label="Search for courses">
                            <button class="btn btn-light" type="submit">
                                <i class="fas fa-search"></i> Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
};

// Features Section Component
const FeaturesSection = () => {
    return `
        <section class="features-section">
            <div class="container">
                <h2 class="text-center mb-5">Why Choose CareerDeed</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="feature-card">
                            <i class="fas fa-user-tie feature-icon"></i>
                            <h3>Expert Instructor</h3>
                            <p>Learn from Mohan Rajamani, a leading expert in aptitude training</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card">
                            <i class="fas fa-clock feature-icon"></i>
                            <h3>Flexible Learning</h3>
                            <p>Study at your own pace with lifetime access to course materials</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card">
                            <i class="fas fa-certificate feature-icon"></i>
                            <h3>Certification</h3>
                            <p>Earn a valuable certificate upon course completion</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};

// Course Card Component
const CourseCard = (course) => {
    return `
        <div class="col-md-4">
            <div class="card course-card">
                <img src="${course.image}" class="card-img-top course-image" alt="${course.title}">
                <div class="card-body">
                    <span class="category-badge mb-2">${course.category}</span>
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <div class="instructor-info mb-2">
                        <img src="${course.instructor.avatar}" class="instructor-avatar" alt="${course.instructor.name}">
                        <span>${course.instructor.name} (${course.instructor.designation})</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price-tag">₹${course.price}</span>
                        <button class="btn btn-primary">Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Popular Courses Section Component
const PopularCoursesSection = () => {
    const courses = [
        {
            title: "Quantitative Aptitude Mastery",
            description: "Master mathematical concepts for competitive exams",
            image: "https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148154055.jpg",
            category: "Mathematics",
            price: "8000",
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            title: "Logical Reasoning Pro",
            description: "Enhance your logical thinking and problem-solving",
            image: "https://img.freepik.com/free-vector/brain-mechanism-gears-human-head-brainstorm-idea-generation_107791-8061.jpg",
            category: "Logic",
            price: "8000",
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            title: "Verbal Ability Excellence",
            description: "Improve your verbal reasoning and comprehension",
            image: "https://img.freepik.com/free-vector/hand-drawn-literature-concept_23-2149153543.jpg",
            category: "Verbal",
            price: "8000",
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        }
    ];

    return `
        <section class="popular-courses py-5">
            <div class="container">
                <h2 class="text-center mb-5">Featured Courses</h2>
                <div class="row">
                    ${courses.map(course => CourseCard(course)).join('')}
                </div>
            </div>
        </section>
    `;
};

// Footer Component
const Footer = () => {
    return `
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h5>About CareerDeed</h5>
                        <p>We are dedicated to helping students master aptitude skills through quality training by expert instructor Mohan Rajamani.</p>
                    </div>
                    <div class="col-md-4">
                        <h5>Quick Links</h5>
                        <ul class="list-unstyled">
                            <li><a href="/" class="text-white" data-link>Home</a></li>
                            <li><a href="/courses" class="text-white" data-link>Courses</a></li>
                            <li><a href="/about" class="text-white" data-link>About</a></li>
                            <li><a href="/contact" class="text-white" data-link>Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h5>Contact Us</h5>
                        <ul class="list-unstyled">
                            <li><i class="fas fa-envelope me-2"></i> contact@careerdeed.com</li>
                            <li><i class="fas fa-phone me-2"></i> +91 (XXX) XXX-XXXX</li>
                            <li><i class="fas fa-map-marker-alt me-2"></i> Chennai, Tamil Nadu, India</li>
                        </ul>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12 text-center">
                        <p class="mb-0">&copy; ${new Date().getFullYear()} CareerDeed. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
};

// Home Page Component
const HomePage = () => {
    return `
        ${Navigation()}
        ${HeroSection()}
        ${FeaturesSection()}
        ${PopularCoursesSection()}
        ${Footer()}
    `;
};

// Login Page Component
const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const { isValid, errors } = validateForm(formData);
        
        if (isValid) {
            // Here you would typically make an API call to authenticate
            // For demo, we'll just show a success message
            showToast('Login successful! Redirecting...', 'success');
            storage.set('user', { email: formData.email });
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            Object.keys(errors).forEach(key => {
                showToast(errors[key], 'error');
            });
        }
    };

    return `
        ${Navigation()}
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center mb-4">Login</h2>
                            <form id="loginForm" onsubmit="(${handleLogin.toString()})(event)">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" required>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="remember">
                                    <label class="form-check-label" for="remember">Remember me</label>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                            <div class="text-center mt-3">
                                <a href="/register" data-link>Don't have an account? Register</a>
                                <br>
                                <a href="/forgot-password" data-link class="mt-2 d-inline-block">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;
};

// Register Page Component
const RegisterPage = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value
        };

        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        const { isValid, errors } = validateForm(formData);
        
        if (isValid) {
            // Here you would typically make an API call to register
            // For demo, we'll just show a success message
            showToast('Registration successful! Please login.', 'success');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } else {
            Object.keys(errors).forEach(key => {
                showToast(errors[key], 'error');
            });
        }
    };

    return `
        ${Navigation()}
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center mb-4">Register</h2>
                            <form id="registerForm" onsubmit="(${handleRegister.toString()})(event)">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" required 
                                        pattern=".{8,}" title="Password must be at least 8 characters long">
                                </div>
                                <div class="mb-3">
                                    <label for="confirm-password" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" id="confirm-password" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Register</button>
                            </form>
                            <div class="text-center mt-3">
                                <a href="/login" data-link>Already have an account? Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;
};

// Define routes
const routes = [
    { path: '/', component: HomePage },
    { path: '/dashboard', component: Dashboard },
    { path: '/course/:id', component: CourseDetails },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '*', component: () => '<h1>404 - Page Not Found</h1>' }
];

// Initialize router
const router = new Router(routes);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS files dynamically
    const styles = [
        'styles/main.css',
        'styles/dashboard.css',
        'styles/course-details.css'
    ];
    
    styles.forEach(style => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = style;
        document.head.appendChild(link);
    });
}); 