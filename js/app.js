import { Router } from './router.js';
import { Dashboard } from './dashboard.js';
import { CourseDetails } from './course-details.js';
import { Quiz, QuizList } from './quiz.js';
import { PracticeTest, PracticeTestList } from './practice-test.js';
import { validateForm, showToast, storage } from './utils.js';

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Navigation Component
const Navigation = () => {
    // Check if user is logged in
    const user = storage.get('user');
    const isLoggedIn = !!user;
    
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
                            <a class="nav-link" href="/practice-tests" data-link>Practice Tests</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about" data-link>About</a>
                        </li>
                        ${isLoggedIn ? `
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ${user.name}
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="/dashboard" data-link>Dashboard</a></li>
                                    <li><a class="dropdown-item" href="/profile" data-link>Profile</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
                                </ul>
                            </li>
                        ` : `
                            <li class="nav-item">
                                <a class="nav-link btn btn-outline-light ms-2" href="/login" data-link>Login</a>
                            </li>
                        `}
                        <li class="nav-item">
                            <div class="dark-mode-toggle" id="darkModeToggle">
                                <i class="${localStorage.getItem('theme') === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}"></i>
                                <span>${localStorage.getItem('theme') === 'dark' ? 'Light' : 'Dark'} Mode</span>
                            </div>
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
            image: "https://img.freepik.com/free-photo/math-formulas-blackboard_144627-43435.jpg",
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
            image: "https://img.freepik.com/free-photo/business-planning-concept-side-view-businessman-thinking-about-business-plan_176474-9655.jpg",
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
            image: "https://img.freepik.com/free-photo/english-books-shelf_23-2147778124.jpg",
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
                                <div class="mb-4">
                                    <div class="form-check mt-2">
                                        <input type="checkbox" class="form-check-input" id="remember">
                                        <label class="form-check-label" for="remember">Remember me</label>
                                    </div>
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

// About Page Component
const AboutPage = () => {
    return `
        ${Navigation()}
        <div class="container py-5">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <h1 class="mb-4">About CareerDeed</h1>
                    <div class="card mb-5">
                        <div class="card-body">
                            <h2 class="mb-3">Our Mission</h2>
                            <p>At CareerDeed, we are dedicated to empowering individuals with the skills and knowledge needed to excel in competitive exams and professional environments. Our mission is to provide high-quality aptitude training that is accessible, engaging, and effective.</p>
                            
                            <h2 class="mb-3 mt-4">Our Approach</h2>
                            <p>We believe in a comprehensive approach to aptitude training that combines theoretical knowledge with practical application. Our courses are designed to help you understand concepts deeply and apply them effectively in real-world scenarios.</p>
                            
                            <div class="row mt-4">
                                <div class="col-md-4 text-center mb-4">
                                    <div class="about-feature">
                                        <i class="fas fa-book-reader fa-3x mb-3"></i>
                                        <h4>Structured Learning</h4>
                                        <p>Carefully designed curriculum that builds skills progressively</p>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center mb-4">
                                    <div class="about-feature">
                                        <i class="fas fa-tasks fa-3x mb-3"></i>
                                        <h4>Practice-Oriented</h4>
                                        <p>Extensive practice questions and mock tests</p>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center mb-4">
                                    <div class="about-feature">
                                        <i class="fas fa-chart-line fa-3x mb-3"></i>
                                        <h4>Progress Tracking</h4>
                                        <p>Detailed analytics to monitor your improvement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card mb-5">
                        <div class="card-body">
                            <h2 class="mb-4">Meet Our Instructor</h2>
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <img src="https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg" alt="Mohan Rajamani" class="img-fluid rounded-circle mb-3" style="max-width: 200px;">
                                </div>
                                <div class="col-md-8">
                                    <h3>Mohan Rajamani</h3>
                                    <p class="text-muted">Lead Instructor & Aptitude Expert</p>
                                    <p>With over 15 years of experience in teaching aptitude for competitive exams, Mohan Rajamani has helped thousands of students achieve their career goals. His teaching methodology focuses on building strong fundamentals and developing problem-solving skills.</p>
                                    <p>Mohan specializes in Quantitative Aptitude, Logical Reasoning, and Verbal Ability. He has authored several books on aptitude training and is known for his ability to simplify complex concepts.</p>
                                    <div class="instructor-stats d-flex flex-wrap mt-3">
                                        <div class="me-4 mb-2">
                                            <strong>15+</strong> Years Teaching
                                        </div>
                                        <div class="me-4 mb-2">
                                            <strong>10,000+</strong> Students Taught
                                        </div>
                                        <div class="me-4 mb-2">
                                            <strong>4.9/5</strong> Average Rating
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <h2 class="mb-4">Contact Us</h2>
                            <p>Have questions or need more information? We're here to help!</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <h4><i class="fas fa-envelope me-2"></i> Email</h4>
                                    <p>contact@careerdeed.com</p>
                                    <h4><i class="fas fa-phone me-2"></i> Phone</h4>
                                    <p>+91 (XXX) XXX-XXXX</p>
                                </div>
                                <div class="col-md-6">
                                    <h4><i class="fas fa-map-marker-alt me-2"></i> Address</h4>
                                    <p>123 Education Street<br>Chennai, Tamil Nadu<br>India - 600001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `;
};

// Courses Page Component
const CoursesPage = () => {
    const courses = [
        {
            id: 1,
            title: "Quantitative Aptitude Mastery",
            description: "Master mathematical concepts for competitive exams with comprehensive coverage of arithmetic, algebra, geometry, and more.",
            image: "https://img.freepik.com/free-photo/math-formulas-blackboard_144627-43435.jpg",
            category: "Mathematics",
            price: "8000",
            rating: 4.8,
            students: 1250,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            id: 2,
            title: "Logical Reasoning Pro",
            description: "Enhance your logical thinking and problem-solving skills for competitive exams and interviews.",
            image: "https://img.freepik.com/free-photo/business-planning-concept-side-view-businessman-thinking-about-business-plan_176474-9655.jpg",
            category: "Logic",
            price: "8000",
            rating: 4.7,
            students: 980,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            id: 3,
            title: "Verbal Ability Excellence",
            description: "Improve your verbal reasoning and comprehension skills for competitive exams and professional growth.",
            image: "https://img.freepik.com/free-photo/english-books-shelf_23-2147778124.jpg",
            category: "Verbal",
            price: "8000",
            rating: 4.6,
            students: 850,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            id: 4,
            title: "Data Interpretation Masterclass",
            description: "Learn to analyze and interpret complex data sets, charts, and graphs for competitive exams.",
            image: "https://img.freepik.com/free-photo/business-person-analyzing-growing-graph_53876-23303.jpg",
            category: "Data Analysis",
            price: "8000",
            rating: 4.5,
            students: 720,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            id: 5,
            title: "Aptitude Test Preparation Bundle",
            description: "Comprehensive bundle covering all aspects of aptitude testing for competitive exams and job interviews.",
            image: "https://img.freepik.com/free-photo/close-up-hand-taking-notes-studying_23-2148888827.jpg",
            category: "Bundle",
            price: "12000",
            rating: 4.9,
            students: 1500,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        },
        {
            id: 6,
            title: "Interview Preparation Strategies",
            description: "Master the art of interviews with strategies for aptitude tests, technical questions, and HR rounds.",
            image: "https://img.freepik.com/free-photo/two-businesspeople-having-meeting_23-2149300535.jpg",
            category: "Career",
            price: "8000",
            rating: 4.7,
            students: 950,
            instructor: {
                name: "Mohan Rajamani",
                avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
                designation: "Lead Instructor"
            }
        }
    ];

    const renderCourseCard = (course) => {
        return `
            <div class="col-md-4 mb-4">
                <div class="card course-card h-100">
                    <img src="${course.image}" class="card-img-top course-image" alt="${course.title}">
                    <div class="card-body d-flex flex-column">
                        <span class="category-badge mb-2">${course.category}</span>
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <div class="mt-auto">
                            <div class="instructor-info mb-2">
                                <img src="${course.instructor.avatar}" class="instructor-avatar" alt="${course.instructor.name}">
                                <span>${course.instructor.name}</span>
                            </div>
                            <div class="course-meta mb-3">
                                <span><i class="fas fa-star text-warning"></i> ${course.rating}</span>
                                <span><i class="fas fa-user"></i> ${course.students} students</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">₹${course.price}</span>
                                <a href="/course/${course.id}" class="btn btn-primary" data-link>View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    return `
        ${Navigation()}
        <div class="courses-header py-5">
            <div class="container">
                <h1 class="mb-4">Explore Our Courses</h1>
                <p class="lead">Discover our comprehensive range of aptitude training courses designed to help you excel in competitive exams and job interviews.</p>
                
                <div class="filters mb-4">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search courses..." id="courseSearchInput">
                                <button class="btn btn-primary" type="button" id="searchButton">
                                    <i class="fas fa-search"></i> Search
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-md-end mt-3 mt-md-0">
                                <select class="form-select me-2" style="max-width: 150px;" id="categoryFilter">
                                    <option value="all">All Categories</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Logic">Logic</option>
                                    <option value="Verbal">Verbal</option>
                                    <option value="Data Analysis">Data Analysis</option>
                                    <option value="Bundle">Bundle</option>
                                    <option value="Career">Career</option>
                                </select>
                                <select class="form-select" style="max-width: 150px;" id="sortFilter">
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container py-5">
            <div class="row" id="coursesContainer">
                ${courses.map(course => renderCourseCard(course)).join('')}
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
    { path: '/about', component: AboutPage },
    { path: '/courses', component: CoursesPage },
    { path: '/quiz', component: Quiz },
    { path: '/quizzes', component: QuizList },
    { path: '/practice-test', component: PracticeTest },
    { path: '/practice-tests', component: PracticeTestList },
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
        'styles/course-details.css',
        'styles/quiz-test.css'
    ];
    
    styles.forEach(style => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = style;
        document.head.appendChild(link);
    });
    
    // Initialize router
    router.init();
    
    // Set up dark mode toggle functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('#darkModeToggle')) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update the icon and text
            const toggleIcon = e.target.closest('#darkModeToggle').querySelector('i');
            const toggleText = e.target.closest('#darkModeToggle').querySelector('span');
            
            if (newTheme === 'dark') {
                toggleIcon.classList.replace('fas fa-moon', 'fas fa-sun');
                toggleText.textContent = 'Light Mode';
            } else {
                toggleIcon.classList.replace('fas fa-sun', 'fas fa-moon');
                toggleText.textContent = 'Dark Mode';
            }
        }
        
        // Handle logout
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            storage.remove('user');
            showToast('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    });
    
    // Add analytics tracking
    trackPageViews();
}); 