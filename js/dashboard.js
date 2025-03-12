const Dashboard = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?person",
        enrolledCourses: [
            {
                title: "Quantitative Aptitude Mastery",
                progress: 65,
                lastAccessed: "2024-03-15",
                nextLesson: "Percentages and Ratios",
                image: "https://source.unsplash.com/random/800x600/?mathematics"
            },
            {
                title: "Logical Reasoning Pro",
                progress: 30,
                lastAccessed: "2024-03-14",
                nextLesson: "Syllogisms",
                image: "https://source.unsplash.com/random/800x600/?logic"
            }
        ],
        achievements: [
            {
                title: "Quick Learner",
                icon: "fas fa-bolt",
                description: "Completed 5 lessons in one day"
            },
            {
                title: "Perfect Score",
                icon: "fas fa-star",
                description: "Scored 100% in a practice test"
            }
        ],
        upcomingTests: [
            {
                title: "Weekly Assessment - Quantitative Aptitude",
                date: "2024-03-20",
                duration: "60 minutes"
            },
            {
                title: "Mock Test - Logical Reasoning",
                date: "2024-03-22",
                duration: "90 minutes"
            }
        ]
    };

    return `
        <div class="dashboard-page">
            ${Navigation()}
            
            <div class="container py-5">
                <div class="row">
                    <!-- Sidebar -->
                    <div class="col-lg-3">
                        <div class="card mb-4">
                            <div class="card-body text-center">
                                <img src="${user.avatar}" class="rounded-circle mb-3" width="100" height="100" alt="${user.name}">
                                <h5 class="mb-1">${user.name}</h5>
                                <p class="text-muted mb-3">${user.email}</p>
                                <button class="btn btn-outline-primary btn-sm">Edit Profile</button>
                            </div>
                        </div>
                        
                        <div class="list-group mb-4">
                            <a href="#" class="list-group-item list-group-item-action active">
                                <i class="fas fa-home me-2"></i> Dashboard
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="fas fa-book me-2"></i> My Courses
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="fas fa-calendar me-2"></i> Schedule
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="fas fa-chart-line me-2"></i> Progress
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="fas fa-cog me-2"></i> Settings
                            </a>
                        </div>
                    </div>
                    
                    <!-- Main Content -->
                    <div class="col-lg-9">
                        <!-- Welcome Section -->
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>Welcome back, ${user.name}! 👋</h4>
                                        <p class="mb-0">Continue your learning journey and track your progress.</p>
                                    </div>
                                    <div class="search-container" style="width: 300px;">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search courses...">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enrolled Courses -->
                        <h5 class="mb-3">Your Courses</h5>
                        <div class="row mb-4">
                            ${user.enrolledCourses.map(course => `
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <img src="${course.image}" class="card-img-top" alt="${course.title}">
                                        <div class="card-body">
                                            <h5 class="card-title">${course.title}</h5>
                                            <div class="progress mb-3">
                                                <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"
                                                    aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100">
                                                    ${course.progress}%
                                                </div>
                                            </div>
                                            <p class="card-text">
                                                <small class="text-muted">Last accessed: ${course.lastAccessed}</small>
                                            </p>
                                            <p class="card-text">Next lesson: ${course.nextLesson}</p>
                                            <a href="#" class="btn btn-primary">Continue Learning</a>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Achievements and Upcoming Tests -->
                        <div class="row">
                            <!-- Achievements -->
                            <div class="col-md-6 mb-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title mb-3">Your Achievements</h5>
                                        ${user.achievements.map(achievement => `
                                            <div class="achievement-item d-flex align-items-center mb-3">
                                                <div class="achievement-icon me-3">
                                                    <i class="${achievement.icon} fa-2x text-primary"></i>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">${achievement.title}</h6>
                                                    <small class="text-muted">${achievement.description}</small>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Upcoming Tests -->
                            <div class="col-md-6 mb-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title mb-3">Upcoming Tests</h5>
                                        ${user.upcomingTests.map(test => `
                                            <div class="test-item mb-3">
                                                <h6 class="mb-1">${test.title}</h6>
                                                <p class="mb-1">
                                                    <i class="fas fa-calendar me-2"></i>
                                                    ${test.date}
                                                </p>
                                                <p class="mb-0">
                                                    <i class="fas fa-clock me-2"></i>
                                                    ${test.duration}
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${Footer()}
        </div>
    `;
};

// Export the component
export { Dashboard }; 